// // import mongoose from "mongoose";
// // import bcrypt from "bcrypt";

// // const userSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true },
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String },           // empty for Google accounts
// //     googleId: { type: String },           // only for Google auth users
// //     avatar: { type: String },
// //   },
// //   { timestamps: true }
// // );

// // // hash password before save
// // userSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();
// //   this.password = await bcrypt.hash(this.password, 10);
// //   next();
// // });

// // // match password for login
// // userSchema.methods.matchPassword = function (entered) {
// //   return bcrypt.compare(entered, this.password);
// // };

// // export const User = mongoose.model("User", userSchema);






// // // models/User.js
// // import mongoose from 'mongoose';

// // const userSchema = new mongoose.Schema({
// //   googleId: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// //   name: {
// //     type: String,
// //     required: true,
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });

// // const User = mongoose.model('User', userSchema);
// // export default User;



// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const UserSchema = new mongoose.Schema({
//   googleId: {
//     type: String,
//     unique: true,
//     sparse: true, // because not every user has googleId
//   },
//   email: {
//     type: String,
//     unique: true,
//     sparse: true, // for Google users who don't have local email login
//     lowercase: true,
//   },
//   password: {
//     type: String,
//   },
//   displayName: {
//     type: String,
//   },
// });

// // Hash password before saving (only for local signup)
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // Method to compare password on login
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', UserSchema);
















const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },  // Will be undefined if user logs in with Google
  googleId: { type: String },  // For Google login users
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
