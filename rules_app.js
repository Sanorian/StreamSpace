window.onload = function(){
    let changeThemeButton = document.getElementById('changeTheme'),
    theme = (localStorage.getItem('theme') ?? 'light');
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
        document.getElementsByTagName('h2')[0].classList.add('li_dark');
        document.getElementsByTagName('li')[0].classList.add('li_dark');
        document.getElementsByTagName('li')[1].classList.add('li_dark');
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
            document.getElementsByTagName('h2')[0].classList.add('li_dark');
            document.getElementsByTagName('li')[0].classList.add('li_dark');
            document.getElementsByTagName('li')[1].classList.add('li_dark');
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
            document.getElementsByTagName('h2')[0].classList.remove('li_dark');
            document.getElementsByTagName('li')[0].classList.remove('li_dark');
            document.getElementsByTagName('li')[1].classList.remove('li_dark');
            localStorage.setItem('theme', 'light');
        }
    }
}