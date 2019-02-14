'use strict';

// Отрисоввываем список задач
const showTodoLists = (todoList) => {
  const parentList = document.getElementById('todoList');
  const parentOpen = document.getElementById('open_list');
  const parentInprogress = document.getElementById('progress_list');
  const parentDone = document.getElementById('done_list');

  // Clear all tasks
  clearAllTasks();

  // Count of tasks
  document.getElementById('bageOpen').innerText = TodoList.tasksCount(1);
  document.getElementById('bageProgress').innerText = TodoList.tasksCount(2);
  document.getElementById('bageDone').innerText = TodoList.tasksCount(3);

  const tasks = todoList.hasOwnProperty('tasks') ? todoList.tasks : todoList;
  // Сортируем задачи по приоритету
  tasks.sort((a, b) => b.priority - a.priority);

  for (let task of tasks) {
    // Task container
    const attributes = [
      {
        key: 'class',
        value: getClassName(task.status)
      },
      {
        key: 'role',
        value: 'alert'
      }
    ];
    const attributesSpan = [
      {
        key: 'class',
        value: 'priority badge'
      },
      {
        key: 'title',
        value: 'Priority of task'
      }
    ];
    const attributesTextSpan = [
      {
        key: 'class',
        value: 'task-content'
      }
    ];
    const attributesBtn = [
      {
        key: 'class',
        value: 'list_buttons'
      }
    ];
    const divParent = createElement('div', attributes, '', [], getParentName(task));
    const spanBage = createElement('span', attributesSpan, getPriorityName(task.priority), [], divParent);
    const tdFullName = createElement('span', attributesTextSpan, task.name, [], divParent);
    const tdButtons = createElement('div', attributesBtn, '', [], divParent);

    // Edit button
    const editIcon = '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>';
    const editBtnAttributes = [
      {
        key: 'title',
        value: 'Edit task'
      },
      {
        key: 'class',
        value: 'btn btn-primary btn-sm'
      },
      {
        key: 'data-toggle',
        value: 'modal'
      },
      {
        key: 'data-target',
        value: '#editTaskForm'
      }
    ];
    const editBtnListeners = [
      {
        type: 'click',
        handler: editBtnClickHandler.bind(null, task.id)
      }
    ];
    const editBtn = createElement('button', editBtnAttributes, editIcon, editBtnListeners, tdButtons);

    // Remove button
    const deleteIcon = '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>';
    const removeBtnAttributes = [
      {
        key: 'title',
        value: 'Delete task'
      },
      {
        key: 'class',
        value: 'btn btn-danger btn-sm'
      }
    ];
    const removeBtnListeners = [
      {
        type: 'click',
        handler: removeBtnClickHandler.bind(task)
      }
    ];
    const removeBtn = createElement('button', removeBtnAttributes, deleteIcon, removeBtnListeners, tdButtons);
  }

  // Priorities
  const prioritySelectContainer = document.getElementById('prioritySelect');
  const hasPropertyPriories = todoList.hasOwnProperty('priorities');
  const priorities = hasPropertyPriories ? todoList.priorities : null;

  if (hasPropertyPriories && priorities) {
    for (let priority of priorities) {
      const optionStatusAttributes = [
        {
          key: 'class',
          value: 'control-label'
        },
        {
          key: 'value',
          value: priority.id
        },
        {
          key: 'name',
          value: priority.name
        }
      ];
      createElement('option', optionStatusAttributes, priority.name, [], prioritySelectContainer);
    }
  }

  // Statuses
  const statusSelectContainer = document.getElementById('statusSelect');
  const hasPropertyStatus = todoList.hasOwnProperty('statuses');
  const statuses = hasPropertyStatus ? todoList.statuses : null;

  if (hasPropertyStatus && statuses) {
    for (let status of statuses) {
      const optionPriorityAttributes = [
        {
          key: 'class',
          value: 'control-label'
        },
        {
          key: 'value',
          value: status.id
        },
        {
          key: 'name',
          value: status.name
        }
      ];
      createElement('option', optionPriorityAttributes, status.name, [], statusSelectContainer);
    }
  }
};

const editBtnClickHandler = (id) => {
  console.log('edit button clicked');

  const targetlist = TodoList.find(id);

  const form = document.forms.editTaskForm;
  form.id.value = +id;
  form.name.value = targetlist.name;
  form.status.value = targetlist.status;
  form.priority.value = targetlist.priority;

  hideAllErrors(form);
};

function removeBtnClickHandler() {
  if (confirm('Are you sure than you want to delete this list?')) {
    $('#preloader').toggle();

    const rmTask = new Task(this);
    rmTask.remove();

    const todoList = TodoList.getStorageTasks();
    showTodoLists(todoList);

    setTimeout(() => {
      $('#preloader').toggle();
    }, 1000);
  }
}
