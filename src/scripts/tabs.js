
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.strengths__tab');
  const indicator = document.querySelector('.strengths__tab-indicator');

  function activateTab(clickedTab) {
    tabs.forEach(tab => {
      tab.classList.remove('strengths__tab_active');
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      const contentId = tab.getAttribute('aria-controls')
      document.querySelector(`#${contentId}`).classList.remove('strengths__strength_active')
    });

    clickedTab.classList.add('strengths__tab_active');
    clickedTab.setAttribute('aria-selected', 'true');
    clickedTab.setAttribute('tabindex', '0');
    const contentId = clickedTab.getAttribute('aria-controls')
    const targetSlide = document.querySelector(`#${contentId}`);
    const savedScrollY = window.scrollY || window.pageYOffset;

    targetSlide.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'start'
    });
    window.scrollTo(0, savedScrollY);

    updateIndicator(clickedTab);
  }

  function updateIndicator(tab) {
    const tabRect = tab.getBoundingClientRect();
    const containerRect = tab.parentElement.getBoundingClientRect();

    indicator.style.width = `${tabRect.width}px`;
    indicator.style.left = `${tabRect.left - containerRect.left}px`;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  const activeTab = document.querySelector('.strengths__tab_active');
  if (activeTab) {
    updateIndicator(activeTab);
  }

  window.addEventListener('resize', () => {
    const active = document.querySelector('.strengths__tab_active');
    if (active) updateIndicator(active);
  });
});