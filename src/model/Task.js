'use strict';

function Task({ id, name, status, priority }) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.priority = priority;
}

Task.prototype.save = function () {
    const todolists = TodoList.restore();
    // Map.prototype.set(key, value)
    // Sets the value for the key in the Map object. Returns the Map object.
    todolists.set(this.id, this);
    TodoList.backup([...todolists.values()]);
};

Task.prototype.remove = function () {
    const todolists = TodoList.restore();
    // Map.prototype.delete(key)
    // Returns true if an element in the Map object existed and has been removed, or false if the element does not exist.
    // Map.prototype.has(key) will return false afterwards.
    todolists.delete(this.id);
    TodoList.backup(todolists);
};