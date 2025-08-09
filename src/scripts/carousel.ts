export const createCarousel = () => {
  const carousels = document.querySelectorAll<HTMLDivElement>(".carousel");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("countries__content_paused");
        } else {
          entry.target.classList.add("countries__content_paused");
        }
      });
    },
    { threshold: 0.1 }
  );

  carousels.forEach((carousel) => {
    observer.observe(carousel);
    Array.from(carousel.children).forEach((carouselWrapper) => {
      const clonedContent = carouselWrapper.children[0].cloneNode(true);
      carouselWrapper.appendChild(clonedContent);
    });
  });
};

export const createTextCarousel = () => {
  const carousels = document.querySelectorAll<HTMLDivElement>(".text-carousel");

  const initCarousel = (carousel: HTMLDivElement) => {
    const inner = carousel.querySelector(".text-carousel__inner");
    if (!inner) return;

    const wrapper = inner.querySelector<HTMLDivElement>(
      ".text-carousel__wrapper"
    );
    if (!wrapper) return;

    const clone = wrapper.cloneNode(true);
    inner.appendChild(clone);

    wrapper.style.width = `${carousel.offsetWidth}px`;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const inner = entry.target.querySelector(".text-carousel__inner");
        if (!inner) return;

        if (entry.isIntersecting)
          inner.classList.remove("text-carousel__inner_paused");
        else inner.classList.add("text-carousel__inner_paused");
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  carousels.forEach((carousel) => {
    initCarousel(carousel);
    observer.observe(carousel);
  });

  return () => observer.disconnect();
};
