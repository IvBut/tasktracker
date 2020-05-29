import Task from "./task";

export function initButtons() {
    const completeButtons = Array.from(document.querySelectorAll('.btn-actions'));
    completeButtons.forEach(btn => btn.addEventListener('click', Task.handleListActions))
}

export function openModal(data) {
    console.log(data);
    document.getElementById('openModalBtn').click();
    document.getElementById('submitBtn').innerText ='Edit';
    document.getElementById('inputTitle').value = data['taskTitle'];
    document.getElementById('inputText').value = data['taskText'];
    document.getElementById('inputColor').value = data['taskColor'];
    document.getElementById('inputId').value = data['id'];
    let priority = Array.from(document.querySelectorAll('.form-check-input'))
        .find(element => element.value === data['taskPriority']);
    priority.checked = true;
    console.log(priority)
}


export const transformDate = date => {
    return new Intl.DateTimeFormat('ru-Ru',{
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'

    }).format(new Date(date))
};
