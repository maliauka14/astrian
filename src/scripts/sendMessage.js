const messages = {
  name: 'Please fill your name',
  email: 'Please fill your email',
  message: 'Please fill message',
  wrongEmail: 'Invalid Email address'
}

const submitForm = (event) => {
  event.preventDefault();

  const form = event.target;
  const invalidFields = [];

  const inputs = form.querySelectorAll('[required]');
  inputs.forEach(input => {
    input.classList.remove('contact__form-input_error');
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.className === 'contact__form-error-message')
      errorElement.remove();

    if (!input.checkValidity()) {
      invalidFields.push(input);
      input.classList.add('contact__form-input_error');

      const errorElement = document.createElement('span');
      errorElement.className = 'contact__form-error-message';

      if (input.validity.valueMissing) {
        errorElement.textContent = messages[input.name];
      } else if (input.validity.typeMismatch && input.type === 'email') {
        errorElement.textContent = messages.wrongEmail;
      }
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
  });

  if (invalidFields.length > 0) {
    console.log('Невалидные поля:', invalidFields);
    invalidFields[0].focus();
  } else {
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log('Форма успешно отправлена:', formDataObject);
    form.reset();

    const token = "7033492975:AAHN9ObTm47pDQvd6z8dN517YgFhYBFq3YQ";
    const chatId = "787697525";
    const text = JSON.stringify(formDataObject);

    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
      .then(response => alert("Успешно отправлено!"))
      .catch(error => alert("Ошибка: " + error));

    return
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact__form')
  form.addEventListener('submit', submitForm)
})

