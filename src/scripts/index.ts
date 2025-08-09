import { activateHeaderLink } from "./activateHeaderLink";
import { addSocialLinks } from "./addSocialLinks";
import { dragableZone } from "./dragableZone";
import { addHeroLogo } from "./addHeroLogo";
import { animateTabs } from "./tabs";
import { addModal } from "./modal";
import { sendMessage } from "./sendMessage";
import { createTextCarousel } from "./carousel";

document.addEventListener("DOMContentLoaded", () => {
  sendMessage();
  dragableZone();
  activateHeaderLink();
  addHeroLogo();
  addModal();
  animateTabs();
  addSocialLinks();
  createTextCarousel();
});
