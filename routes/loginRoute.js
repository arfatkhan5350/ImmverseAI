import express from 'express';
let loginRouter = express.Router();
import { loginController } from '../controllers/loginController.js';
import { registrationCon } from '../controllers/registrationCon.js';
import { resetPassCont } from '../controllers/resetPassCont.js';
import {
  addTodoData,
  listAllTodo,
  deleteTodo,
  updateTodo,
} from '../controllers/todoController.js';

// endPoint for user login
loginRouter.post('/login', loginController);


//endPoint for user registration 
loginRouter.post('/registration', registrationCon);


//endPoint for  resetpassword 
loginRouter.put('/resetpassword', resetPassCont);


//endPoint for add todo item
loginRouter.post('/addtodo', addTodoData);


//endPoint for list todo item
loginRouter.get('/listtodo', listAllTodo);


//endPoint for delete todo item
loginRouter.delete('/deletetodo/:id', deleteTodo);


//endPoint for update todo item
loginRouter.put('/updatetodo/:id', updateTodo);


export default loginRouter;
