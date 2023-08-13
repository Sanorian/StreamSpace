window.onload = function () {
  let changeThemeButton = document.getElementById('changeTheme');
  theme = (localStorage.getItem('theme') ?? 'light');
  if (theme=='dark'){
    changeThemeButton.innerHTML='to Light theme';
    document.getElementsByTagName('body')[0].classList.remove('body_light');
    document.getElementsByTagName('body')[0].classList.add('body_dark');
    document.getElementsByTagName('header')[0].classList.remove('header_light');
    document.getElementsByTagName('header')[0].classList.add('header_dark');
    Array.from(document.getElementsByClassName('post_light')).forEach(element => {
      element.classList.remove('post_light');
      element.classList.add('post_dark');
    });
    Array.from(document.getElementsByTagName('button')).forEach(element => {
      element.classList.remove('button_light');
      element.classList.add('button_dark');
    });
    localStorage.setItem('theme', 'dark');
  }
  changeThemeButton.onclick = function(){
    if (changeThemeButton.classList[0]=='button_light'){
      changeThemeButton.innerHTML='to Light theme';
      document.getElementsByTagName('body')[0].classList.remove('body_light');
      document.getElementsByTagName('body')[0].classList.add('body_dark');
      document.getElementsByTagName('header')[0].classList.remove('header_light');
      document.getElementsByTagName('header')[0].classList.add('header_dark');
      Array.from(document.getElementsByClassName('post_light')).forEach(element => {
        element.classList.remove('post_light');
        element.classList.add('post_dark');
      });
      Array.from(document.getElementsByTagName('button')).forEach(element => {
        element.classList.remove('button_light');
        element.classList.add('button_dark');
      });
      localStorage.setItem('theme', 'dark');
    } else {
      changeThemeButton.innerHTML='to Dark theme';
      document.getElementsByTagName('body')[0].classList.remove('body_dark');
      document.getElementsByTagName('body')[0].classList.add('body_light');
      document.getElementsByTagName('header')[0].classList.remove('header_dark');
      document.getElementsByTagName('header')[0].classList.add('header_light');
      Array.from(document.getElementsByClassName('post_dark')).forEach(element => {
        element.classList.remove('post_dark');
        element.classList.add('post_light');
      });
      Array.from(document.getElementsByTagName('button')).forEach(element => {
        element.classList.remove('button_dark');
        element.classList.add('button_light');
      });
      localStorage.setItem('theme', 'light');
    }

}
};