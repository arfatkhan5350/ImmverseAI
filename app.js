import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import dbConnection from './db/dbConnection.js';
import loginRouter from './routes/loginRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
dotenv.config(); // Load environment variables from a .env file
const port = process.env.PORT || 3000; // Define the application port, defaulting to 3000 if not provided in the environment variables


// Body parser setup to parse incoming JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins
app.use(cors());


// Swagger documentation setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'ImmverseAI',
      version: '1.0.0',
      description: 'API documentation for the application',
    },
  },

  // Define the paths of your Swagger documentation files
  apis: ['swaggerDocs/*.js'],
};

// Generate Swagger documentation based on the provided options
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve the Swagger documentation through the '/api/swagger' endpoint
app.use('/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// Database connection setup using the 'dbConnection' function from 'db/dbConnection.js'
const db = process.env.DBURL;  // Get the database connection URL from environment variables
dbConnection(db);


// Define routes for user login under the '/users' endpoint
app.use('/users', loginRouter);

// Start the Express application and listen on the defined port
app.listen(port, () => console.log(`Server is running at http://localhost:${port}/`));
