export const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];
export function renderTodos() {
  const todos = getTodos();

  const todolist = todos
    .sort((a, b) => a.index - b.index)
    .map(
      (todo) => `
      <div class='todo-item' id="todo-item-${todo.index}">
        <label>
          <input type='checkbox' data-id="${todo.index}" class='todo-check' >
          ${todo.description}
        </label>
        <div class='kebab' data-id="${todo.index}">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <i class="fa-solid fa-pen-to-square" data-id="${todo.index}"></i>
        <i class="fa-solid fa-trash" data-id="${todo.index}"></i>
      </div>
    `,
    )
    .join('');

  const task = document.querySelector('.tasks');
  task.innerHTML = todolist;

  const editBtn = document.querySelectorAll('.fa-pen-to-square');
  editBtn.forEach((btn) => btn.addEventListener('click', handleEdit));// eslint-disable-line

  const trashBtn = document.querySelectorAll('.fa-trash');
  trashBtn.forEach((btn) => btn.addEventListener('click', handleDelete));// eslint-disable-line
}

export function editTaskDescription(index, newDescription) {
  const todos = getTodos().map((todo) => {
    if (todo.index === index) {
      todo.description = newDescription;
    }
    return todo;
  });

  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

export function handleEdit(event) {
  const { id } = event.target.dataset;
  const todoItem = document.getElementById(`todo-item-${id}`);
  const todoDescription = todoItem.querySelector('label');

  const currentDescription = todoDescription.textContent.trim();
  todoDescription.innerHTML = `
    <input type="text" id="edit-todo-input" value="${currentDescription}">
    <i class="fa-solid fa-check" data-id="${id}"></i>
  `;

  const saveBtn = document.querySelector(`[data-id="${id}"]`);
  saveBtn.addEventListener('click', () => {
    const updatedDescription = document.getElementById('edit-todo-input').value;
    if (updatedDescription.trim() !== '') {
      editTaskDescription(Number(id), updatedDescription);
    }
  });
}

export function deleteTask(index) {
  const todos = getTodos().filter((todo) => todo.index !== index);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}
export function handleDelete(event) {
  const { id } = event.target.dataset;
  deleteTask(Number(id));
}

export const addTodo = (text) => {
  const todos = getTodos();
  const maxIndex = todos.reduce((max, todo) => (todo.index > max ? todo.index : max), -1);
  const todo = {
    description: text,
    completed: false,
    index: maxIndex + 1, // Assigning the correct index for the new todo
  };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
};

renderTodos(); // Initially render todos on page load
