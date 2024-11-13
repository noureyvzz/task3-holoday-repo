import { ToDoItem, ToDoList } from './class.js';


const todoList = new ToDoList();
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const sortNameSelect = document.getElementById('sort-name-select');
const sortDateSelect = document.getElementById('sort-date-select');
const todoListContainer = document.getElementById('todo-list');

function renderTodos(todos) {
    todoListContainer.innerHTML = '';
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = ${ todo.title } (${ moment(todo.createdAt).format('2024-5-05 04:12') });
    listItem.className = todo.isDone ? 'done' : 'incomplete';

    const doneBtn = document.createElement('button');
    doneBtn.textContent = '✔️';
    doneBtn.onclick = () => {
        todoList.changeDone(todo.id);
        renderTodos(todoList.todos);
    };
}
