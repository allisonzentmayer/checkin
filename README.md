# CheckIn App

To run node api:
`npm run dev`

To run react ui:
`cd app/client`
`npm run start `

Use the following details to create a local postgres database with a table called "visitors" and the columns id, first_name, last_name, notes, created_at, signed_out
`const pool = new Pool({
  user: 'localhost',
  host: 'localhost',
  database: 'checkin',
  password: '',
  port: 5432,
});`



Outstanding issues:

- acceptance testing
- fix styling on add new visitor modal
- add controller in node api
- more comprehensive filter and search functionality on checkin ui 
- front end and back end validation
