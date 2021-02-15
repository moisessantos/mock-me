const {
  getResult, mockResult, clearDatabase, getDatabase,
} = require('../database');

beforeEach(() => {
  jest.clearAllMocks();
  clearDatabase();
});

const guid = '623f3505-58ac-44a0-93b6-ea4f2601a9b9';
let mockUUID = jest.fn(() => guid);

jest.mock('uuid/v1', () => jest.fn(() => mockUUID()));

const data = { name: 'name', url: 'url' };

describe('getResult tests', () => {
  it('should return default value when no guid is sent', () => {
    expect(getResult()).toEqual({ response: 'default mock content' });
  });

  it('should return null when guid is not in database', () => {
    expect(getResult(guid)).toBe(null);
  });

  it('should return stored value for that guid', () => {
    mockUUID = jest.fn(() => guid);
    mockResult(data);

    expect(getResult(guid)).toEqual(data);
  });
});

describe('mockResult tests', () => {
  it('should thrown error when no data is sent', () => {
    expect(mockResult()).toEqual(new Error('No data provided'));
  });

  it('should return guid when data is sent', () => {
    expect(mockResult(data)).toBe(guid);
  });

  it('should return error when guid is already in database', () => {
    mockUUID = jest.fn(() => 'default');

    expect(mockResult(data)).toEqual(new Error('Guid provided already exists in the database'));
  });
});

describe('clearDatabase', () => {
  it('should set database with default content', () => {
    mockResult(data);

    // Act
    clearDatabase(data);

    expect(Object.keys(getDatabase()).length).toBe(1);
  });
});

describe('getDatabase', () => {
  it('should get database items', () => {
    const result = getDatabase();

    expect(Object.keys(result).length).toBe(1);
    expect(result.default).toEqual({ response: 'default mock content' });
  });
});
