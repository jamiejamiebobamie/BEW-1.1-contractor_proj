const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');
var admin = false;

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

const pledges = require('./controllers/pledges');
const thank_yous = require('./controllers/thank_yous');
const Pledge = require('./models/pledge');
const Thankyou = require('./models/thank_you');

const port = process.env.PORT || 7000;

app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', pledges);
app.use( thank_yous);

//About page route
app.get('/about', (req, res) => {
  res.render('about', {});
});

app.listen(port);

module.exports = app;
