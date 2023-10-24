import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv'
import dbConnection from './db/dbConnection.js'
import loginRouter from './routes/loginRoute.js'
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express()
dotenv.config()
const port = process.env.PORT || 3000

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "ImmverseAI",
        version: "1.0.0",
        description: "API documentation for the application",
      },
    },
 
    apis: ["swaggerDocs/*.js"],
  };
  
  //Swagger documentation
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use("/api/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));



// database connection
const db=process.env.DBURL
dbConnection(db)


// login route
app.use('/users',loginRouter )


app.listen(port, () => console.log(`http://localhost:${port}/`))