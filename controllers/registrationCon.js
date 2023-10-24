import {registrationServices} from '../services/registration.js'

// Define a registration controller as an asynchronous function
let registrationCon =async (req, res) => {
    let { email, password } = req.body
   
    try {
         // Call the registrationServices function to register a user with the provided 'email' and 'password'
        let registerUser = await registrationServices(email, password)

        // Check if the registration was successful (as determined by the 'registrationServices' function)
        if (registerUser=="success") {
            res.status(200).send({message: " user registration successfully"})
        } else {
            res.send('registration failed')
        }
    } catch (error) {
        
    }
}

export {registrationCon}