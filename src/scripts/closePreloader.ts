export const closePreloader = () => {
  document.body.style.overflowY = "visible";
  const preload = document.querySelector<HTMLDivElement>(".preload");
  if (preload) preload.style.display = "none";
};
