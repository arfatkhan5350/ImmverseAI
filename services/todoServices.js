import { todoModel } from '../models/todoModel.js';

// Service function to add a new todo item
let addTodo = async (todoItem) => {

  // Create a new 'todoModel' instance with the provided 'todoItem'
  let todoDb = new todoModel({ todoItem });
  try {
    let todoData = await todoDb.save();
    if (todoData) {
      return 'success';
    } else return 'error';
  } catch (error) {
    console.log(error);
  }
};

// Function to list all todo items with optional pagination
const listTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    // Retrieve the total number of todo items from the database
    const totalItems = await todoModel.find();

    if (endIndex < totalItems) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // Retrieve and return a list of todo items with optional pagination
    results.results = await todoModel
      .find()
      .limit(limit)
      .skip(startIndex)
      .exec();

    // Send the results back to the client
    return results;
  } catch (error) {
    console.log(error);
  }
};


// Service function to delete a todo item by ID
let deleteItem = async (id) => {
  try {
    // Find and delete a todo item by its ID
    let todoData = await todoModel.findByIdAndDelete(id);
    if (todoData) {
      return 'success';
    } else {
      return 'error';
    }
  } catch (error) {
    console.log(error);
  }
};

// Service function to update a todo item by ID
let updateItem = async (id, todoItem) => {
  try {
     // Find and update a todo item by its ID with the provided 'todoItem'
    let todoData = await todoModel.findByIdAndUpdate(id, { todoItem });
    if (todoData) {
      return 'success';
    } else {
      return 'error';
    }
  } catch (error) {
    console.log(error);
  }
};
export { addTodo, listTodos, deleteItem, updateItem };
