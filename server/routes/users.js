const router = require('express').Router();
const User = require('../models/user');
const passport = require('../config/passport');
const pick = require('lodash/pick');

/**
 * The requests on the route '/users' are:
 * GET: Returns all the users in the database.
 *    TODO: Only return the users if the request is authenticated as role='dev/admin'
 * POST: Creates a new user in the database.
 *    TODO: Create users through other means of authentication (google, fb etc.)
 */
router.route('/')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      User.find()
        .then(users => res.send(users))
        .catch(err => console.log(err));
    }
  })

  .post((req, res) => {
    const { username, password } = req.body;
    
    const user = new User({username: username, role:'client'});
    User.register(user, password)
      .then( user => {
        passport.authenticate('local', (err, user, info) => {
          if (err) return res.json(err);
          if (!user) return res.json(info);
          req.logIn(user, function(err) {
            if (err) return res.json(err);
            return res.status(201).json(pick(user, ['username', 'role', 'alias']));
          });
        })(req, res);
      })
      .catch( err => {
        if (err.name === 'UserExistsError'){
          res.status(400).json('The username already exists.');
        } else {
          console.log(err);
        }
      });
  });

router.route('/login')
  .post((req, res) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) return res.json(err);
      if (!user) return res.status(401).json(info.message);
      req.logIn(user, function(err) {
        if (err) return res.json(err);
        return res.status(200).json(pick(user, ['username', 'role', 'alias']));
      });
    })(req, res);
  });

router.route('/:id')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      User.findById(req.params.id)
        .then(user => res.json(pick(user, ['username', 'role', 'alias'])))
        .catch(err => console.log(err));
    }
  });


module.exports = router;
