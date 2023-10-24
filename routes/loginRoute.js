import express from 'express';
let loginRouter = express.Router();
import { loginController } from '../controllers/loginController.js'
import { registrationCon } from '../controllers/registrationCon.js';
import { resetPassCont } from '../controllers/resetPassCont.js';
import {addTodoData,listAllTodo,deleteTodo,updateTodo} from '../controllers/todoController.js';

loginRouter.post('/login',loginController)

loginRouter.post('/registration', registrationCon)

loginRouter.put('/resetpassword', resetPassCont)

loginRouter.post('/addtodo', addTodoData)

loginRouter.get('/listtodo', listAllTodo)

loginRouter.delete('/deletetodo/:id', deleteTodo)

loginRouter.put('/updatetodo/:id', updateTodo)



export default loginRouter