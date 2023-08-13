window.onload = function(){
    let changeThemeButton = document.getElementById('changeTheme'),
        sendButton = document.getElementById('sendButton'),
        textarea = document.getElementById('textarea'),
        input = document.getElementById('input'),
        select = document.getElementById('select');
    input.value= (localStorage.getItem('input') ?? '');
    textarea.value= (localStorage.getItem('textarea') ?? '');


    input.oninput = function(){
        localStorage.setItem('input', input.value);
    }
    select.onchange = function(){
        localStorage.setItem('select', select.value);
    }
    textarea.oninput = function(){
        localStorage.setItem('textarea', textarea.value);
    }
}
function clearing(){
    localStorage.setItem('input', '');
    localStorage.setItem('textarea', '');
}