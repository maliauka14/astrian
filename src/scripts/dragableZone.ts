export const dragableZone = () => {
  const slider = document.querySelector<HTMLDivElement>(".partners__content");
  if (!slider) {
    throw new Error("Element .draggable-scroll not found");
  }

  let isDown = false;
  let startX: number;
  let scrollStart: number;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollStart = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1;
    slider.scrollLeft = scrollStart - walk;
  });
};
