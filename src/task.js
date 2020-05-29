import {initButtons, openModal, transformDate} from "./utils";


export default class Task extends EventTarget{
    static addTask(task) {
        let todoList = getTodoListFromLS();
        todoList.push(task);
        saveTodoListToLS(todoList);
        Task.renderView();
    }

    static renderView() {
        let currentTasks = [];
        let completedTasks = [];

        getTodoListFromLS().forEach(task => {
            task.completed ? completedTasks.push(task) : currentTasks.push(task);
        });

        document.getElementById('unresolvedCount').textContent = String(currentTasks.length);
        document.getElementById('completedCount').textContent = String(completedTasks.length);

        const htmlCurrent = currentTasks.length > 0
            ? currentTasks.map(unresolvedView).join('')
            : `<li class="list-group-item d-flex w-100">
                    <div class="alert alert-success w-100 mb-0 font-weight-bold text-center" role="alert">
                            You don't have current tasks!
                    </div>
                </li>`;


        const htmlCompleted = completedTasks.length > 0
            ? completedTasks.map(completedView).join('')
            : `<li class="list-group-item d-flex w-100">
                    <div class="alert alert-danger w-100 mb-0 font-weight-bold text-center" role="alert">
                            You don't have completed tasks!
                    </div>
                </li>`;


        document.getElementById('completedTasks').innerHTML = htmlCompleted;
        document.getElementById('currentTasks').innerHTML = htmlCurrent;

        initButtons();

    }

    static handleListActions(event) {
        let id = event.target.dataset.taskId;
        let action = event.target.textContent;
        let list = getTodoListFromLS();
        let currentTaskIdx = list.findIndex(task => task.id === id);

        if (action === 'Complete') {
            list[currentTaskIdx].completed = true;
            saveTodoListToLS(list);
            Task.renderView();
        }
        else if (action === 'Delete') {
            list = list.filter(task => task.id !== id);
            saveTodoListToLS(list);
            Task.renderView();
        }
        else if (action === 'Edit') {
            openModal(list[currentTaskIdx]);
        }

    }

    static updateTask(task) {
        let list = getTodoListFromLS();
        let idx = list.findIndex(item => item.id === task.id);
        list[idx] = task;
        saveTodoListToLS(list);
        Task.renderView();
    }

    static makeSort(dir) {
        console.log(dir);
        let taskList = getTodoListFromLS();
        taskList.sort((a,b) => {
           let date1 = new Date(a.taskDate);
           let date2 = new Date(b.taskDate);
            return (Number(date1) -Number(date2)) * dir;
        });
        console.log(taskList);
        saveTodoListToLS(taskList);
        Task.renderView();
    }
}

function getTodoListFromLS(){
    return JSON.parse(localStorage.getItem('todoList') || '[]');
}

function saveTodoListToLS(todoList) {
    localStorage.setItem('todoList',JSON.stringify(todoList));
}

function unresolvedView(task) {
    let dateView = transformDate(task.taskDate);
    return `
                 <li class="list-group-item d-flex w-100 mb-2" style="background-color: ${task.taskColor}">
                    <div class="w-100 mr-2">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${task.taskTitle}</h5>
                            <div>
                                <small class="mr-2">${task.taskPriority} priority</small>
                                <small>${dateView}</small>
                            </div>

                        </div>
                        <p class="mb-1 w-100">${task.taskText}</p>
                    </div>
                    <div class="dropdown m-2 dropleft">
                        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                            <button type="button" class="btn btn-success w-100 btn-actions" data-task-id="${task.id}">Complete</button>
                            <button type="button" class="btn btn-info w-100 my-2 btn-actions" data-task-id="${task.id}">Edit</button>
                            <button type="button" class="btn btn-danger w-100 btn-actions" data-task-id="${task.id}">Delete</button>
                        </div>
                    </div>
                </li>
    `
}

function completedView(task) {
    let dateView = transformDate(task.taskDate);
    return `
                 <li class="list-group-item d-flex w-100 mb-2" style="background-color: ${task.taskColor}">
                    <div class="w-100 mr-2">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${task.taskTitle}</h5>
                            <div>
                                <small class="mr-2">${task.taskPriority} priority</small>
                                <small>${dateView}</small>
                            </div>

                        </div>
                        <p class="mb-1 w-100">${task.taskText}</p>
                    </div>
                    <div class="dropdown m-2 dropleft">
                        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                            <button type="button" class="btn btn-danger w-100 btn-actions" data-task-id="${task.id}">Delete</button>
                        </div>
                    </div>
                </li>
    `
}
