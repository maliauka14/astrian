import { activateHeaderLink } from "./activateHeaderLink";
import { addSocialLinks } from "./addSocialLinks";
import { dragableZone } from "./dragableZone";
import { addHeroLogo } from "./addHeroLogo";
import { animateTabs } from "./tabs";
import { addModal } from "./modal";

document.addEventListener("DOMContentLoaded", () => {
  dragableZone();
  activateHeaderLink();
  addHeroLogo();
  addModal();
  animateTabs();
  addSocialLinks();
});
