// // Let's start with the backend code (Node.js + Express.js)

// // ✅ Folder Structure:
// // └── backend/
// //     ├── config/
// //     │   └── passport.js
// //     ├── controllers/
// //     │   └── authController.js
// //     ├── models/
// //     │   └── User.js
// //     ├── routes/
// //     │   └── authRoutes.js
// //     ├── .env
// //     ├── server.js
// //     └── package.json

// // ✅ Step 1: Initialize project and install dependencies
// // Run this in terminal:
// // npm init -y
// // npm install express mongoose dotenv passport passport-google-oauth20 cookie-session cors

// // ✅ Step 2: Create `server.js` — Main Entry Point

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const passport = require('passport');
// const session = require('cookie-session');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// require('./config/passport'); // Import passport setup

// dotenv.config();
// const app = express();

// // Connect MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB Connected'))
// .catch((err) => console.error('❌ Mongo Error:', err));

// // Middleware
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use(express.json());

// // Cookie session
// app.use(
//   session({
//     name: 'session',
//     keys: ['key1', 'key2'],
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//   })
// );

// // Initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/api/auth', authRoutes);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));










// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const passport = require('./config/passport');
// const authRoutes = require('./routes/auth');
// const cors = require('cors');

// const app = express();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// app.use(cors({
//   origin: 'http://localhost:3000', // your frontend URL
//   credentials: true,
// }));

// app.use(express.json());

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));














require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
require('./config/passport');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
  })
  .catch(err => console.log(err));
