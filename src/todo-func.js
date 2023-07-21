import { renderTodos } from './todo-utils.js';// eslint-disable-line

export const refresh = () => {
  renderTodos(); // Now “renderTodos” can be called after it’s defined
};
export const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];
export const updateStatus = (index, completed) => {
  let todos = getTodos();
  todos = todos.map((todo) => {
    if (todo.index === index) {
      todo.completed = completed;
    }
    return todo;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  refresh();
};
export const deleteTask = (index) => {
  let todos = getTodos();
  const filteredTodos = todos.filter((n) => n.index !== index);
  // Update the indexes of the remaining tasks
  const updatedTodos = filteredTodos.map((task, i) => {
    task.index = i;
    return task;
  });
  todos = updatedTodos;
  localStorage.setItem('todos', JSON.stringify(todos));
  refresh();
};
export const editTaskDescription = (index, newDescription) => {
  let todos = getTodos();
  todos = todos.map((todo) => {
    if (todo.index === index) {
      todo.description = newDescription;
    }
    return todo;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  refresh();
};
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
export function handleDelete() {
  const id = this.id.split('-')[1];
  deleteTask(Number(id));
}
export function handleEdit() {
  const id = this.id.split('-')[1];
  const todoItem = document.getElementById(`todo-item-${id}`);
  const todoDescription = todoItem.querySelector('label');
  const currentDescription = todoDescription.textContent.trim();
  todoDescription.innerHTML = `
  <input type='text' id='edit-todo-input' value='${currentDescription}'>
  <i class='fa-solid fa-check' id='save-${id}'></i>
 `;
  const saveBtn = document.getElementById(`save-${id}`);
  saveBtn.addEventListener('click', () => {
    const updatedDescription = document.getElementById('edit-todo-input').value;
    if (updatedDescription.trim() !== '') {
      editTaskDescription(Number(id), updatedDescription);
      refresh();
    }
  });
}
export function handleCheckBoxChange() {
  const { id } = this;
  const completed = this.checked;
  updateStatus(Number(id), completed);
}