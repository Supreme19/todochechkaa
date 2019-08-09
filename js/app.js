const todoForm = document.querySelector('#todo-form');
const addInput = document.querySelector('#add-input');
const todoList = document.querySelector('#todo-list');
const todoItems = document.querySelectorAll('.todo-item');

function main() {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
}


function createTodoItem(title) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');


    const label = document.createElement('label');
    label.innerText = title;
    label.classList.add('title');


    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.classList.add('textfield');

    const editButton = document.createElement('button');
    editButton.innerText = 'Изменить';
    editButton.classList.add('edit');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить';
    deleteButton.classList.add('delete');

    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');


    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    addInput.value = '';

    bindEvents(listItem);
    return listItem;
}

function addTodoItem(evt) {
    evt.preventDefault(); //Cancel the submit event and don't reload the page
    if (!addInput.value) {
        return alert(`Please enter the name of task.`);
    }

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
}

function toggleTodoItem() {
    const listItem = this.parentNode;
    const checkbox = listItem.querySelector('.checkbox');
    checkbox.checked = !checkbox.checked;
    listItem.classList.toggle('completed');
}

function editTodoButton() {
    const listItem = this.parentNode;
    const title  = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');
    if(isEditing) {
        title.innerHTML = editInput.value;
        this.innerText = 'Изменить';
    } else {
        editInput.addEventListener('keydown', function(event) {
            if (event.code === 'Enter') {
                title.innerHTML = editInput.value;
                this.parentNode.querySelector('.edit').innerText = 'Изменить';
                listItem.classList.remove('editing');
            }
        });
        editInput.value = title.innerHTML;
        this.innerText = 'Сохранить';
    }
    listItem.classList.toggle('editing');
}

function deleteTodoButton() {
    const listItem = this.parentNode;
    listItem.remove();
}

function bindEvents(todoItem) {
    const title = todoItem.querySelector('.title');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    title.addEventListener('click', toggleTodoItem);
    editButton.addEventListener('click', editTodoButton);
    deleteButton.addEventListener('click', deleteTodoButton);
}
main();


