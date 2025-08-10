import { Application } from "@splinetool/runtime";
import sceneUrl from "../assets/scene.splinecode";
import _ from "lodash";

export const addHeroLogo = async () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas3d");
  if (!canvas) throw new Error("Element canvas not found");

  const app = new Application(canvas);
  await app.load(sceneUrl);

  canvas.style.width = "85vh";
  canvas.style.height = "85vh";
  canvas.style.touchAction = "auto";

  let isScrolling = false;

  canvas.addEventListener("wheel", () => {
    if (!isScrolling) {
      canvas.style.pointerEvents = "none";
      isScrolling = true;
    }
    scrollEndHandler();
  });
  const scrollEndHandler = _.debounce(() => {
    canvas.style.pointerEvents = "auto";
    isScrolling = false;
  }, 250);
  console.log(isScrolling);
};
