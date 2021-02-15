const express = require('express');
const { getResult, mockResult } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  if (!req.query.guid) {
    return res.status(200).send('Hello world!');
  }
  const result = getResult(req.query && req.query.guid);
  if (result) {
    return res.status(200).send(result);
  }
  return res.status(404).send('Resource not found');
});

app.post('/mock', (req, res) => {
  try {
    return res.status(200).send(mockResult(req.query && req.query.data));
  } catch (ex) {
    return res.status(500).send({ 'mock-me failed with the following error': ex });
  }
});

app.listen(PORT);
