import  './css/custom.css';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { v4 as uuidv4 } from 'uuid';
import Task from "./task";

const inputTittle = document.getElementById('inputTitle');
const inputText = document.getElementById('inputText');
const inputColor = document.getElementById('inputColor');

const form = document.getElementById('mainForm');
const inputPriority = Array.from(form.querySelectorAll('.form-check-input'));
const submitBtn = document.getElementById('submitBtn');
const inputHidden = document.getElementById('inputId');

const appColor = document.getElementById('appColor');

const closeBtns = [...document.querySelectorAll('.closeBtns')];
closeBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        submitBtn.innerText = 'Add task';
        clearForm();
    })
});


const sortBtns = [...document.querySelectorAll('.sortBtn')];
sortBtns.forEach(btn => {
   btn.addEventListener('click', (e)=>{
       let dir = e.currentTarget.dataset.direction === 'ASC' ? 1 : -1;
       Task.makeSort(dir);

       let up = document.querySelector('.fa-sort-numeric-up-alt');
       let down = document.querySelector('.fa-sort-numeric-down-alt');
       if (dir === 1) {
           up.style.color = 'red';
           down.style.color = 'white';
       } else {
           up.style.color = 'white';
           down.style.color = 'red';
       }
   });
});

form.addEventListener('submit', handleFormSubmit);


function handleFormSubmit(event) {
    event.preventDefault();
    let task = {
        taskTitle : inputTittle.value,
        taskText: inputText.value,
        taskPriority: inputPriority.find(inp => inp.checked === true).value,
        taskDate: new Date(),
        taskColor: inputColor.value,
        completed: false
    };

    if (submitBtn.innerText === 'Edit'){
        task.id = inputHidden.value;
        Task.updateTask(task);
    } else {
        task.id = uuidv4();
        Task.addTask(task);
    }

    clearForm();
    closeModal();

}

function clearForm() {
    inputText.value = '';
    inputTittle.value = '';
    inputPriority.forEach(el => el.checked = false);
    inputHidden.value = '';
    inputColor.value = '#FFFFFF';
}

function closeModal(){
    closeBtns[0].click();
}

appColor.addEventListener('change',()=>{
   localStorage.setItem('appColor', appColor.value);
   document.body.style.backgroundColor = appColor.value;
});

document.addEventListener('DOMContentLoaded',()=>{
   Task.renderView();
    if (localStorage.getItem('appColor')) {
        document.body.style.backgroundColor = localStorage.getItem('appColor');
    }
});

