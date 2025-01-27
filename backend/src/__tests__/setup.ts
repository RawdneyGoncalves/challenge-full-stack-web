import 'reflect-metadata';
import { jest, beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import { AppDataSource } from '../config/database';

describe('Database Setup', () => {
  it('should mock AppDataSource', () => {
    expect(AppDataSource.getRepository).toBeDefined();
  });
});

beforeAll(async () => {
  jest.mock('../config/database', () => ({
    AppDataSource: {
      getRepository: jest.fn()
    }
  }));
});

afterAll(async () => {
  jest.clearAllMocks();
});

export { AppDataSource };