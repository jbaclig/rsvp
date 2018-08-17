var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
const path = require('path')
var app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .listen(PORT, function () {
        console.log(`Listening on ${PORT}`);
    });