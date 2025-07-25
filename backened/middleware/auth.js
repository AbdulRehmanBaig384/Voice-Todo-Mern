const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); 
  }
);


router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    try {
    
      const user = req.user;
      const jwt = require('jsonwebtoken');
      const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', {
        expiresIn: '1d',
      });

      res.redirect(`http://localhost:3000/login?token=${token}`);
    } catch (err) {
      console.error('OAuth callback error:', err);
      res.redirect('/login');
    }
  }
);


router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('http://localhost:3000/login?token=${token}');
  });
});



module.exports = router;



