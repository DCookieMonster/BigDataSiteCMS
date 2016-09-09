// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
// connect to our database
mongoose.connect('mongodb://localhost/contentful');
var People     = require('./app/models/people');
var Project     = require('./app/models/project');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    // console.log(req);
    // console.log(res);
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /content_models
// ----------------------------------------------------
router.route('/people')
    // create a bear (accessed at POST http://localhost:8080/api/people)
    .post(function(req, res) {


      // firstName: { type: String, required: true},
      // lastName: { type: String, required: true},
      // school: { type: String, required: false, default:"Ben-Gurion University, Information Systems Engineering"},
      // title: { type: String, required: true},
      // status: { type: String, required: true},
      // status: { type: String, required: true},
      // linkedin: { type: String },
      // website: {type: String},
      // scholar: {type: String},
      // gmail: { type: String }
        var people = new People();      // create a new instance of the Bear model
        people.firstName = req.body.firstName;  // set the bears name (comes from the request)
        people.lastName = req.body.lastName;  // set the bears name (comes from the request)
        people.school = req.body.school;
        people.title = req.body.title;  // set the bears name (comes from the request)
        people.status = req.body.status;  // set the bears name (comes from the request)
        people.rank = req.body.rank;
        people.gmail = req.body.gmail;
        people.scholar = req.body.scholar;
        people.website = req.body.website;
        people.linkedin = req.body.linkedin;

        // save the bear and check for errors
        people.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'people created!' });
        });

    })
    // get all the bears (accessed at GET http://localhost:8080/api/people)
   .get(function(req, res) {
       People.find(function(err, people) {
           if (err)
               res.send(err);

           res.json(people);
       });
   });



   // on routes that end in /models/:models_name
   // ----------------------------------------------------
   router.route('/people/:rank')

       // get the bear with that id (accessed at GET http://localhost:8080/api/people/:rank)
       .get(function(req, res) {
           People.find({"rank": {$regex : req.params.rank}}, function(err, people) {
               if (err)
                   res.send(err);
               res.json(people);
           });
       })
       // update the bear with this id (accessed at PUT http://localhost:8080/api/models/:id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Model.findById(req.params.id, function(err, people) {

            if (err)
                res.send(err);

            people._id = req.body.id;  // update the bears info

            // save the bear
            People.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Model updated!' });
            });

        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/people/:id)
   .delete(function(req, res) {
       People.remove({
           _id: req.params.id
       }, function(err, people) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
   });




// ==================================================================================
// on routes that end in /project
// ----------------------------------------------------
router.route('/project')
    // create a bear (accessed at POST http://localhost:8080/api/people)
    .post(function(req, res) {

        var project = new Project();      // create a new instance of the Bear model
        project.name = req.body.name;  // set the bears name (comes from the request)
        project.people_on_the_project = req.body.people_on_the_project;  // set the bears name (comes from the request)
        project.supervisors = req.body.supervisors;
        project.completion_date = req.body.completion_date;  // set the bears name (comes from the request)

        // save the bear and check for errors
        project.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'project created!' });
        });

    })
    // get all the bears (accessed at GET http://localhost:8080/api/people)
   .get(function(req, res) {
       Project.find(function(err, project) {
           if (err)
               res.send(err);

           res.json(project);
       });
   });



   // on routes that end in /models/:models_name
   // ----------------------------------------------------
   router.route('/project/:name')

       // get the bear with that id (accessed at GET http://localhost:8080/api/project/:name)
       .get(function(req, res) {
           Project.find({"name": name}, function(err, project) {
               if (err)
                   res.send(err);
               res.json(project);
           });
       })
       // update the bear with this id (accessed at PUT http://localhost:8080/api/project/:name)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Project.findById(req.params.id, function(err, project) {

            if (err)
                res.send(err);

            project._id = req.body.id;  // update the bears info

            // save the bear
            Project.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Project updated!' });
            });

        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/project/:id)
   .delete(function(req, res) {
       Project.remove({
           _id: req.params.id
       }, function(err, people) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
   });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
