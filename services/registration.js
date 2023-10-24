import { loginModel } from '../models/loginModel.js'
import bcrypt from 'bcrypt'

let registrationServices = async (email,password) => {
    let hashPassword =await bcrypt.hash(password, 10)
    
   try {
       let data = await loginModel({ email, password:hashPassword })
       let user = await data.save()
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