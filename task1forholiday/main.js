import { ToDoItem, ToDoList } from './class.js';

const todoList = new ToDoList();
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const sortNameSelect = document.getElementById('sort-name-select');
const sortDateSelect = document.getElementById('sort-date-select');
const todoListContainer = document.getElementById('todo-list');
const pendingCount = document.getElementById("pending-count");
const clearBtn = document.getElementById("clear-btn");

function renderTodos(todos) {
    todoListContainer.innerHTML = '';
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = `${todo.title} (${moment(todo.createdAt).format('YYYY-MM-DD HH:mm')})`;
        listItem.className = todo.isDone ? 'done' : 'incomplete';

        const doneBtn = document.createElement('button');
        doneBtn.textContent = '✔️';
        doneBtn.onclick = () => {
            todoList.changeDone(todo.id);
            renderTodos(todoList.todos);
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.onclick = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    todoList.delete(todo.id);
                    renderTodos(todoList.todos);
                    Swal.fire(
                        'Deleted!',
                        'Your task has been deleted.',
                        'success'
                    );
                }
            });
        };

        const renameBtn = document.createElement('button');
        renameBtn.textContent = '✏️';
        renameBtn.onclick = () => {
            Swal.fire({
                title: 'Rename task',
                input: 'text',
                inputPlaceholder: 'Enter new task name',
                inputValue: todo.title,
                showCancelButton: true,
                confirmButtonText: 'Rename',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    todoList.rename(todo.id, result.value);
                    renderTodos(todoList.todos);
                    Swal.fire(
                        'Renamed!',
                        'Your task has been renamed.',
                        'success'
                    );
                }
            });
        };


        listItem.append(doneBtn, deleteBtn, renameBtn);
        todoListContainer.appendChild(listItem);
    });

    updatePendingCount();
}

function updatePendingCount() {
    const pendingTasks = todoList.todos.filter(todo => !todo.isDone).length;
    pendingCount.textContent = pendingTasks;
}

addBtn.onclick = () => {
    if (todoInput.value) {
        todoList.add(todoInput.value);
        todoInput.value = '';
        renderTodos(todoList.todos);
    }
};

searchInput.oninput = () => {
    const filteredTodos = todoList.search(searchInput.value);
    renderTodos(filteredTodos);
};

filterSelect.onchange = () => {
    const filteredTodos = todoList.filterByDone(filterSelect.value);
    renderTodos(filteredTodos);
};

sortNameSelect.onchange = () => {
    const sortedTodos = todoList.sortByName(sortNameSelect.value);
    renderTodos(sortedTodos);
};

sortDateSelect.onchange = () => {
    const sortedTodos = todoList.sortByDate(sortDateSelect.value);
    renderTodos(sortedTodos);
};

clearBtn.onclick = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will clear all tasks!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, clear all!'
    }).then((result) => {
        if (result.isConfirmed) {
            todoList.todos = [];
            renderTodos(todoList.todos);
            Swal.fire(
                'Cleared!',
                'All tasks have been removed.',
                'success'
            );
        }
    });
};

// Initial render
renderTodos(todoList.todos);




