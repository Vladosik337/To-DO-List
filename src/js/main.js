import '../scss/style.scss';

let ToDo_input = document.querySelector('.todo__input');
let ToDO_button = document.querySelector('.todo__button');

let data = localStorage.getItem('task');
let tasks = [];

if (data) {
    tasks = JSON.parse(data);
    tasks = tasks.filter(task => task !== null);
    localStorage.setItem('task', JSON.stringify(tasks));
    tasks.forEach(task => createTaskList(task));
}

function createTaskList(obj) {
    let liTag = document.createElement('li');
    liTag.className = 'tasks__item';

    let labelTag = document.createElement('label');
    labelTag.className = 'tasks__checkbox-label';
    labelTag.htmlFor = 'checkbox__item';

    let checkBoxTag = document.createElement('input');
    checkBoxTag.className = 'tasks__checkbox';
    checkBoxTag.id = 'checkbox__item';
    checkBoxTag.type = 'checkbox';

    let pTag = document.createElement('p');
    pTag.className = 'tasks__text';
    pTag.innerText = obj.task;

    let buttonTagDel = document.createElement('button');
    buttonTagDel.className = 'tasks__button';
    buttonTagDel.type = 'button';
    buttonTagDel.innerText = 'x';

    let buttonTagEdit = document.createElement('button');
    buttonTagEdit.className = 'tasks__button';
    buttonTagEdit.type = 'button';
    buttonTagEdit.innerText = 'edit';

    liTag.append(labelTag);
    labelTag.append(checkBoxTag);
    liTag.append(pTag);
    liTag.append(buttonTagEdit);
    liTag.append(buttonTagDel);
    document.querySelector('.tasks__list').prepend(liTag);

    buttonTagDel.addEventListener('click', () => {
        liTag.remove();
        tasks = tasks.filter(task => task.task !== obj.task);
        localStorage.setItem('task', JSON.stringify(tasks));
    });

    buttonTagEdit.addEventListener('click', () => {
        if (liTag.querySelector('textarea')) {
            let textareaTag = liTag.querySelector('textarea');
            let updatedText = textareaTag.value;
            textareaTag.replaceWith(pTag);

            pTag.innerText = updatedText;
            obj.task = updatedText;
            localStorage.setItem('task', JSON.stringify(tasks));
        } else {
            let text = pTag.innerText;
            pTag.replaceWith(document.createElement('textarea'));
            let textareaTag = liTag.querySelector('textarea');
            textareaTag.innerText = text;
        }
    });

    checkBoxTag.addEventListener('click', () => {
        liTag.classList.toggle('complited-background');
        pTag.classList.toggle('complited');
    });
}

ToDO_button.addEventListener('click', (e) => {
    e.preventDefault();

    let obj = {
        task: ToDo_input.value,
    };
    createTaskList(obj);
    tasks.unshift(obj);
    localStorage.setItem('task', JSON.stringify(tasks));
    ToDo_input.value = '';
});
