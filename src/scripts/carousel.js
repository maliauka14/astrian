document.addEventListener('DOMContentLoaded', () => {
  const copy = document.querySelector(".carousel__wrapper").cloneNode(true);
  document.querySelector(".carousel").appendChild(copy);
});