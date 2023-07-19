import './style.css';

const todos = [
  {
    description: 'Clean the house',
    completed: true,
    index: 2,
  },
  {
    description: 'Complete To Do list',
    completed: false,
    index: 3,
  },
  {
    description: 'Wash the dishes',
    completed: true,
    index: 1,
  },

];

const todolist = todos.sort((a, b) => a.index - b.index).map((todo) => `<div class='todo-item'><label><input type='checkbox' id=${todo.index}> ${todo.description}</label> <div id='kebab'><i class="fa-solid fa-ellipsis-vertical"></i></div></div>`).join('');
const task = document.querySelector('.tasks');

document.addEventListener('DOMContentLoaded', () => {
  task.innerHTML = todolist;
});
