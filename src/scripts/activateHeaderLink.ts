interface Section {
  id: string;
  element: HTMLElement;
  link: HTMLLinkElement;
}

export const activateHeaderLink = () => {
  const headerLinks = document.querySelectorAll<HTMLLinkElement>(
    ".header__navigation-item-link"
  );
  let sections: Section[] = [];
  const scrollPaddingValue = 16;
  const reserveValue = 64;

  const updateSections = () => {
    sections = [];
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
  };

  const checkActiveSection = () => {
    const scrollPosition = window.scrollY;
    sections.forEach((section) => {
      const rect = section.element.getBoundingClientRect();
      const sectionTop =
        window.scrollY + rect.top - scrollPaddingValue - reserveValue;
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

  updateSections();
  checkActiveSection();

  window.addEventListener("resize", updateSections);
  window.addEventListener("scroll", checkActiveSection);
};
