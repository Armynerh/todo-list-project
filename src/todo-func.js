// Add the required import for the refresh function at the beginning of the file.
import { refresh } from "./index";

export const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];

export const addTodo = (text) => {
  const todos = getTodos();

  const todo = {
    description: text,
    completed: false,
    index: todos.length,
  };

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  refresh();
};

export const deleteTask = (index) => {
  let todos = getTodos();

  const filteredTodos = todos.filter((n) => n.index != index);

  // Update the indexes of the remaining tasks
  const updatedTodos = filteredTodos.map((task, i) => {
    console.log({ tI: task.index, id: i })
    task.index = i;
    return task;
  });

  todos = updatedTodos;
  localStorage.setItem('todos', JSON.stringify(todos));
  refresh();
};

export const editTaskDescription = (index, newDescription) => {
  let todos = getTodos();
  console.log({ todos, index });
  todos = todos.map(todo => {
    if (todo.index === index) {
      todo.description = newDescription;
    }
    return todo;
  });

  localStorage.setItem('todos', JSON.stringify(todos));
  refresh();
};
