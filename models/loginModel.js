import mongoose from 'mongoose';

// Define a Mongoose schema for user login data
let loginSchema = new mongoose.Schema({
    email: String,
    password:String
}) 
   
// Create a Mongoose model named 'UserLogin' based on the 'loginSchema'
let loginModel = mongoose.model('UserLogin', loginSchema);

export {loginModel}