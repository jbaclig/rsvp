const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our restful API!!!");
    });

    app.get('/db', async (req, res) => {
        console.log('db');
        try {
          const client = await pool.connect()
          const result = await client.query('SELECT * FROM test_table');
          res.status(200).send(result);
          client.release();
        } catch (err) {
          console.error(err);
          res.send("Error " + err);
        }
      });
}
  
module.exports = appRouter;   