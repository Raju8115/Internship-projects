document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            let style= task.completed ? 'completed' : '';
            li.innerHTML = `
            <input class="inputCls" type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span class=${style}>${task.description}</span>
            <div class="buttonDiv">
            <button class="edit-button" onclick="editTask(${index})">Edit</button>
            <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            </div>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskDescription = taskInput.value.trim();
        if (taskDescription === '') {
            alert('Task cannot be empty!');
            return;
        }
        tasks.push({ description: taskDescription, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }

    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    window.editTask = function(index) {
        const newDescription = prompt('Edit task:', tasks[index].description);
        if (newDescription !== null) {
            tasks[index].description = newDescription.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);
    renderTasks();
});
