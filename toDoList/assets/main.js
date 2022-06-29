const inputText = document.querySelector('#inputText');
const buttonAdd = document.querySelector('#buttonAdd');
const toDoList = document.querySelector('#toDoList');


buttonAdd.addEventListener('click', oneMoreTask);
toDoList.addEventListener('click', removeItem);


function oneMoreTask (event) {
    event.preventDefault();
    if (inputText.value === '') {
        alert('Type something and then press de add button')
    } else {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        toDoList.appendChild(todoDiv)
        const todoLi = document.createElement('li');
        todoLi.classList.add('todo-list');
        todoLi.innerText = inputText.value;
        inputText.value = ''
        inputText.focus();
        todoDiv.appendChild(todoLi);
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i></i>'
        removeButton.classList.add('trash-button');
        todoDiv.appendChild(removeButton);
    }
    
}

function removeItem (e) {
    const item = e.target;
    if (item.classList[0] === 'trash-button') {
        const todo = item.parentElement;
        todo.remove()
    }
}