import { activateHeaderLink } from "./activateHeaderLink";
import { addSlider } from "./slider";
import { addHeroLogo } from "./addHeroLogo";
import { animateTabs } from "./tabs";
import { addModal } from "./modal";
import { sendMessage } from "./sendMessage";
import { createCarousel, createTextCarousel } from "./carousel";
import { activateBurger } from "./burger";
import { closePreloader } from "./closePreloader";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    sendMessage();
    addSlider();
    activateHeaderLink();
    addModal();
    animateTabs();
    createTextCarousel();
    createCarousel();
    activateBurger();

    await addHeroLogo();
    closePreloader();
  } catch (error) {
    console.error("Initialization error:", error);
    closePreloader();
  }
});
