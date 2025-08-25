export const closePreloader = () => {
  const preload = document.querySelector<HTMLDivElement>(".preload");
  const html = document.documentElement;
  const body = document.body;

  if (preload) preload.style.display = "none";
  body.style.overflow = "visible";
  html.style.overflow = "visible";
  body.style.position = "static";
  body.style.width = "";
};
