const express = require('express')
const app = express()
const mongoose = require('mongoose');

var exphbs = require('express-handlebars');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost/rotten-potatoes');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
//let pledges = [
////  { name: "Mr. Eric Federberg", amount: "1,000,000" },
////  { name: "Mr. and Mrs. Eren and Emily Cross", amount: "2,000" }
//]

const Pledge = mongoose.model('Pledge', {
  name: String,
  amount: Number
});

//// INDEX
//app.get('/', (req, res) => {
//  res.render('pledges-index', { pledges: pledges });
//})

// INDEX
app.get('/', (req, res) => {
  Pledge.find()
    .then(pledges => {
      res.render('pledges-index', { pledges: pledges });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW
app.get('/pledges/new', (req, res) => {
  res.render('pledges-new', {});
})


// CREATE
app.post('/pledges', (req, res) => {
  Pledge.create(req.body)
  .then((pledge) => {
    console.log(pledge);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(7000, () => {
  console.log('App listening on port 7000!')
})
