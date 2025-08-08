import { activateHeaderLink } from "./activateHeaderLink";
import { addHeroLogo } from "./addHeroLogo";
import { dragableZone } from "./dragableZone";
import { addModal } from "./modal";
import { animateTabs } from "./tabs";

document.addEventListener("DOMContentLoaded", () => {
  dragableZone();
  activateHeaderLink();
  addHeroLogo();
  addModal();
  animateTabs();
});
