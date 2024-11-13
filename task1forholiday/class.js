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

}