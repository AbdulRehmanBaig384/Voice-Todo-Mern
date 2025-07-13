// import jwt from "jsonwebtoken";
// import { User } from "../models/user";

// export const protect = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
//   if (!token) return res.status(401).json({ message: "No token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };


// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');

// // --------- Local Registration ---------
// router.post('/register', async (req, res) => {
//   const { email, password, displayName } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password required' });
//   }
  
//   try {
//     let user = await User.findOne({ email: email.toLowerCase() });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     user = new User({ email: email.toLowerCase(), password, displayName });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // --------- Local Login ---------
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ message: 'Email and password required' });

//   try {
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // Login user by setting session user id
//     req.login(user, (err) => {
//       if (err) return res.status(500).json({ message: 'Login error' });
//       return res.json({ message: 'Logged in successfully' });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // --------- Google OAuth Login ---------
// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     res.redirect('/todos'); // Or wherever your frontend is
//   }
// );

// // --------- Logout ---------
// router.get('/logout', (req, res, next) => {
//   req.logout(err => {
//     if (err) return next(err);
//     res.redirect('/');
//   });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Google OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback (matches your GOOGLE_CALLBACK_URL)
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Adjust to your frontend route
  }
);


router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    try {
      // generate token (you can use JWT or any method you're using)
      const user = req.user;
      const jwt = require('jsonwebtoken');
      const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', {
        expiresIn: '1d',
      });

      // Redirect back to frontend with token
      res.redirect(`http://localhost:3000/login?token=${token}`);
    } catch (err) {
      console.error('OAuth callback error:', err);
      res.redirect('/login');
    }
  }
);




// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('http://localhost:3000/login?token=${token}');
  });
});

// Add your local login and register routes here if needed...

module.exports = router;















// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken'); // ✅ move to top

// // Google OAuth login
// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// // Google OAuth callback (after user signs in with Google)
// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   async (req, res) => {
//     try {
//       const user = req.user;

//       // ✅ Generate JWT token
//       const token = jwt.sign(
//         { id: user._id, email: user.email },
//         process.env.JWT_SECRET, // 🔐 should be in .env
//         { expiresIn: '1d' }
//       );

//       // ✅ Redirect back to frontend with token
//       res.redirect(`http://localhost:3000/login?token=${token}`);
//     } catch (err) {
//       console.error('OAuth callback error:', err);
//       res.redirect('http://localhost:3000/login?error=oauth_failed');
//     }
//   }
// );

// // Logout
// router.get('/logout', (req, res, next) => {
//   req.logout(err => {
//     if (err) return next(err);
//     // ✅ Fix: token is undefined here, so just redirect
//     res.redirect('http://localhost:3000/login');
//   });
// });

// module.exports = router;
