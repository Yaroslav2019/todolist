'use strict';

const createElement = (elementName, attributes, content, listeners, parent) => {
  const element = document.createElement(elementName);

  for (let i = 0; i < attributes.length; i++) {
    element.setAttribute(attributes[i].key, attributes[i].value);
  }

  element.innerHTML = content;

  for (let i = 0; i < listeners.length; i++) {
    element.addEventListener(listeners[i].type, listeners[i].handler);
  }

  parent.appendChild(element);

  return element;
};
