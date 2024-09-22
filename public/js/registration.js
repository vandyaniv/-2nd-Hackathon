const registration_Form = document.getElementById('registration_form');

if (registration_Form) {
  registration_Form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const statusMessage = document.getElementById('registrationStatusMessage');
    if (!statusMessage) {
      //
      console.log('element with ID not found');
      return;
    }
    statusMessage.textContent = ''; // page will stock on without that remind

    const form_data = {
      first_name: document.getElementById('first_name').value.trim(),

      last_name: document.getElementById('last_name').value.trim(),

      email: document.getElementById('email').value.trim(), // vallue - trim get value
      // without space

      password: document.getElementById('password').value.trim(),
    };

    try {
      const response = await fetch('/user/register', {
        //
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data),
      });

      const result = await response.json();
      if (response.ok) {
        //
        statusMessage.style.color = 'green';
        statusMessage.textContent = result.message;
        registration_Form.reset();
      } else {
        //
        statusMessage.style.color = 'red';
        statusMessage.textContent = result.message || 'Error by registration';
      }
    } catch (error) {
      //
      console.error('ERROR :', error);
      statusMessage.style.color = 'red';
      statusMessage.style.fontWeight = 'bold';
      statusMessage.textContent = 'Failed registration.';
    }
  });
}
//elkae@gmail.com
