document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.text-carousel');

  carousels.forEach(carousel => {
    const wrapper = carousel.querySelector('.text-carousel__wrapper');
    const items = Array.from(wrapper.children);

    // Создаем клоны элементов для бесшовной анимации
    const cloneSet = items.map(item => item.cloneNode(true));
    cloneSet.forEach(clone => wrapper.appendChild(clone));

    let position = 0;
    let animationId = null;
    let lastTime = null;
    const speed = 40; // px/s

    // Рассчитываем ширину оригинального набора элементов
    function getOriginalWidth() {
      return items.reduce((sum, item) => sum + item.offsetWidth, 0);
    }

    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      const originalWidth = getOriginalWidth();
      position -= speed * deltaTime;

      // Сброс позиции при достижении конца
      if (Math.abs(position) >= originalWidth) {
        position = 0;
      }

      wrapper.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    }

    // Отслеживание видимости элемента
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationId) {
            lastTime = null;
            animationId = requestAnimationFrame(animate);
          }
        } else {
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      });
    }, { threshold: 0.1 });

    observer.observe(carousel);

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
      if (Math.abs(position) >= getOriginalWidth()) {
        position = 0;
      }
    });
  });
});
