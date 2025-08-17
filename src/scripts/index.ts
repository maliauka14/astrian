import { activateHeaderLink } from "./activateHeaderLink";
import { dragableZone } from "./dragableZone";
import { addHeroLogo } from "./addHeroLogo";
import { animateTabs } from "./tabs";
import { addModal } from "./modal";
import { sendMessage } from "./sendMessage";
import { createCarousel, createTextCarousel } from "./carousel";
import { activateBurger } from "./burger";

document.addEventListener("DOMContentLoaded", () => {
  sendMessage();
  dragableZone();
  activateHeaderLink();
  addHeroLogo();
  addModal();
  animateTabs();
  createTextCarousel();
  createCarousel();
  activateBurger();
});
