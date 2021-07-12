const express = require('express');

const Snippet = require('./Snippet.js');

const app = express();
const portNumber = 11625;
const baseURL = 'http://localhost:' + portNumber;

const snippetMap = new Map();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Stellar!');
});

app.post('/snippets', (req, res) => {
  let snippetName = req.body.name;
  let snippet = new Snippet(baseURL + "/snippets", req.body.name, req.body.expires_in, req.body.snippet);

  snippetMap.set(snippetName, snippet);
  res.status(201).send(snippet.getFormattedResponse());
});

app.get('/snippets/:snippetName', (req, res) => {
  const snippet = snippetMap.get(req.params.snippetName);
  if (snippet == null) {
    res.status(404).send("Snippet not found.");
  } else if (snippet.hasExpired()) {
    snippetMap.delete(snippet);
    res.status(404).send("Snippet not found: may have expired");
  } else {
    res.status(200).send(snippet.getFormattedResponse());
  }
});

app.listen(portNumber, () => {
  console.log('Snippet server running on localhost:' + portNumber);
});
