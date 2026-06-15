
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

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome === '' || email === '' || mensagem === '') {
      alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    const actionUrl = contactForm.getAttribute('action');

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    fetch(actionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Nome: nome,
        Email: email,
        Mensagem: mensagem
      })
    })
    .then(response => {
      if (response.ok) {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset(); // Limpa os campos do formulário
      } else {
        alert('Houve um erro ao tentar enviar a mensagem. Tente novamente mais tarde.');
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
      alert('Erro de conexão. Verifique sua internet.');
    })
    .finally(() => {
      // Restaura o botão ao estado original
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    });
  });
}