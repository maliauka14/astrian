export const activateBurger = () => {
  const burger = document.getElementById("burger");
  const body = document.querySelector("body");

  burger?.addEventListener("click", () => {
    const classes = Array.from(burger.classList);
    if (classes.indexOf("header__burger-menu_active") !== -1) {
      burger.classList.remove("header__burger-menu_active");
      if (body) body.style.overflow = "visible";
    } else {
      burger.classList.add("header__burger-menu_active");
      if (body) body.style.overflow = "hidden";
    }
  });

  const navigationItems = document.querySelectorAll(".header__navigation-item");
  navigationItems.forEach((item) =>
    item.addEventListener("click", () => {
      burger?.classList.remove("header__burger-menu_active");
      if (body) body.style.overflow = "visible";
    })
  );
};
