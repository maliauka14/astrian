interface Section {
  id: string;
  element: HTMLElement;
  link: HTMLLinkElement;
}

export const activateHeaderLink = () => {
  const headerLinks = document.querySelectorAll<HTMLLinkElement>(
    ".header__navigation-item-link"
  );
  const sections: Section[] = [];

  const rootStyles = getComputedStyle(document.documentElement);
  const scrollPaddingValue = rootStyles
    .getPropertyValue("--scroll-padding")
    .trim();

  const tempElement = document.createElement("div");
  tempElement.style.position = "absolute";
  tempElement.style.visibility = "hidden";
  tempElement.style.height = scrollPaddingValue;
  document.body.appendChild(tempElement);

  const scrollPadding = parseInt(getComputedStyle(tempElement).height, 10) || 0;
  document.body.removeChild(tempElement);
  const visualDiff = 20;

  headerLinks.forEach((link) => {
    const targetId = link.getAttribute("href");
    if (targetId) {
      const section = document.querySelector<HTMLElement>(targetId);
      if (section) {
        sections.push({
          id: targetId,
          element: section,
          link: link,
        });
      }
    }
  });

  const checkActiveSection = () => {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.element.offsetTop - scrollPadding - visualDiff;
      const sectionHeight = section.element.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        headerLinks.forEach((link) => {
          link.classList.remove("header__navigation-item-link_active");
        });
        section.link.classList.add("header__navigation-item-link_active");
      }
    });
  };

  checkActiveSection();
  window.addEventListener("scroll", checkActiveSection);
};
