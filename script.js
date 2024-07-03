const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

// Load tasks from local storage
if (localStorage.tasks) {
    tasks = JSON.parse(localStorage.tasks);
    renderTasks();
}

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        tasks.push({ text: task, completed: false });
        localStorage.tasks = JSON.stringify(tasks);
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <li>
                <span>${task.text}</span>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });

    // Add event listeners to edit and delete buttons
    const editBtns = document.querySelectorAll('.edit-btn');
    const deleteBtns = document.querySelectorAll('.delete-btn');

    editBtns.forEach((btn) => {
        btn.addEventListener('click', editTask);
    });

    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', deleteTask);
    });
}

function editTask(event) {
    const index = event.target.dataset.index;
    const task = tasks[index];
    taskInput.value = task.text;
    taskInput.focus();
}

function deleteTask(event) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    localStorage.tasks = JSON.stringify(tasks);
    renderTasks();
}