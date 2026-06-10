
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('.icon');

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
  body.classList.add('light-mode');
  icon.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  if (body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    icon.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'dark');
    icon.textContent = '🌙';
  }
});