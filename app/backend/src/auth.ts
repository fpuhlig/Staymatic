import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/staymatic';
const client = new MongoClient(mongoUri);
const db = client.db('staymatic');

// Better Auth secret
const secret =
  process.env.BETTER_AUTH_SECRET || 'your-super-secret-key-for-development-minimum-32-characters';

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BACKEND_URL || 'http://localhost:3001',
  basePath: '/api/auth',
  secret,

  // Email & Password Settings
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disable for development
    minPasswordLength: 8, // Minimum password length (OWASP recommendation)
    maxPasswordLength: 128, // Maximum password length (NIST recommendation)
    autoSignIn: true, // Auto sign in after successful registration
    disableSignUp: false, // Set to true to disable new registrations
  },

  // Session Settings
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (session will be updated if it's older than this)
  },

  // User Settings
  user: {
    // Additional fields can be added here if needed
    changeEmail: {
      enabled: true, // Allow users to change their email
    },
    deleteUser: {
      enabled: false, // Disable user deletion for now
    },
  },

  // Rate Limiting
  rateLimit: {
    enabled: true, // Enable rate limiting
    window: 60, // 60 seconds window
    max: 10, // Max 10 requests per window per IP
  },

  // Advanced Security Settings
  advanced: {
    useSecureCookies:
      process.env.NODE_ENV === 'production' && !process.env.BACKEND_URL?.includes('localhost'), // Secure cookies in production, but not on localhost
    crossSubDomainCookies: {
      enabled: false, // Disable cross-subdomain cookies for security
    },
  },

  // Trusted Origins
  trustedOrigins: [process.env.FRONTEND_URL || 'http://localhost:3000'],
});
