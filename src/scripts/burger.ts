export const activateBurger = () => {
  const burger = document.getElementById("burger");
  const html = document.documentElement;
  const body = document.body;

  burger?.addEventListener("click", () => {
    const isActive = burger.classList.contains("header__burger-menu_active");

    if (isActive) {
      burger.classList.remove("header__burger-menu_active");
      enableScroll();
    } else {
      burger.classList.add("header__burger-menu_active");
      disableScroll();
    }
  });

  const navigationItems = document.querySelectorAll(".header__navigation-item");
  navigationItems.forEach((item) =>
    item.addEventListener("click", () => {
      burger?.classList.remove("header__burger-menu_active");
      enableScroll();
    })
  );

  const disableScroll = () => {
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    // body.style.top = `-${window.scrollY}px`;
  };

  const enableScroll = () => {
    body.style.overflow = "";
    html.style.overflow = "";

    // const scrollY = body.style.top;
    body.style.position = "";
    body.style.width = "";
    // body.style.top = "";
    // window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };
};
