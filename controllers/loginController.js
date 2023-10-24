import { isEmpty } from './isEmpty.js';
import validator from 'validator';
import { loginModel } from '../models/loginModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
let loginController = async (req, res) => {
  try {
    const userData = req.body;
    let email = userData.email;
    let password = userData.password;

    let errors = {};

    email = !isEmpty(email) ? email : null;
    password = !isEmpty(password) ? password : null;

    if (validator.isEmpty(email)) {
      errors.email = 'Email is required';
    }
    var lowercaseEmail = email.toLowerCase();

    if (!validator.isEmail(lowercaseEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    if (
      !validator.isEmail(lowercaseEmail, {
        min: 4,
        max: 30,
      })
    ) {
      errors.email = 'Email should be between 4 and 30 characters';
    }

    if (validator.isEmpty(password)) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).send({
        status: false,
        message: 'Invalid data !',
        errorData: errors,
      });
    } else {
      const verifyEmailResult = await loginModel.findOne({
        email: lowercaseEmail,
      });
      if (verifyEmailResult) {
        var unHashed = bcrypt.compareSync(password, verifyEmailResult.password);
        if (unHashed) {
          var token = jwt.sign(
            {
              id: verifyEmailResult._id,
            },
            process.env.SECRET_KEY
          );

          var userDetails = {
            userId: verifyEmailResult._id,
            token: token,
          };

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
  function errorResponse(res, statusCode, message, methodName) {
    res.status(statusCode).send({
      status: false,
      // methodName: methodName,
      message: message,
    });
  }
};

export { loginController };
