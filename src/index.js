import './style.css';
import { renderTodos, addTodo } from './todo-func.js';

const addBtn = document.querySelector('.todo-add-btn');

addBtn.addEventListener('click', () => {
  const txtInput = document.getElementById('todo-input');
  const text = txtInput.value.trim();
  if (text !== '') {
    addTodo(text);
    txtInput.value = '';
    txtInput.focus();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
});
