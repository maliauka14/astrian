export const addModal = () => {
  const openModalButtons = document.querySelectorAll('[aria-controls="modal"]');
  const closeModalBtn = document.querySelector(".modal__close-button");
  const modalOverlay = document.getElementById("modal");
  const contactContent = document.querySelector(".contact");
  const modalContent = document.querySelector(".modal__content");
  const animatedBlocks = document.querySelectorAll(".animate");
  const html = document.documentElement;
  const body = document.body;

  if (!modalOverlay) throw new Error("Element modal not found");
  if (!contactContent) throw new Error("Element contact not found");
  if (!modalContent) throw new Error("Element modal__content not found");

  const contactForm = contactContent.cloneNode(true);
  modalContent.innerHTML = "";
  modalContent.appendChild(contactForm);

  const openModal = () => {
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    modalOverlay.classList.add("modal_active");
    animatedBlocks.forEach((block) => block.classList.add("paused"));
    document.body.style.overflowY = "hidden";
  };

  const closeModal = () => {
    body.style.overflow = "";
    html.style.overflow = "";

    body.style.position = "";
    body.style.width = "";
    modalOverlay.classList.remove("modal_active");
    animatedBlocks.forEach((block) => block.classList.remove("paused"));
    document.body.style.overflowY = "";
  };

  openModalButtons.forEach((openButton) => {
    openButton.addEventListener("click", openModal);
  });
  console.log(closeModalBtn);
  closeModalBtn?.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
};
