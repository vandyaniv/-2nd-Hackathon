const login_form = document.getElementById('login_form');
if (login_form) {
  login_form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const statusMessage = document.getElementById('loginStatusMessage');
    statusMessage.textContent = '';

    const form_data = {
      email: document.getElementById('login_form').value.trim(),
      password: document.getElementById('login_password'),
    };

    try {
      //
      const response = await fetch('user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data),
      });
      //
      const result = await response.json();
      if (response.ok) {
        statusMessage.style.colot = 'green';
        statusMessage.textContent = result.message;
        login_form.reset();
        //
      } else {
        //
        statusMessage.style.color = 'red';
        statusMessage.textContent = result.message || 'Error by Connexion';
      }
    } catch (error) {
      //
      console.error('ERROR :', error);
      statusMessage.style.color = 'red';
      statusMessage.style.fontWeight = 'bold';
      statusMessage.textContent = 'Failed Connexion.';
    }
  });
}
//elk@gmail.com
