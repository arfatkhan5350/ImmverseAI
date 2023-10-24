import { loginModel } from '../models/loginModel.js';
import { isEmpty } from './isEmpty.js';
import validator from 'validator';
import bcrypt from 'bcrypt';

let resetPassCont = async (req, res) => {
  try {
    let { email, newPassword } = req.body;
    let errors = {};

    email = !isEmpty(email) ? email : null;
    newPassword = !isEmpty(newPassword) ? newPassword : null;

    if (validator.isEmpty(email)) {
      errors.email = 'Email is required';
    }
    let lowercaseEmail = email.toLowerCase();
    if (
      !validator.isEmail(lowercaseEmail, {
        min: 4,
        max: 30,
      })
    ) {
      errors.email = 'Email should be between 4 and 30 characters.';
    }

    if (validator.isEmpty(newPassword)) {
      errors.password = 'password is required';
    }
    // if (
    //   !validator.isStrongPassword(newPassword, {
    //   minLength: 8,
    //   minLowercase: 1,
    //   minUppercase: 1,
    //   minNumbers: 1,
    //   minSymbols: 1,
    //   })
    // ) {
    //   errors.password =
    //     'Password should be atleast 8 characters and combination of One Uppercase, One Lowercase, One Number and One Special symbol.';
    // }

    if (Object.keys(errors).length > 0) {
      res.status(401).send({
        status: false,
        message: 'Invalid data',
        errorData: errors,
      });
    } else {
      const verifyEmailResult = await loginModel.findOne({
        email: lowercaseEmail,
      });
      if (verifyEmailResult) {
        const hashedPassword = bcrypt.hashSync(newPassword, 12);

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

function errorResponse(res, statusCode, message, methodName) {
  res.status(statusCode).send({
    status: false,
    // methodName: methodName,
    message: message,
  });
}

export { resetPassCont };
