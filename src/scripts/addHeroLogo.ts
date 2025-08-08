import { Application } from "@splinetool/runtime";

export const addHeroLogo = async () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas3d");
  if (!canvas) throw new Error("Element canvas not found");

  const app = new Application(canvas);
  await app.load("src/assets/scene.splinecode");

  // Устанавливаем размер после загрузки
  const setSize = () => {
    const size = window.innerHeight * 0.6;
    app.setSize(size, size);
  };

  // Инициализация размера
  setSize();

  // Обработчик ресайза
  window.addEventListener("resize", setSize);

  // Очистка
  return () => window.removeEventListener("resize", setSize);
};
