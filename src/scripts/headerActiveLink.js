document.addEventListener('DOMContentLoaded', function () {
  const headerLinks = document.querySelectorAll('.header__navigation-item-link');
  const sections = [];

  headerLinks.forEach(link => {
    const targetId = link.getAttribute('href');
    const section = document.querySelector(targetId);
    if (section) {
      sections.push({
        id: targetId,
        element: section,
        link: link
      });
    }
  });

  function checkActiveSection() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.element.offsetTop;
      const sectionHeight = section.element.offsetHeight;

      if (scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight) {

        headerLinks.forEach(link => {
          link.classList.remove('header__navigation-item-link_active');
        });
        section.link.classList.add('header__navigation-item-link_active');
      }
    });
  }

  checkActiveSection();
  window.addEventListener('scroll', checkActiveSection);

});