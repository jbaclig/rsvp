const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

var appRouter = (app) => {
  app.get("/", function (req, res) {
    console.log('db', process.env.DATABASE_URL);
    res.status(200).send("Welcome to our restful API!!!");
  });

  app.get('/db', (req, res) => {
    client.connect();
    client.query('SELECT * from rsvp;', (err, data) => {
      if (err) throw err;
      res.status(200).send(data);
      /*for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }*/
      client.end();
    });
  });
}

module.exports = appRouter;   