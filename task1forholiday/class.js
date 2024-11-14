export class ToDoItem {
    constructor(id, title, isDone = false, createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.isDone = isDone;
        this.createdAt = createdAt;
    }
}

export class ToDoList {
    constructor() {
        this.todos = [];
    }

    add(title) {
        const newItem = new ToDoItem(this.todos.length + 1, title);
        this.todos.push(newItem);
        return newItem;
    }

    edit(id, newTitle) {
        const todo = this.todos.find(item => item.id === id);
        if (todo) todo.title = newTitle;
    }

    delete(id) {
        this.todos = this.todos.filter(item => item.id !== id);
    }

    changeDone(id) {
        const todo = this.todos.find(item => item.id === id);
        if (todo) todo.isDone = !todo.isDone;
    }

    search(query) {
        return this.todos.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    }

    filterByDone(status) {
        if (status === "done") return this.todos.filter(item => item.isDone);
        if (status === "incomplete") return this.todos.filter(item => !item.isDone);
        return this.todos;
    }

    sortByName(order) {
        return this.todos.sort((a, b) =>
            order === "A-Z" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );
    }

    sortByDate(order) {
        return this.todos.sort((a, b) =>
            order === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
        );
    }
}
