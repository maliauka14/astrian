interface Section {
  id: string;
  element: HTMLOptionElement;
  link: HTMLLinkElement;
}

export const activateHeaderLink = () => {
  const headerLinks = document.querySelectorAll<HTMLLinkElement>(
    ".header__navigation-item-link"
  );
  const sections: Section[] = [];

  headerLinks.forEach((link) => {
    const targetId = link.getAttribute("href");
    if (targetId) {
      const section = document.querySelector<HTMLOptionElement>(targetId);
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
      const sectionTop = section.element.offsetTop;
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
