import { isEmpty } from './isEmpty.js';
import validator from 'validator';
import { loginModel } from '../models/loginModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define a login controller as an asynchronous function
let loginController = async (req, res) => {
  try {
    const userData = req.body;
    let email = userData.email;
    let password = userData.password;

    let errors = {};// Initialize an object to store validation errors

     // Validate and sanitize email and password inputs
    email = !isEmpty(email) ? email : null;
    password = !isEmpty(password) ? password : null;

     // Check if the email is empty and add an error if it is
    if (validator.isEmpty(email)) {
      errors.email = 'Email is required';
    }

     // Convert the email to lowercase and check if it's a valid email address
    var lowercaseEmail = email.toLowerCase();
    if (!validator.isEmail(lowercaseEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    // Check if the email length is within a specific range
    if (
      !validator.isEmail(lowercaseEmail, {
        min: 4,
        max: 30,
      })
    ) {
      errors.email = 'Email should be between 4 and 30 characters';
    }

     // Check if the password is empty and add an error if it is
    if (validator.isEmpty(password)) {
      errors.password = 'Password is required';
    }

    // If there are validation errors, respond with a 400 Bad Request
    if (Object.keys(errors).length > 0) {
      res.status(400).send({
        status: false,
        message: 'Invalid data !',
        errorData: errors,
      });
    } else {   // If there are no validation errors, proceed to authenticate the user

       // Verify if the user with the given email exists in the database
      const verifyEmailResult = await loginModel.findOne({
        email: lowercaseEmail,
      });
      if (verifyEmailResult) {
         // If the user exists, compare the provided password with the stored hashed password
        var unHashed = bcrypt.compareSync(password, verifyEmailResult.password);
        if (unHashed) {
           // If the passwords match, generate a JWT token
          var token = jwt.sign(
            {
              id: verifyEmailResult._id,
            },
            process.env.SECRET_KEY
          );

           // Create a user details object with the user's ID and the generated token
          var userDetails = {
            userId: verifyEmailResult._id,
            token: token,
          };

           // Respond with a success message and the user's details
          res.status(200).send({
            status: true,
            message: 'Logged in successful',
            userData: userDetails,
          });
        } else {
          errorResponse(res, 404, "Password doesn't match", 'LoginByEmail');
        }
      } else {
        errorResponse(
          res,
          404,
          'No user found for given email',
          'LoginByEmail'
        );
      }
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, 'Internal server error', 'LoginByEmail');
  }

   // Helper function to send error responses
  function errorResponse(res, statusCode, message, methodName) {
    res.status(statusCode).send({
      status: false,
       // methodName: methodName,
      message: message,
    });
  }
};

export { loginController };
