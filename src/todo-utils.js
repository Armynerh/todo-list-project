import { handleDelete, handleCheckBoxChange, handleEdit } from './todo-func.js';// eslint-disable-line

export const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];
export const renderTodos = () => {
  const todos = getTodos();

  const todolist = todos.sort((a, b) => a?.index - b?.index).map((todo) => `
  <div class='todo-item ${todo.completed ? 'completed' : ''}' id="todo-item-${todo.index}">
  <label>
    <input type='checkbox' id=${todo.index} class='todo-check' ${todo.completed ? 'checked' : ''}>
    ${todo.description}
  </label>
  <div class='kebab' id=kebab-${todo.index}>
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </div>
  <i class="fa-solid fa-pen-to-square" id="edit-${todo.index}"></i>
  <i class="fa-solid fa-trash" id="trash-${todo.index}"></i>
</div>
  `).join('');

  const task = document.querySelector('.tasks');
  task.innerHTML = todolist;

  const checkbox = document.querySelectorAll('.todo-check');
  checkbox.forEach((n) => n.addEventListener('change', handleCheckBoxChange));

  const editBtn = document.querySelectorAll('.fa-pen-to-square');
  editBtn.forEach((btn) => btn.addEventListener('click', handleEdit));

  const trashBtn = document.querySelectorAll('.fa-trash');
  trashBtn.forEach((btn) => btn.addEventListener('click', handleDelete));
};
export const refresh = () => {
  renderTodos(); // Now “renderTodos” can be called after it’s defined
};
