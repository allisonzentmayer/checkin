const moment = require('moment');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'akz',
  host: 'localhost',
  database: 'checkin',
  password: '',
  port: 5432,
});

const getVisitors = (req, res) => {
    pool.query('SELECT * FROM "visitors" ORDER BY created_at DESC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows);
    })
};

const signOutVisitor = (req, res) => {
  const visitorId = parseInt(req.params.id)
  const signedOut = moment().format();
  
  pool.query(
    'UPDATE visitors SET signed_out = $1 WHERE id = $2',
    [signedOut, visitorId],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User ${visitorId} successfully signed out`);
    }
  )
}

const newVisitor = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const notes = req.body.notes;
  const createdAt = moment().format();

  pool.query(
    'INSERT INTO "visitors" (first_name, last_name, notes, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstName, lastName, notes, createdAt],
    (error, results) => {
      if (error) {
        throw error
      }
      res.send(204);
    });
};

module.exports = {
  getVisitors,
  signOutVisitor,
  newVisitor,
}