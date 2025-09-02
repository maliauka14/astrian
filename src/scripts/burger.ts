export const activateBurger = () => {
  const burger = document.getElementById("burger");
  const header = document.getElementById("header");
  const html = document.documentElement;
  const body = document.body;

  let top = 0;
  burger?.addEventListener("click", () => {
    if (!header) return;
    const isActive = header.classList.contains("header_collapsed");

    if (isActive) {
      header.classList.remove("header_collapsed");
      enableScroll();
    } else {
      header.classList.add("header_collapsed");
      disableScroll();
    }
  });

  const navigationItems = document.querySelectorAll(".header__navigation-item");
  navigationItems.forEach((item) =>
    item.addEventListener("click", () => {
      if (header?.classList.contains("header_collapsed")) {
        header?.classList.remove("header_collapsed");
        enableScroll();
      }
    })
  );

  const disableScroll = () => {
    top = window.scrollY;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.top = "0px";
  };

  const enableScroll = () => {
    body.style.overflow = "visible";
    html.style.overflow = "visible";

    body.style.position = "static";
    body.style.width = "";
    body.style.top = "";
    window.scrollTo({ top, behavior: "instant" });
  };
};
