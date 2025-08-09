// export const createCaroucel = () => {
//   const content = document.querySelector<HTMLDivElement>(".countries__content");
//   const topContent = document.querySelector<HTMLDivElement>(
//     ".contries__top-content"
//   );
//   const bottomContent = document.querySelector<HTMLDivElement>(
//     ".contries__bottom-content"
//   );

//   if (!content) throw new Error("Element countries__content not found");
//   if (!topContent) throw new Error("Element countries__top-content not found");
//   if (!bottomContent)
//     throw new Error("Element countries__bottom-content not found");

//   const duplicateTopContent = Array.from(topContent.children).map((el) =>
//     el.cloneNode(true)
//   );
//   const duplicateBottomContent = Array.from(bottomContent.children).map((el) =>
//     el.cloneNode(true)
//   );

//   const moveElements = () => {
//     if (topContent.children.length > 0) {
//       const firstChild = topContent.children[0];
//       const rect = firstChild.getBoundingClientRect();
//       const contentRect = content.getBoundingClientRect();

//       // Если элемент полностью вышел за правую границу
//       if (rect.right < contentRect.left) {
//         // Перемещаем элемент в конец
//         const moved = topContent.removeChild(firstChild);
//         topContent.appendChild(moved);
//       }
//     }

//     // Для нижней строки (движение влево)
//     if (bottomContent.children.length > 0) {
//       const lastChild =
//         bottomContent.children[bottomContent.children.length - 1];
//       const rect = lastChild.getBoundingClientRect();
//       const contentRect = content.getBoundingClientRect();

//       // Если элемент полностью вышел за левую границу
//       if (rect.left > contentRect.right) {
//         // Перемещаем элемент в начало
//         const moved = bottomContent.removeChild(lastChild);
//         bottomContent.insertBefore(moved, bottomContent.firstChild);
//       }
//     }
//   };

//   let animationInterval: number | undefined;

//   const startAnimation = () => {
//     if (!animationInterval) {
//       animationInterval = setInterval(moveElements, 1000);
//     }
//   };

//   const stopAnimation = () => {
//     clearInterval(animationInterval);
//     animationInterval = undefined;
//   };

//   // Отслеживание видимости через Intersection Observer
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           content.classList.remove("countries__content_paused");
//           startAnimation();
//         } else {
//           content.classList.add("countries__content_paused");
//           stopAnimation();
//         }
//       });
//     },
//     { threshold: 0.1 }
//   );

//   observer.observe(content);

//   window.addEventListener("beforeunload", () => {
//     stopAnimation();
//     observer.disconnect();
//   });
// };

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
