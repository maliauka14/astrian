export const addModal = () => {
  const openModalButtons = document.querySelectorAll('[aria-controls="modal"]');
  const closeModalBtn = document.querySelector(".modal__close-button");
  const modalOverlay = document.getElementById("modal");
  const contactContent = document.querySelector(".contact");
  const modalContent = document.querySelector(".modal__content");
  const animatedBlocks = document.querySelectorAll(".animate");
  const html = document.documentElement;
  const body = document.body;

  let top = 0;
  if (!modalOverlay) throw new Error("Element modal not found");
  if (!contactContent) throw new Error("Element contact not found");
  if (!modalContent) throw new Error("Element modal__content not found");

  const contactForm = contactContent.cloneNode(true);
  modalContent.innerHTML = "";
  modalContent.appendChild(contactForm);

  const openModal = () => {
    top = window.scrollY;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.top = `-${top}px`;
    modalOverlay.classList.add("modal_active");
    animatedBlocks.forEach((block) => block.classList.add("paused"));
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    body.style.overflow = "visible";
    html.style.overflow = "visible";

    body.style.position = "static";
    body.style.width = "";
    body.style.top = "";
    window.scrollTo({ top, behavior: "instant" });
    modalOverlay.classList.remove("modal_active");
    animatedBlocks.forEach((block) => block.classList.remove("paused"));
    document.body.style.overflow = "visible";
  };

  openModalButtons.forEach((openButton) => {
    openButton.addEventListener("click", openModal);
  });

  closeModalBtn?.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
};
