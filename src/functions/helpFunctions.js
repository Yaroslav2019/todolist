'use strict';

// Define class for status block
const getClassName = (status) => {
  const arrStatus = ['alert alert-info', 'alert alert-warning', 'alert alert-success'];
  return arrStatus[status - 1];
};

// Define priority value to show into task block
const getPriorityName = (priority) => {
  const arrPriority = ['Low', 'Minor', 'Major', 'High'];
  return arrPriority[priority - 1];
};

// Define parent block by choosen status
const getParentName = (list) => {
  const elements = [
    'open_list', // parentOpen
    'progress_list', // parentInprogress
    'done_list' // parentDone
  ];

  return document.getElementById(elements[list.status - 1]);
};

// Clear all parent blocks
const clearAllTasks = () => {
  $('#open_list').html('');
  $('#progress_list').html('');
  $('#done_list').html('');
};
