export const animateTabs = () => {
  const tabs = document.querySelectorAll<HTMLButtonElement>(".strengths__tab");
  const indicator = document.querySelector<HTMLDivElement>(
    ".strengths__tab-indicator"
  );
  const tabsContainer = document.querySelector<HTMLElement>(
    ".strengths__tablist"
  );

  if (!indicator) throw new Error("Element strengths__tab-indicator not found");
  if (!tabsContainer) throw new Error("Strengths tabs container not found");

  const activateTab = (clickedTab: HTMLButtonElement) => {
    tabs.forEach((tab) => {
      tab.classList.remove("strengths__tab_active");
      const isActive = tab.getAttribute("aria-selected") === "true";
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("tabindex", "-1");
      const contentId = tab.getAttribute("aria-controls");
      if (isActive && contentId) {
        const activeContent = document.getElementById(contentId);

        if (activeContent)
          activeContent.classList.remove("strengths__strength_active");
      }
    });

    clickedTab.classList.add("strengths__tab_active");
    clickedTab.setAttribute("aria-selected", "true");
    clickedTab.setAttribute("tabindex", "0");

    const containerWidth = tabsContainer.clientWidth;
    const tabLeft = clickedTab.offsetLeft;
    const tabWidth = clickedTab.offsetWidth;

    const targetScroll = tabLeft - (containerWidth - tabWidth) / 2;
    tabsContainer.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    const contentId = clickedTab.getAttribute("aria-controls");
    if (!contentId) return;
    const targetSlide = document.getElementById(contentId);
    if (targetSlide) targetSlide.classList.add("strengths__strength_active");
    updateIndicator(clickedTab);
  };

  const updateIndicator = (tab: HTMLButtonElement) => {
    if (!indicator) return;

    const containerScrollLeft = tabsContainer.scrollLeft;
    const tabRect = tab.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();

    indicator.style.width = `${tabRect.width}px`;
    indicator.style.left = `${
      tabRect.left - containerRect.left + containerScrollLeft
    }px`;
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab));
  });

  tabsContainer.addEventListener("scroll", () => {
    const activeTab = document.querySelector<HTMLButtonElement>(
      ".strengths__tab_active"
    );
    if (activeTab) updateIndicator(activeTab);
  });

  const activeTab = document.querySelector<HTMLButtonElement>(
    ".strengths__tab_active"
  );
  if (activeTab) {
    updateIndicator(activeTab);
  }

  window.addEventListener("resize", () => {
    const active = document.querySelector<HTMLButtonElement>(
      ".strengths__tab_active"
    );
    if (active) updateIndicator(active);
  });
};
