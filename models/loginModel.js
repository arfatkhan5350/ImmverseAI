import mongoose from 'mongoose';

let loginSchema = new mongoose.Schema({
    email: String,
    password:String
}) 
   

let loginModel = mongoose.model('UserLogin', loginSchema);

export {loginModel}