// Global test setup
process.env.NODE_ENV = 'test';

// Mock AWS SDK
jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      get: jest.fn().mockReturnThis(),
      put: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      query: jest.fn().mockReturnThis(),
      scan: jest.fn().mockReturnThis(),
      promise: jest.fn(),
    })),
  },
  RDS: jest.fn(() => ({
    describeDBClusters: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  })),
  SecretsManager: jest.fn(() => ({
    getSecretValue: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  })),
}));