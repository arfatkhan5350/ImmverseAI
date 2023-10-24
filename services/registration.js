import { loginModel } from '../models/loginModel.js'
import bcrypt from 'bcrypt'

// Service function for user registration
let registrationServices = async (email, password) => {
    // Hash the provided 'password' for security
    let hashPassword =await bcrypt.hash(password, 10)
    
    try {
       // Create a new 'loginModel' instance with the provided 'email' and hashed 'password'
        let data = await loginModel({ email, password: hashPassword })
        
        // Save the user data in the database
        let user = await data.save()
        
        // Check if the user data was successfully saved and return "success" or "error"
       if (user) {
        return "success"
       } else {
        return "error"
       }
   } catch (error) {
    console.log(error)
   }
}

export {registrationServices}