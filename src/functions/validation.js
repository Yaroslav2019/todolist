'use strict';

const regExps = {
  name: /.{2,}/,
  status: /.+/,
  priority: /.+/,
  id: /.+/
};

// Validate value by the name=key with regExps
const validate = (form, key, value) => {
  const isValid = Boolean(value && regExps[key].test(value));

  toggleErrorMessage(form, key, !isValid);

  return isValid;
};

// Show error for form element
const toggleErrorMessage = (form, key, hasErrors) => {
  const elements = form.querySelectorAll(`[name="${key}"]`);

  elements.forEach(element => {
    let parent, sibling;

    if (element.type === 'radio') {
      parent = element.parentElement.parentElement.parentElement;
      sibling = element.parentElement.parentElement.parentElement.lastElementChild;
    } else {
      parent = element.parentElement;
      sibling = element.nextElementSibling;
    }

    if (hasErrors) {
      parent && parent.classList.add('has-error');
      sibling && sibling.classList.remove('hidden');
    } else {
      parent && parent.classList.remove('has-error');
      sibling && sibling.classList.add('hidden');
    }
  });
};

// Move all errors
const hideAllErrors = (form) => {
  for (let i = 0; i < form.elements.length - 1; i++) {
    const element = form.elements[i];
    const parent = element.parentElement;
    const sibling = element.nextElementSibling;

    if (element.localName === 'button') {
      continue;
    }

    parent && parent.classList.remove('has-error');
    sibling && sibling.classList.add('hidden');
  }
};
