export const animateTabs = () => {
  const tabs = document.querySelectorAll<HTMLButtonElement>(".strengths__tab");
  const indicator = document.querySelector<HTMLDivElement>(
    ".strengths__tab-indicator"
  );
  const tabContents = document.querySelectorAll<HTMLDivElement>(".tablist");
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  if (!indicator) throw new Error("Element strengths__tab-indicator not found");

  const activateTab = (clickedTab: HTMLButtonElement) => {
    tabs.forEach((tab) => {
      tab.classList.remove("strengths__tab_active");
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("tabindex", "-1");
    });

    clickedTab.classList.add("strengths__tab_active");
    clickedTab.setAttribute("aria-selected", "true");
    clickedTab.setAttribute("tabindex", "0");
    const contentId = clickedTab.getAttribute("aria-controls");
    if (!contentId) return;
    const targetSlide = document.getElementById(contentId);
    const savedScrollY = window.scrollY || window.pageYOffset;

    targetSlide?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
      inline: "start",
    });
    window.scrollTo(0, savedScrollY);

    updateIndicator(clickedTab);
  };

  const updateIndicator = (tab: HTMLButtonElement) => {
    if (!indicator || !tab.parentElement) return;
    const tabRect = tab.getBoundingClientRect();
    const containerRect = tab.parentElement.getBoundingClientRect();

    indicator.style.width = `${tabRect.width}px`;
    indicator.style.left = `${tabRect.left - containerRect.left}px`;
  };

  const getNextTab = (
    currentTab: HTMLButtonElement,
    direction: "left" | "right"
  ) => {
    const currentIndex = Array.from(tabs).indexOf(currentTab);
    let nextIndex;

    if (direction === "left") {
      nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    }

    return tabs[nextIndex];
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab));
  });

  tabContents.forEach((content) => {
    content.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      currentX = startX;
      isSwiping = true;
    });

    content.addEventListener("touchmove", (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;
    });

    content.addEventListener("touchend", () => {
      if (!isSwiping) return;
      isSwiping = false;

      const diffX = startX - currentX;
      const swipeThreshold = 50;

      if (Math.abs(diffX) > swipeThreshold) {
        const activeTab = document.querySelector<HTMLButtonElement>(
          ".strengths__tab_active"
        );
        if (activeTab) {
          const direction = diffX > 0 ? "left" : "right";
          const nextTab = getNextTab(activeTab, direction);
          activateTab(nextTab);
        }
      }
    });
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
