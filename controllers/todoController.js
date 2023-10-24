import {
  addTodo,
  listTodos,
  deleteItem,
  updateItem,
} from '../services/todoServices.js';

let addTodoData = async (req, res) => {
  let { todoItem } = req.body;

  try {
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

let listAllTodo = async (req, res) => {
  try {
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

let deleteTodo = async (req, res) => {
  let id = req.params.id;
  try {
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

let updateTodo = async (req, res) => {
  let id = req.params.id;
  let { todoItem } = req.body;
  try {
    let isUpdate = await updateItem(id, todoItem);
    if (isUpdate == 'success') {
      res.status(200).send({ message: 'item updated successfully' });
    } else {
      res.status(404).send({ message: 'error while updating' });
    }
  } catch (error) {}
};

export { addTodoData, listAllTodo, deleteTodo, updateTodo };
