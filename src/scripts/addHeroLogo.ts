import { Application } from "@splinetool/runtime";

export const addHeroLogo = async () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas3d");
  if (!canvas) throw new Error("Element canvas not found");

  const app = new Application(canvas);
  await app.load("src/assets/scene.splinecode");
};
