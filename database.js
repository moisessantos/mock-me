const uuid = require('uuid/v1');

const defaultContent = {
  default: { response: 'default mock content' },
};

let database = defaultContent;

const mockResult = (data) => {
  if (!data) {
    return new Error('No data provided');
  }
  const guid = uuid();

  if (database[guid]) {
    return new Error('Guid provided already exists in the database');
  }
  database[guid] = data;

  return guid;
};

const getResult = guid => database[guid] || database.default;

const getDatabase = () => database;

const clearDatabase = () => {
  database = Object.assign({}, defaultContent);
};

module.exports = {
  mockResult,
  getResult,
  clearDatabase,
  getDatabase,
};
