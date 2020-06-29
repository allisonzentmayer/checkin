const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./db/queries')

const port = 8000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, () => {  console.log('We are live on ' + port);});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/entries', (req, res) => {
  console.log('Getting visitors');
  db.getVisitors(req, res);
});
app.post('/entries', (req, res) => {
  console.log('Creating new visitor');  
  db.newVisitor(req, res)
});
app.post('/visitor/:id/signout', (req, res) => {
  console.log('Signing out visitor');    
  db.signOutVisitor(req, res)
});
