window.onload = function(){
    let changeThemeButton = document.getElementById('changeTheme'),
        textarea = document.getElementById('textarea'),
        input = document.getElementById('input'),
        select = document.getElementById('select'),
        theme = (localStorage.getItem('theme') ?? 'light');
    input.value= (localStorage.getItem('input') ?? '');
    textarea.value= (localStorage.getItem('textarea') ?? '');
    if (theme == 'dark'){
        changeThemeButton.innerHTML='to Light theme';
        document.getElementsByTagName('body')[0].classList.remove('body_light');
        document.getElementsByTagName('body')[0].classList.add('body_dark');
        document.getElementsByTagName('header')[0].classList.remove('header_light');
        document.getElementsByTagName('header')[0].classList.add('header_dark');
        Array.from(document.getElementsByTagName('button')).forEach(element => {
            element.classList.remove('button_light');
            element.classList.add('button_dark');
        });
        textarea.classList.add('dark');
        input.classList.add('dark');
        select.classList.add('dark');
    }

    input.oninput = function(){
        localStorage.setItem('input', input.value);
    }
    select.onchange = function(){
        localStorage.setItem('select', select.value);
    }
    textarea.oninput = function(){
        localStorage.setItem('textarea', textarea.value);
    }
    changeThemeButton.onclick = function(){
        if (changeThemeButton.classList[0]=='button_light'){
            changeThemeButton.innerHTML='to Light theme';
            document.getElementsByTagName('body')[0].classList.remove('body_light');
            document.getElementsByTagName('body')[0].classList.add('body_dark');
            document.getElementsByTagName('header')[0].classList.remove('header_light');
            document.getElementsByTagName('header')[0].classList.add('header_dark');
            Array.from(document.getElementsByTagName('button')).forEach(element => {
                element.classList.remove('button_light');
                element.classList.add('button_dark');
            });
            textarea.classList.add('dark');
            input.classList.add('dark');
            select.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            changeThemeButton.innerHTML='to Dark theme';
            document.getElementsByTagName('body')[0].classList.remove('body_dark');
            document.getElementsByTagName('body')[0].classList.add('body_light');
            document.getElementsByTagName('header')[0].classList.remove('header_dark');
            document.getElementsByTagName('header')[0].classList.add('header_light');
            Array.from(document.getElementsByTagName('button')).forEach(element => {
                element.classList.remove('button_dark');
                element.classList.add('button_light');
            });
            textarea.classList.remove('dark');
            input.classList.remove('dark');
            select.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }
}
function clearing(){
    localStorage.setItem('input', '');
    localStorage.setItem('textarea', '');
}