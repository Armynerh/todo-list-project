import './style.css';
import { addTodo, deleteTask, editTaskDescription, getTodos } from './todo-func';

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

export const renderTodos = () => {
  const todos = getTodos();
  console.log("RENDER", { todos })

  const todolist = todos.sort((a, b) => a?.index - b?.index).map((todo) => `
    <div class='todo-item' id="todo-item-${todo.index}">
      <label>
        <input type='checkbox' id=${todo.index} class='todo-check' >
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
  
  const editBtn = document.querySelectorAll(`.fa-pen-to-square`);
  editBtn.forEach((btn) => btn.addEventListener('click', handleEdit));

  const trashBtn = document.querySelectorAll(`.fa-trash`);
  trashBtn.forEach((btn) => btn.addEventListener('click', handleDelete));
};

function handleDelete() {
  const id = this.id.split('-')[1];
  deleteTask(Number(id));
}

function handleEdit() {
  const id = this.id.split('-')[1];
  const todoItem = document.getElementById(`todo-item-${id}`);
  const todoDescription = todoItem.querySelector('label');

  const currentDescription = todoDescription.textContent.trim();
  todoDescription.innerHTML = `
    <input type="text" id="edit-todo-input" value="${currentDescription}">
    <i class="fa-solid fa-check" id="save-${id}"></i>
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

function handleCheckBoxChange() {
  const id = this.id;
  const remBtn = document.querySelector(`#kebab-${id}`);
  remBtn.innerHTML = `<i class="fa-solid fa-pen-to-square" id="edit-${id}"></i><span><i class="fa-solid fa-trash" id=trash-${id}></i></span>`;
  const trashBtn = document.querySelector(`#trash-${id}`);
  const editBtn = document.querySelector(`#edit-${id}`);

  trashBtn.addEventListener('click', handleDelete);
  editBtn.addEventListener('click', handleEdit);
}

export function refresh() {
  renderTodos();
}

document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
});
