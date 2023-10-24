import mongoose from 'mongoose';

// Define a Mongoose schema for todo items
let todoSchema =new mongoose.Schema({
    todoItem: {
        type: String,
        required: [true, 'Please enter your todo item'], // Field for storing the description of the todo item with a required validation message
    }
});

// Create a Mongoose model named 'todoData' based on the 'todoSchema'
let todoModel = mongoose.model('todoData', todoSchema)

export {todoModel} 