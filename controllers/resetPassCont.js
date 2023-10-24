import { loginModel } from '../models/loginModel.js';
import { isEmpty } from './isEmpty.js';
import validator from 'validator';
import bcrypt from 'bcrypt';

// Define a reset password controller as an asynchronous function
let resetPassCont = async (req, res) => {
  try {
    let { email, newPassword } = req.body;
    let errors = {};// Initialize an object to store validation errors

    // Validate and sanitize email and newPassword inputs
    email = !isEmpty(email) ? email : null;
    newPassword = !isEmpty(newPassword) ? newPassword : null;

     // Check if the email is empty and add an error if it is
    if (validator.isEmpty(email)) {
      errors.email = 'Email is required';
    }

     // Convert the email to lowercase and check if it's a valid email address with specific length constraints
    let lowercaseEmail = email.toLowerCase();
    if (
      !validator.isEmail(lowercaseEmail, {
        min: 4,
        max: 30,
      })
    ) {
      errors.email = 'Email should be between 4 and 30 characters.';
    }

     // Check if the newPassword is empty and add an error if it is
    if (validator.isEmpty(newPassword)) {
      errors.password = 'password is required';
    }

     // If there are validation errors, respond with a 401 Unauthorized
    if (Object.keys(errors).length > 0) {
      res.status(401).send({
        status: false,
        message: 'Invalid data',
        errorData: errors,
      });
    } else {   // If there are no validation errors, proceed to reset the user's password

      // Verify if a user with the given email exists in the database
      const verifyEmailResult = await loginModel.findOne({
        email: lowercaseEmail,
      });
      if (verifyEmailResult) {

        // If the user exists, hash the new password
        const hashedPassword = bcrypt.hashSync(newPassword, 12);

         // Update the user's password in the database
        var updatePassword = await loginModel.updateOne(
          { email: lowercaseEmail },
          { password: hashedPassword }
        );

        if (updatePassword.modifiedCount === 1) {
          res.status(201).send({
            status: true,
            message: 'Password reset successfully',
          });
        } else {
          errorResponse(
            res,
            400,
            'unable to reset password',
            'resetUserPassword'
          );
        }
      } else {
        errorResponse(
          res,
          404,
          'No user found for given email',
          'resetUserPassword'
        );
      }
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Something went wrong', 'resetUserPassword');
  }
};

// Helper function to send error responses
function errorResponse(res, statusCode, message, methodName) {
  res.status(statusCode).send({
    status: false,
    // methodName: methodName,
    message: message,
  });
}

export { resetPassCont };
