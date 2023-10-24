import {
  addTodo,
  listTodos,
  deleteItem,
  updateItem,
} from '../services/todoServices.js';

// Controller to add a new todo item
let addTodoData = async (req, res) => {
  let { todoItem } = req.body;

  try {
    // Call the 'addTodo' function to add the provided 'todoItem'
    let postData = await addTodo(todoItem);

    if (postData) {
      res.status(201).send({ message: 'item added successfully in todo' });
    } else {
      res.send('error');
    }
  } catch (error) {
    console.log(error);
  }
};

// Controller to list all todo items
let listAllTodo = async (req, res) => {
  try {
     // Call the 'listTodos' function to retrieve the list of todo items
    let show = await listTodos(req, res);
    if (show) {
      res.status(200).send({
        status: true,
        message: 'Data found successfully',
        data: show.results,
      });
    } else {
      res.status(404).send('No data found');
    }
  } catch (error) {
    console.log(error);
  }
};

// Controller to delete a specific todo item by ID
let deleteTodo = async (req, res) => {
  let id = req.params.id;
  try {
     // Call the 'deleteItem' function to delete a todo item by ID
    let isDelete = await deleteItem(id);
    if (isDelete == 'success') {
      res.status(200).send({ message: 'item deleted successfully' });
    } else {
      res.status(404).send({ message: 'error while deleting' });
    }
  } catch (error) {
    console.log(error);
  }
};

// Controller to update a specific todo item by ID
let updateTodo = async (req, res) => {
  let id = req.params.id;
  let { todoItem } = req.body;
  try {
     // Call the 'updateItem' function to update a todo item by ID with the provided 'todoItem'
    let isUpdate = await updateItem(id, todoItem);
    if (isUpdate == 'success') {
      res.status(200).send({ message: 'item updated successfully' });
    } else {
      res.status(404).send({ message: 'error while updating' });
    }
  } catch (error) {
    console.log(error);
  }
};

export { addTodoData, listAllTodo, deleteTodo, updateTodo };
