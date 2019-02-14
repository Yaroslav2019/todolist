'use strict';

$(document).ready(
  () => {
    $.ajax({
      type: 'GET',
      url: 'data.json',
      dataType: 'json',
      contentType: 'application/json'
    }).done(function (data) {
      console.log('Ajax request was successfully completed !!!');

      const tasks = data[0].tasks;
      const statuses = data[0].status;
      const priorities = data[0].priority;

      const todoList = new TodoList({ statuses, priorities, tasks });
      const emptyStorage = TodoList.getStorageTasks();

      if (!emptyStorage || !emptyStorage.length) {
        TodoList.initialize(tasks);
        showTodoLists(todoList);
      } else {
        const taskStorage = TodoList.getStorageTasks();
        showTodoLists({ statuses, priorities, tasks: taskStorage });
      }

    }).fail(function () {
      alert('Ajax request was completed with error !!!');
    });
  }
);
