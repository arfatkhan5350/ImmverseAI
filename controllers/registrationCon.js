import {registrationServices} from '../services/registration.js'

let registrationCon =async (req, res) => {
    let { email, password } = req.body
   
    try {
        let registerUser = await registrationServices(email, password)
        if (registerUser=="success") {
            res.status(200).send({message: " user registration successfully"})
        } else {
            res.send('registration failed')
        }
    } catch (error) {
        
    }
}

export {registrationCon}