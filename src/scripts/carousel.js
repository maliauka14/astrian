document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel__wrapper');
  const container = document.querySelector('.carousel');

  // Клонируем элементы для бесконечного эффекта
  const items = document.querySelectorAll('.carousel-item');
  const clones = [];

  items.forEach(item => {
    const clone = item.cloneNode(true);
    clones.push(clone);
    track.appendChild(clone);
  });

  // Настройка Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        track.classList.remove('paused');
      } else {
        track.classList.add('paused');
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(container);

  // Перезапуск анимации для плавности
  setInterval(() => {
    const first = track.firstElementChild;
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    setTimeout(() => {
      track.style.transition = '';
    }, 50);

    track.appendChild(first.cloneNode(true));
    first.remove();
  }, 10000); // Интервал = половина времени анимации
});