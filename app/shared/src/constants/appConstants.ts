// Application constants
export const APP_CONSTANTS = {
  // Server configuration
  DEFAULT_BACKEND_PORT: 3001,
  DEFAULT_FRONTEND_PORT: 3000,
  DEFAULT_MONGO_PORT: 27017,

  // URLs
  DEFAULT_BACKEND_URL: 'http://localhost:3001',
  DEFAULT_FRONTEND_URL: 'http://localhost:3000',
  DEFAULT_MONGO_URI: 'mongodb://localhost:27017/staymatic',

  // Auth configuration
  DEFAULT_AUTH_SECRET: 'your-super-secret-key-for-development-minimum-32-characters',
  AUTH_BASE_PATH: '/api/auth',

  // API configuration
  DEFAULT_SORT_ORDER: { createdAt: -1 },

  // Error messages
  ERRORS: {
    INVALID_ID: 'Invalid property ID',
    PROPERTY_NOT_FOUND: 'Property not found',
    VALIDATION_FAILED: 'Validation failed',
    FETCH_PROPERTIES_FAILED: 'Failed to fetch properties',
    CREATE_PROPERTY_FAILED: 'Failed to create property',
    UPDATE_PROPERTY_FAILED: 'Failed to update property',
    DELETE_PROPERTY_FAILED: 'Failed to delete property',
    FETCH_PROPERTY_FAILED: 'Failed to fetch property',
    FETCH_PROPERTIES_WITH_HOSTS_FAILED: 'Failed to fetch properties with hosts',
    FETCH_PROPERTY_WITH_HOST_FAILED: 'Failed to fetch property with host',
    MONGO_CONNECTION_ERROR: '❌ MongoDB connection error:',
    MONGO_CONNECTION_SUCCESS: '✅ Connected to MongoDB',
    // User-related errors
    FETCH_USERS_FAILED: 'Failed to fetch users',
    CREATE_USER_FAILED: 'Failed to create test user',
    UPDATE_USER_FAILED: 'Failed to update profile',
    USER_NOT_FOUND: 'User not found or update failed',
    USER_ID_REQUIRED: 'User ID is required',
    NAME_REQUIRED: 'Name is required',
    EMAIL_NAME_REQUIRED: 'Email and name are required',
  },

  // Success messages
  SUCCESS: {
    PROPERTY_DELETED: 'Property deleted successfully',
  },
} as const;

// Type exports for type safety
export type AppConstants = typeof APP_CONSTANTS;
export type ErrorMessages = typeof APP_CONSTANTS.ERRORS;
export type SuccessMessages = typeof APP_CONSTANTS.SUCCESS;
