export const addModal = () => {
  const openModalButtons = document.querySelectorAll('[aria-controls="modal"]');
  const closeModalBtn = document.querySelector(".modal__close-button");
  const modalOverlay = document.getElementById("modal");
  const contactContent = document.querySelector(".contact");
  const modalContent = document.querySelector(".modal__content");
  const animatedBlocks = document.querySelectorAll(".animate");

  if (!modalOverlay) throw new Error("Element modal not found");
  if (!contactContent) throw new Error("Element contact not found");
  if (!modalContent) throw new Error("Element modal__content not found");

  const contactForm = contactContent.cloneNode(true);
  modalContent.innerHTML = "";
  modalContent.appendChild(contactForm);

  openModalButtons.forEach((openButton) => {
    openButton.addEventListener("click", function () {
      modalOverlay.classList.add("modal_active");
      animatedBlocks.forEach((block) => block.classList.add("paused"));
      document.body.style.overflow = "hidden";
    });
  });

  closeModalBtn?.addEventListener("click", function () {
    modalOverlay.classList.remove("modal_active");
    animatedBlocks.forEach((block) => block.classList.remove("paused"));
    document.body.style.overflow = "";
  });

  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("modal_active");
      animatedBlocks.forEach((block) => block.classList.remove("paused"));
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modalOverlay.classList.remove("modal_active");
      animatedBlocks.forEach((block) => block.classList.remove("paused"));
      document.body.style.overflow = "";
    }
  });
};
