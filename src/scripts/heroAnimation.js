import { Application } from '@splinetool/runtime';



async function initSpline() {
  const canvas = document.getElementById('canvas3d');
  const app = new Application(canvas);
  await app.load('src/assets/scene.splinecode222');

}


document.addEventListener('DOMContentLoaded', initSpline)
