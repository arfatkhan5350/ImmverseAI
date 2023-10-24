import { todoModel } from '../models/todoModel.js';

let addTodo = async (todoItem) => {
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


const listTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

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



let deleteItem = async (id) => {
  try {
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

let updateItem = async (id, todoItem) => {
  try {
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
