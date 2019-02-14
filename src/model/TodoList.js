'use strict';

function TodoList({ tasks, statuses, priorities }) {
    this.tasks = tasks;
    this.statuses = statuses;
    this.priorities = priorities;
}

// Getting tasks from localStorage
TodoList.getStorageTasks = () => {
    return localStorage.getItem('tasks_list_board') && JSON.parse(localStorage.getItem('tasks_list_board'));
};

// Amount tasks value by status
TodoList.tasksCount = (status) => {
    const todolists = TodoList.restore();

    let count = 0;
    todolists.forEach(item => {
        item.status === status ? ++count : count;
    });
    return count;
};

// Save task into в localStorage
TodoList.initialize = (tasks) => {
        tasks.forEach(item =>
            new Task(item).save()
        );
};

// Getting objects collection Map of tasks from localStorage
TodoList.restore = () => {
    // Объект Map содержит пары ключ-значение и сохраняет порядок вставки.
    // Любое значение (как объекты, так и примитивы) могут быть использованы в качестве ключей.
    const itemsMap = new Map();

    const items = localStorage.getItem('tasks_list_board') && JSON.parse(localStorage.getItem('tasks_list_board'));
    if (items) {
        // Map.prototype.forEach(callbackFn[, thisArg])
        // Calls callbackFn once for each key-value pair present in the Map object, in insertion order.
        // If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.
        items.forEach(item => {
            // Map.prototype.set(key, value)
            // Sets the value for the key in the Map object. Returns the Map object.
            itemsMap.set(item.id, new Task(item));
        });
    }
    return itemsMap;
};

// Rewrite localStorage
TodoList.backup = (items) => {
    // Map.prototype.values()
    // Returns a new Iterator object that contains the values for each element in the Map object in insertion order.
    localStorage.setItem('tasks_list_board', JSON.stringify([...items.values()]));
};

// Find task by id
TodoList.find = (id) => {
    const todolists = TodoList.restore();
    // Map.prototype.get(key)
    // Returns the value associated to the key, or undefined if there is none.
    return todolists.get(id);
};
