const express = require('express');
const app = express();
const Pledge = require('../models/pledge');
const Thankyou = require('../models/thank_you')


//All Admin features below -----

//NEW Thank you
app.post('/pledges/thankyous/', (req, res) => {
 Thankyou.create(req.body).then(thankyou => {
   console.log(thankyou);
   res.redirect(`/pledges/${thankyou.pledgeId}`);
 }).catch((err) => {
   console.log(err.message);
 });
});

// DELETE
app.delete('/pledges/thankyous/:id', function (req, res) {
 console.log("DELETE thankyou")
 Thankyou.findByIdAndRemove(req.params.id).then((thankyou) => {
   res.redirect(`/pledges/${thankyou.pledgeId}`);
 }).catch((err) => {
   console.log(err.message);
});
});

module.exports = app;
