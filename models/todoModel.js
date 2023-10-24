import mongoose from 'mongoose';

let todoSchema ={
    todoItem: { type: String, required: [true, 'enter your name']}
 
   
};

let todoModel = mongoose.model('todoData', todoSchema)

export {todoModel} 