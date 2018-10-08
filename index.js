var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
const path = require('path')
var app = express();
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*var jwtCheck = jwt({
    secret: rsaValidation(),
    algorithms: ['RS256'],
    issuer: "https://jbaclig.auth0.com/",
    audience: 'wedding-rsvp-api'
});

app.use(jwtCheck);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'Missing or invalid token' });
    }
});*/

routes(app);

var server = app
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    //.get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, function () {
        console.log(`Listening on ${PORT}`);
    });

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
});

