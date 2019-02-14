'use strict';

const createTaskForm = document.forms.createTask;
const editTaskForm = document.forms.editTaskForm;

// Add task form
createTaskForm && createTaskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const values = Array.from(createTaskForm.elements)
    // Оставить только элементы с данными
    .filter(element => {
      const tagName = element.tagName;
      return (tagName === 'INPUT' || tagName === 'SELECT' || tagName !== 'BUTTON');
    })
    // Извлечь name
    .map(element => element.name)
    // Оставить уникальные name
    .filter((name, index, names) => index === names.indexOf(name))
    // Преобразовать массив [name, ...] в массив [[name, value], ...]
    .reduce((values, name) => {
      values.push([name, createTaskForm[name].value]);
      return values;
    }, []);

  const isValid = values
    .map(([name, value]) => validate(createTaskForm, name, value))
    .every(isValid => isValid);

  if (isValid) {
    const tasks = localStorage.getItem('tasks_list_board') && JSON.parse(localStorage.getItem('tasks_list_board'));
    const taskId = tasks && tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;

    // new Task({ id: 0, name: 'Task 0', status: 1, priority: 1 }),
    const newTask = new Task({ id: taskId, name: values[0][1], status: 1, priority: 1 });

    $('#preloader').toggle();

    newTask.save();

    const todoList = TodoList.getStorageTasks();
    showTodoLists(todoList);

    createTaskForm.reset();

    setTimeout(function () {
      $('#preloader').toggle();
    }, 1000);
  }
});

// Edit task form
editTaskForm && editTaskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const values = Array.from(editTaskForm.elements)
    // Оставить только элементы с данными
    .filter(element => {
      const tagName = element.tagName;
      return (tagName === 'INPUT' || tagName === 'SELECT' || tagName !== 'BUTTON');
    })
    // Извлечь name
    .map(element => element.name)
    // Оставить уникальные name
    .filter((name, index, names) => index === names.indexOf(name))
    // Преобразовать массив [name, ...] в массив [[name, value], ...]
    .reduce((values, name) => {
      values.push([name, editTaskForm[name].value]);
      return values;
    }, []);

  const isValid = values
    .map(([name, value]) => validate(editTaskForm, name, value))
    .every(isValid => isValid);

  if (isValid) {
    const newTask = new Task(
      values.reduce((tasks, [name, value]) => {
        tasks[name] = (name === 'name') ? value : +value;
        return tasks;
      }, {})
    );

    newTask.save();

    const todoList = TodoList.getStorageTasks();
    showTodoLists(todoList);

    $('#editTaskForm').modal('hide');
  }
});

$('#editTaskForm').on('hidden.bs.modal', function () {
  // After closing modal, hide all errors and reset all form velues
  hideAllErrors(editTaskForm);
  editTaskForm.reset();
});

$('#sendTasks').submit((e) => {
  e.preventDefault();

  const data = localStorage.getItem('tasks_list_board');

  if (data) {
    $.ajax({
      url: 'https://postman-echo.com/post',
      method: 'POST',
      timeout: 0,
      data: data
    })
      .done(() => {
        // Not working
        // $('#infoBlock').toggleClass('hidden').find('span.alert-text').html(`<b>JSON data</b>: ${data}`);
      })
      .fail(() => {
        // Not working
        // $('#infoBlock').removeClass('alert-info').addClass('alert-danger');
        // $('#infoBlock').toggleClass('hidden').find('span.alert-text').html(`<b>Не удалось отправить данные!!!</b>: ${data}`);
      })
      .always(() => {
        $('#infoBlock').toggleClass('hidden').find('span.alert-text').html(`<b>JSON data</b>: ${data}`);
      });
  } else {
    $('#infoBlock').addClass('hidden');
    alert('We have no data in storage !!!');
  }
});
