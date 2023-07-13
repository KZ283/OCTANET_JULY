document.addEventListener('DOMContentLoaded', function () {
  changeTextColor();

  function changeTextColor() {
    const text = document.querySelector('.flicker-animation');
    const interval = setInterval(function () {
      const randomColor = getRandomColor();
      text.style.color = randomColor;
    }, 500);
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const todoForm = document.querySelector('.todo-form');
  const highPriorityList = document.querySelector('.high-priority-list');
  const mediumPriorityList = document.querySelector('.medium-priority-list');
  const lowPriorityList = document.querySelector('.low-priority-list');

  todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const todoInput = this.querySelector('.todo-input');
    const todoDateInput = this.querySelector('.todo-date-input');
    const todoPrioritySelect = this.querySelector('.todo-priority-select');
    const todoLabelInput = this.querySelector('.todo-label-input');

    const todoText = todoInput.value.trim();
    const todoDate = todoDateInput.value;
    const todoPriority = todoPrioritySelect.value;
    const todoLabel = todoLabelInput.value.trim();

    if (todoText !== '') {
      const listItem = document.createElement('li');
      listItem.classList.add('todo-item');
      listItem.innerHTML = `
          <input type="checkbox" class="todo-item-checkbox">
          <label class="todo-item-label">
            <span class="task-title">${todoText}</span><br>
            <span class="task-details">
              Date: ${todoDate} | Priority: ${todoPriority} | Label: ${todoLabel}
            </span>
          </label>
          <span class="todo-item-delete">&times;</span>
        `;

      switch (todoPriority) {
        case '1':
          highPriorityList.appendChild(listItem);
          break;
        case '2':
          mediumPriorityList.appendChild(listItem);
          break;
        case '3':
          lowPriorityList.appendChild(listItem);
          break;
        default:
          break;
      }

      todoInput.value = '';
      todoDateInput.value = '';
      todoPrioritySelect.value = '';
      todoLabelInput.value = '';
    }
  });

  function removeItem(listItem) {
    listItem.classList.add('fadeOut');
    listItem.addEventListener('animationend', function () {
      listItem.remove();
    });
  }

  function handleItemClick(event) {
    const target = event.target;
    const listItem = target.closest('.todo-item');

    if (target.classList.contains('todo-item-checkbox') || target.classList.contains('todo-item-delete')) {
      removeItem(listItem);
    }
  }

  highPriorityList.addEventListener('click', handleItemClick);
  mediumPriorityList.addEventListener('click', handleItemClick);
  lowPriorityList.addEventListener('click', handleItemClick);
});
