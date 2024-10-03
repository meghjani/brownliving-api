const express = require("express");
const queries = require('./queries');
var cors = require('cors')

const app = express();
const port = 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Fetch the incidents
app.get('/incidents', async function(req, res, next) {
  try {
    res.json(await queries.getUserIncidents(req.query.email));
  } catch (err) {
    console.error(`Error while getting incidents `, err.message);
    next(err);
  }
});

// Create the incident
app.post('/incident', async function(req, res, next) {
  try {
    res.json(await queries.createUserIncident(req.body));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

// Update the incident
app.put('/incident/:id', async function(req, res, next) {
  try {
    res.json(await queries.updateUserIncident(req.params.id, req.body));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

// Update the incident
app.delete('/incident/:id', async function(req, res, next) {
  try {
    res.json(await queries.deleteUserIncident(req.params.id));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});