import Splide from "@splidejs/splide";

export const addSlider = () => {
  const prevButton = document.querySelector(
    ".partners__content-slide-left-arrow"
  );
  const nextButton = document.querySelector(
    ".partners__content-slide-right-arrow"
  );

  const splide = new Splide(".splide", {
    type: "loop",
    perPage: 1,
    padding: "33%",
    arrows: false,
    gap: "24px",
    focus: "center",
    trimSpace: false,
    breakpoints: {
      860: {
        padding: "25%",
        gap: "16px",
      },
      680: {
        padding: "20%",
      },
      550: {
        padding: "15%",
        gap: "12px",
      },
      400: {
        padding: "0",
        gap: "4px",
      },
    },
  });

  prevButton?.addEventListener("click", () => splide.go("<"));
  nextButton?.addEventListener("click", () => splide.go(">"));

  splide.mount();
};
