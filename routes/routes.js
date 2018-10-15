const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

var appRouter = (app) => {
  client.connect();

  app.use(function(req, res, next) {
    let allowedOrigins = ['http://localhost:3000', 'http://jkbaclig.com', 'http://162.204.180.196', 'http://192.168.1.73','https://127.0.0.1'];
    let origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
  });

  app.get('/', function (req, res) {
    res.status(200).send('Welcome to our restful API!!!');
  });

  app.put('/rsvp/:guestId/attending/:attending', (req, res) => {
    try {
      client.query(`
        UPDATE rsvp
        SET attending = ${req.params.attending}
        WHERE id = ${req.params.guestId}
      `, (err, data) => {
        if(err) throw err;
        res.status(200).json(data);
      });
    }
    catch(err) {
      res.status(500).send('Error: ', err);
    }
  });

  app.put('/rsvp/:guestId/attending/:attending/guest/:guestAttending', (req, res) => {
    try {
      client.query(`
        UPDATE rsvp
        SET attending = ${req.params.attending},
            guest_attending = ${req.params.guestAttending}
        WHERE id = ${req.params.guestId}
      `, (err, data) => {
        if(err) throw err;
        if(data) {
          res.status(200).json(data);
        }
      });
    }
    catch (err) {
      res.status(500).send('Error: ', err);
    }
  });

  app.get('/group/:groupNum', (req, res) => {
    try {
      client.query(`
        SELECT * FROM rsvp
        WHERE group_num = ${req.params.groupNum}
      `, (err, data) => {
        if(err) throw err;
        res.status(200).json(data.rows);
      });
    }
    catch(err) {
      res.status(500).send('Error: ', err);
    }
  });

  app.get('/id/:id', (req, res) => {
    try {
      client.query(`
        SELECT * FROM rsvp
        WHERE id = ${req.params.id}
      `, (err, data) => {
        if(err) throw err;
        res.status(200).json(data.rows);
      });
    }
    catch(err) {
      res.status(500).send('Error: ', err);
    }
  });

  app.get('/find/:firstName/:lastName', (req, res) => {
    try {
      client.query(`
        SELECT * FROM rsvp
        WHERE lower(first_name) LIKE lower('${req.params.firstName}')
        AND lower(last_name) LIKE lower('${req.params.lastName}')
      `, (err, data) => {
        if (err) throw err;
        if(data) {
          res.status(200).json(data.rows);
        }
        else {
          res.status(200).send('No invites matching that name were found.  Please try another name.');
        }
      });
    }
    catch(err) {
      res.status(500).send('Error: ', err);
    }
    
  });

  app.get('/routes', (req, res) => {
    res.status(200).send(app._router.stack);
  });

  app.get('/db', (req, res) => {
    try {
      client.query('SELECT * from rsvp;', (err, data) => {
        if (err) throw err;
        res.status(200).send(data);
        
        /*for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }*/
      });
    }
    catch (err) {
      res.status(500).send('Error: ', err);
    }

  });
}

module.exports = appRouter;   