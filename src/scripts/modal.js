document.addEventListener('DOMContentLoaded', function () {
  const openModalButtons = document.querySelectorAll('[aria-controls="modal"]');
  const closeModalBtn = document.querySelector('.modal__close-button');
  const modalOverlay = document.getElementById('modal');

  const contactForm = document.querySelector('.contact').cloneNode(true)
  const modalContent = document.querySelector('.modal__content')

  modalContent.innerHTML = '';
  modalContent.appendChild(contactForm);

  openModalButtons.forEach(openButton => {
    openButton.addEventListener('click', function () {
      modalOverlay.classList.add('modal_active');
      document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
    });
  })

  closeModalBtn?.addEventListener('click', function () {
    modalOverlay.classList.remove('modal_active');
    document.body.style.overflow = ''; // Восстанавливаем прокрутку
  });


  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('modal_active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (event) => {
    console.log(event.key);
    if (event.key === 'Escape') {
      modalOverlay.classList.remove('modal_active');
      document.body.style.overflow = '';
    }
  });
});