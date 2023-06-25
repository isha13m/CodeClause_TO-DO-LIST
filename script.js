// Get DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const allBtn = document.getElementById('all-btn');
const activeBtn = document.getElementById('active-btn');
const completedBtn = document.getElementById('completed-btn');
const clearBtn = document.getElementById('clear-btn');

let todos = [];

// Function to create a new to-do item
function createTodoItem(todo) {
  const todoItem = document.createElement('li');
  todoItem.innerText = todo;
  todoItem.classList.add('todo-item');

  todoItem.addEventListener('click', () => {
    todoItem.classList.toggle('completed');
    updateLocalStorage();
  });

  todoList.appendChild(todoItem);
}

// Function to render the to-do list
function renderTodoList() {
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    createTodoItem(todo);
  });
}

// Function to add a new to-do item
function addTodoItem(event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    todos.push(todoText);
    createTodoItem(todoText);
    updateLocalStorage();
    todoInput.value = '';
  }
}

// Function to apply filters
function applyFilter(filterType) {
  const filterButtons = [allBtn, activeBtn, completedBtn];
  filterButtons.forEach((btn) => btn.classList.remove('active'));

  if (filterType === 'all') {
    renderTodoList();
    allBtn.classList.add('active');
  } else if (filterType === 'active') {
    const activeTodos = todos.filter((todo) => !todoList.querySelector(`li.todo-item.completed:contains(${todo})`));
    todos = activeTodos;
    renderTodoList();
    activeBtn.classList.add('active');
  } else if (filterType === 'completed') {
    const completedTodos = todos.filter((todo) => todoList.querySelector(`li.todo-item.completed:contains(${todo})`));
    todos = completedTodos;
    renderTodoList();
    completedBtn.classList.add('active');
  }
}

// Function to clear completed items
function clearCompleted() {
  const completedTodos = todoList.querySelectorAll('.todo-item.completed');
  completedTodos.forEach((todo) => todo.remove());
  todos = todos.filter((todo) => !todoList.querySelector(`li.todo-item.completed:contains(${todo})`));
  updateLocalStorage();
}

// Function to update local storage
function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Event listeners
todoForm.addEventListener('submit', addTodoItem);
allBtn.addEventListener('click', () => applyFilter('all'));
activeBtn.addEventListener('click', () => applyFilter('active'));
completedBtn.addEventListener('click', () => applyFilter('completed'));
clearBtn.addEventListener('click', clearCompleted);

// Load saved todos from local storage
const savedTodos = localStorage.getItem('todos');
if (savedTodos) {
  todos = JSON.parse(savedTodos);
  renderTodoList();
}
