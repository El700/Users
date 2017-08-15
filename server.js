var express = require('express')
var app = express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tp8');
var bodyParser = require('body-parser');
var User    = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;

app.get('/user', function(req, res) {
  res.setHeader('Content-Type', 'application/json');

    User.find(function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        })
});

app.post('/user', function(req, res) {
    User.create({email: req.body.email ,password: req.body.password}, function (err, small) {
        if(err) {
            res.send(err);
        } else { 
            res.send('Your added!');
        }

    });
    
});

app.patch('/user/:id', function(req, res) {
 User.findOneAndUpdate({
   _id: req.params.id   
   },
   { $set: { password: req.body.password}
 }, {upsert: true}, function(err, oldUser) {
   if (err) {
     res.send('error updating ');
   } else {
     console.log(oldUser);
     res.send(oldUser);
   }
 });
});

app.listen(port);