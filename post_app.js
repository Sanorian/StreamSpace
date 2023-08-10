let sendButtton = document.getElementById('sendButton'),
textarea = document.getElementById('textarea'),
input = document.getElementById('input'),
select = document.getElementById('select');

input.oninput = function(){
    localStorage.setItem('input', input.value);
}
select.oninput = function(){
    localStorage.setItem('select', select.value);
}
textarea.oninput = function(){
    localStorage.setItem('textarea', textarea.value);
}
textarea.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        textarea.value+='<br>';
    }
  });