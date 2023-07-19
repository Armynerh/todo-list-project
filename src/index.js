import './style.css';

const todos = [
  {
    description: 'Some words',
    completed: true,
    index: 1,
  },
  {
    description: 'Some other words',
    completed: true,
    index: 2,
  },
  {
    description: 'Some last words',
    completed: false,
    index: 3,
  },
];

const todolist = todos.map((todo) => `<li><label><input type='checkbox' id=${todo.index}> ${todo.description}</label> <div id='kebab'><i class="fa-solid fa-ellipsis-vertical"></i></div></li>`).join('');
const task = document.querySelector('.tasks');

document.addEventListener('DOMContentLoaded', () => {
  task.innerHTML = todolist;
});
