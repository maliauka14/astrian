export const activateBurger = () => {
  const burger = document.getElementById("burger");

  burger?.addEventListener("click", () => {
    console.log("click");
    const classes = Array.from(burger.classList);
    console.log(classes);
    if (classes.indexOf("header__burger-menu_active") !== -1) {
      burger.classList.remove("header__burger-menu_active");
    } else {
      burger.classList.add("header__burger-menu_active");
    }
  });

  const navigationItems = document.querySelectorAll(".header__navigation-item");
  navigationItems.forEach((item) =>
    item.addEventListener("click", () =>
      burger?.classList.remove("header__burger-menu_active")
    )
  );
};
