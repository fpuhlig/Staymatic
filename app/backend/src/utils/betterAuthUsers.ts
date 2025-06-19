import mongoose from 'mongoose';
import { User, CreateTestUserInput } from '../../../shared/src/types';

// Better Auth User Schema extending shared User type
export interface IBetterAuthUser extends User {
  _id: string; // MongoDB specific field
}

// Connect directly to Better Auth's user collection
const BetterAuthUserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: 'user', // Better Auth uses 'user' collection name
    strict: false, // Allow additional Better Auth fields
  },
);

export const BetterAuthUserModel = mongoose.model<IBetterAuthUser>(
  'BetterAuthUser',
  BetterAuthUserSchema,
);

// Helper functions to work with Better Auth users
export class BetterAuthUserService {
  // Get user by ID
  static async getUserById(userId: string): Promise<IBetterAuthUser | null> {
    try {
      return await BetterAuthUserModel.findOne({ id: userId });
    } catch (error) {
      console.error('Error fetching Better Auth user by ID:', error);
      return null;
    }
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<IBetterAuthUser | null> {
    try {
      return await BetterAuthUserModel.findOne({ email });
    } catch (error) {
      console.error('Error fetching Better Auth user by email:', error);
      return null;
    }
  }

  // Get all users (for testing/admin)
  static async getAllUsers(): Promise<IBetterAuthUser[]> {
    try {
      return await BetterAuthUserModel.find({}).sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error fetching all Better Auth users:', error);
      return [];
    }
  }

  // Create test user (for development)
  static async createTestUser(userData: CreateTestUserInput): Promise<IBetterAuthUser | null> {
    try {
      const user = new BetterAuthUserModel({
        id: new mongoose.Types.ObjectId().toString(), // Generate ID similar to Better Auth
        email: userData.email,
        name: userData.name,
        emailVerified: userData.emailVerified || false,
        image: userData.image,
      });

      return await user.save();
    } catch (error) {
      console.error('Error creating test user:', error);
      return null;
    }
  }

  // Update user profile
  static async updateUser(
    userId: string,
    updateData: { name?: string; image?: string | null },
  ): Promise<IBetterAuthUser | null> {
    try {
      // Try to find by id first, then by _id as fallback
      let updatedUser = await BetterAuthUserModel.findOneAndUpdate(
        { id: userId },
        {
          ...updateData,
          updatedAt: new Date(),
        },
        { new: true },
      );

      // If not found by id, try by _id (MongoDB ObjectId)
      if (!updatedUser && mongoose.Types.ObjectId.isValid(userId)) {
        updatedUser = await BetterAuthUserModel.findByIdAndUpdate(
          userId,
          {
            ...updateData,
            updatedAt: new Date(),
          },
          { new: true },
        );
      }

      return updatedUser;
    } catch (error) {
      console.error('Error updating Better Auth user:', error);
      return null;
    }
  }

  // Format user for API response
  static formatUser(user: IBetterAuthUser | null) {
    if (!user) return null;

    return {
      id: user.id || user._id?.toString(), // Fallback to MongoDB _id if id is missing
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
