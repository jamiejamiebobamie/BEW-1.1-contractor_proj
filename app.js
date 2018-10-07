const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');
const adminPassword = "password";
var admin = false;

var exphbs = require('express-handlebars');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost/rotten-potatoes');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// OUR MOCK ARRAY OF PROJECTS
//let pledges = [
////  { name: "Mr. Eric Federberg", amount: "1,000,000" },
////  { name: "Mr. and Mrs. Eren and Emily Cross", amount: "2,000" }
//]

const Pledge = mongoose.model('Pledge', {
  name: String,
  amount: Number
});

const Password = mongoose.model('Password', {
    password: String
});


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

// SHOW
app.get('/pledges/:id', (req, res) => {
  Pledge.findById(req.params.id).then((pledge) => {
    if (admin == false) {
    res.render('pledges-show', { pledge: pledge })
} else {
    res.render('pledges-show-admin', { pledge: pledge })
}
  }).catch((err) => {
    console.log(err.message);
  })
})


//----ADMIN FEATURES -----
// EDIT Pledge
app.get('/pledges/:id/edit', (req, res) => {
  Pledge.findById(req.params.id, function(err, pledge) {
    res.render('pledges-edit', {pledge: pledge});
  })
})

// UPDATE Pledge
app.put('/pledges/:id', (req, res) => {
  Pledge.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/pledges/${pledge._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})


//Admin login page route
app.get('/login', (req, res) => {
  res.render('admin-login', {});
//  if (admin == false) {
//  admin = true;
//} else {
//    admin = false;
//};
});

// CREATE login password to change admin status to true
app.post('/', (req, res) => {
  Password.create(req.body)
  .then((password) => {
    if (password == adminPassword) {
        admin = true;
      } else {
          admin = false;
      };
    console.log(password);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
});
});

//function change() {
//    if (admin == false) {
//    admin = true;
//  } else {
//      admin = false;
//};

//function change() {
//  var change = document.getElementById("check");
//  if (change.value == "false") {
//    document.test.elements["savereport"].value = "True";
//    //document.test.submit();
//  } else {
//    change.value = "true";
//  }
//}


app.listen(7000, () => {
  console.log('App listening on port 7000!')
})
