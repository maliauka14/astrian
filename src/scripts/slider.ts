export const addSlider = () => {
  const container = document.querySelector<HTMLDivElement>(
    ".partners__content-wrapper"
  );
  const slider = document.querySelector<HTMLDivElement>(".partners__content");
  let slides = document.querySelectorAll<HTMLDivElement>(".partners__feedback");
  const dotsContainer = document.querySelector(".partners__slider-dots");
  const prevButton = document.querySelector(
    ".partners__content-slide-left-arrow"
  );
  const nextButton = document.querySelector(
    ".partners__content-slide-right-arrow"
  );

  if (!container || !slider || slides.length === 0) return;

  // Сохраняем оригинальное количество слайдов
  const originalSlidesCount = slides.length;
  let currentIndex = 1;
  let touchStartX = 0;
  let touchEndX = 0;
  let dots: HTMLSpanElement[] = [];
  let slideWidth = 0;
  let gap = 24; // Значение gap между слайдами

  const calculateSlideWidth = () => {
    return slides[0].offsetWidth + gap;
  };

  const createDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    dots = [];

    for (let i = 0; i < originalSlidesCount; i++) {
      const dot = document.createElement("span");
      dot.className = "partners__slider-dot";
      if (i === currentIndex - 1) {
        dot.classList.add("partners__slider-dot_active");
      }

      dot.addEventListener("click", () => {
        goToSlide(i + 1);
      });

      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  };

  const setupInfiniteSlides = () => {
    const firstClone = slides[0].cloneNode(true) as HTMLDivElement;
    const lastClone = slides[slides.length - 1].cloneNode(
      true
    ) as HTMLDivElement;

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    // Обновляем список слайдов после клонирования
    slides = slider.querySelectorAll<HTMLDivElement>(".partners__feedback");
  };

  const updateDots = () => {
    const activeDotIndex =
      (currentIndex - 1 + originalSlidesCount) % originalSlidesCount;
    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "partners__slider-dot_active",
        index === activeDotIndex
      );
    });
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX - touchEndX;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const goToSlide = (index: number, animate = true) => {
    const isAtEdge = index === 0 || index === slides.length - 1;

    if (animate && !isAtEdge) {
      slider.style.transition = "transform 0.3s ease";
    } else {
      slider.style.transition = "none";
    }

    slideWidth = calculateSlideWidth();
    const totalWidth = slideWidth * slides.length;
    const containerWidth = container.offsetWidth;
    const maxOffset = totalWidth - containerWidth;

    let offset = -index * slideWidth + (containerWidth - slideWidth) / 2;

    if (-offset > maxOffset) {
      offset = -maxOffset;
    } else if (offset > 0) {
      offset = 0;
    }

    slider.style.transform = `translateX(${offset}px)`;
    currentIndex = index;

    if (index === 0) {
      goToSlide(originalSlidesCount);
    } else if (index === slides.length - 1) {
      goToSlide(1);
    }

    updateDots();
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  const addEventListeners = () => {
    prevButton?.addEventListener("click", prevSlide);
    nextButton?.addEventListener("click", nextSlide);

    slider.addEventListener("touchstart", handleTouchStart as EventListener);
    slider.addEventListener("touchmove", handleTouchMove as EventListener);
    slider.addEventListener("touchend", handleTouchEnd as EventListener);

    let resizeTimeout: number;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        slideWidth = calculateSlideWidth();
        goToSlide(currentIndex, false);
      }, 250) as unknown as number;
    });
  };

  // Инициализация
  setupInfiniteSlides();
  createDots();
  goToSlide(currentIndex, false);
  addEventListeners();
};
