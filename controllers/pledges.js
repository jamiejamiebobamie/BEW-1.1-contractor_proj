const express = require('express');
const app = express();
const Pledge = require('../models/pledge');
const Thankyou = require('../models/thank_you')
var admin = require('../app')

//Admin login page route
app.get('/login', (req, res) => {
  if (admin == false) {
  admin = true;
  res.render('admin-login-true', {});
} else {
    admin = false;
    res.render('admin-login-false', {});
};
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
    res.redirect(`/pledges/${pledge._id}`)
  }).catch((err) => {
    console.log(err.message);
  })
})

// SHOW
app.get('/pledges/:id', (req, res) => {
  Pledge.findById(req.params.id).then((pledge) => {
     Thankyou.find({ pledgeId: req.params.id }).then(thankyous => {
    if (admin == false) {
    res.render('pledges-show', { pledge: pledge, thankyous: thankyous });
} else {
    res.render('pledges-show-admin', { pledge: pledge, thankyous: thankyous })
}
})
  }).catch((err) => {
    console.log(err.message);
});
});




//----ADMIN FEATURES -----
// DELETE
app.delete('/pledges/:id', function (req, res) {
  console.log("DELETE pledge")
  Pledge.findByIdAndRemove(req.params.id).then((pledge) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
});
});

// EDIT Pledge
app.get('/pledges/:id/edit', (req, res) => {
  Pledge.findById(req.params.id, function(err, pledge) {
    res.render('pledges-edit', {pledge: pledge});
  })
});

// UPDATE Pledge
app.put('/pledges/:id', (req, res) => {
  Pledge.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/pledges/${pledge._id}`)
    })
    .catch(err => {
      console.log(err.message)
  });
});

























//rotten-potatoes

// WAY #2
//phylis does it this way below

    //root route
    app.get('/', (req, res) => {
        Review.find()
           .then(reviews => {
             res.render('reviews-index', { reviews: reviews });
           })
           .catch(err => {
             console.log(err);
           })
    });

    // NEW review form
    app.get('/reviews/new', (req, res) => {
      res.render('reviews-new', {});
  });

    // CREATE NEW review
    app.post('/reviews', (req, res) => {
      Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
      }).catch((err) => {
        console.log(err.message);
      })
  });


  // SHOW A single review by clicking on the title link in index, WITH COMMENTS!!!
  app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
      // fetch its comments
      Comment.find({ reviewId: req.params.id }).then(comments => {
        // respond with the template with both values
        res.render('reviews-show', { review: review, comments: comments })
      })
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });


    // EDIT a review by clicking on the edit link in the shown review
    app.get('/reviews/:id/edit', (req, res) => {
      Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
      })
  });

    // UPDATE... does this replace EDIT? ...guess not...
    app.put('/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
          res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
          console.log(err.message)
        })
    });

    // DELETE one review from the delete button on the "shown" review page
    app.delete('/reviews/:id', function (req, res) {
      console.log("DELETE review")
      Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
      }).catch((err) => {
        console.log(err.message);
      })
  });

module.exports = app;
