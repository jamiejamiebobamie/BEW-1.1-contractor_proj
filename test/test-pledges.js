const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Pledge = require('../models/pledge');

const samplePledge =     {
    "name": "String",
    "amount": 5
}

chai.use(chaiHttp);

describe('Pledges', ()  => {

    after(() => {
        Pledge.deleteMany({name: 'String'}).exec((err, reviews) => {
          console.log(pledges);
          pledges.remove();
        })
      });

  // TEST INDEX
  it('should index ALL pledges on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });


  // TEST NEW
  it('should display new form on /pledges/new GET', (done) => {
    chai.request(server)
      .get(`/pledges/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

  // TEST CREATE
  it('should create a SINGLE pledge on /pledges POST', (done) => {
    chai.request(server)
        .post('/pledges')
        .send(samplePledge)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

  // TEST SHOW
  it('should show a SINGLE pledge on /pledges/<id> GET', (done) => {
    var pledge = new Pledge(samplePledge);
    pledge.save((err, data) => {
      chai.request(server)
        .get(`/pledges/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });

  // TEST EDIT
 it('should edit a SINGLE pledge on /pledges/<id>/edit GET', (done) => {
 var pledge = new Pledge(samplePledge);
  pledge.save((err, data) => {
    chai.request(server)
      .get(`/pledges/${data._id}/edit`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
  });
 });

 // TEST UPDATE
  it('should update a SINGLE pledge on /pledges/<id> PUT', (done) => {
    var pledge = new Pledge(samplePledge);
    pledge.save((err, data)  => {
     chai.request(server)
      .put(`/pledges/${data._id}?_method=PUT`)
      .send({'name': 'Harriot Rigsby'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });

  // TEST DELETE
   it('should delete a SINGLE pledge on /pledges/<id> DELETE', (done) => {
     var pledge = new Pledge(samplePledge);
     pledge.save((err, data)  => {
      chai.request(server)
       .delete(`/pledges/${data._id}?_method=DELETE`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
     });
   });
 });
