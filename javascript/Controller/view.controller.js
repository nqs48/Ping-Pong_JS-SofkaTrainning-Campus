import { BoardModel } from "../Model/board.model.js"
import { BallModel } from "../Model/ball.model.js";
import { BarModel } from "../Model/bar.model.js";
import { BoardView } from "../View/board.view.js";
import { SettingsModel, DEFAULT_SETTINGS } from "../Model/settings.model.js";
import { SettingsView } from "../View/settings.view.js";
import { SKINS } from "../View/ball.skins.js";


class ViewController {
  board;
  barLeft;
  barRight;
  ball;
  canvas;
  board_view;

  constructor() {
    this.board = new BoardModel(800, 400);
    this.barLeft = new BarModel(10, 100, 40, 100, this.board);
    this.barRight = new BarModel(750, 100, 40, 100, this.board);
    this.ball = new BallModel(350, 100, 10, this.board);
    this.canvas = document.getElementById("canvas");
    this.board_view = new BoardView(this.canvas, this.board);

  }
}


const ct = new ViewController();

const settings = new SettingsModel();
if (!SKINS[settings.skin]) settings.skin = DEFAULT_SETTINGS.skin;

function apply_settings(settings) {
  ct.ball.setSpeed(settings.speed);
  ct.ball.radius = settings.size;
  ct.board_view.skin = SKINS[settings.skin];
  settings.save();
}

apply_settings(settings);
const settings_view = new SettingsView(document.getElementById("settings"), settings, apply_settings);

export function hit(a, b) {
  let hit = false;
  if (b.x + b.width >= a.x && b.x < a.x + a.width) {
    if (b.y + b.height >= a.y && b.y < a.y + a.height) hit = true;
  }
  if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
    if (b.y <= a.y && b.y + b.height >= a.y + a.height) hit = true;
  }
  if (a.x <= b.x && a.x + a.width >= b.x + b.height) {
    if (a.y <= b.y && a.y + a.height >= b.y + b.height) hit = true;
  }
  return hit;
}

export function draw(ctx, element) {
  switch (element.kind) {
    case "rectangle":
      ctx.fillRect(element.x, element.y, element.width, element.height);
      break;
    case "circle":
      ctx.beginPath();
      ctx.arc(element.x, element.y, element.radius, 0, 7);
      ctx.fill();
      ctx.closePath();
      break;
  }
}

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 38:
      event.preventDefault();
      ct.barRight.up();
      break;
    case 40:
      event.preventDefault();
      ct.barRight.down();
      break;
    case 87:
      event.preventDefault();
      ct.barLeft.up();
      break;
    case 83:
      event.preventDefault();
      ct.barLeft.down();
      break;
    case 32:
      event.preventDefault();
      ct.board.playing = !ct.board.playing;
  }
  console.log(ct.barLeft.toString());
});


//light up the on-screen key hints while a key is held
function highlight_key(keyCode, pressed) {
  for (let el of document.querySelectorAll(`[data-key="${keyCode}"]`)) {
    el.classList.toggle("pressed", pressed);
  }
}

document.addEventListener("keydown", (event) => highlight_key(event.keyCode, true));
document.addEventListener("keyup", (event) => highlight_key(event.keyCode, false));

const tracks = [
  [ct.barLeft, document.querySelector(".p1 .track")],
  [ct.barRight, document.querySelector(".p2 .track")],
];

function update_tracks() {
  for (let [bar, track] of tracks) {
    track.style.setProperty("--pos", bar.y / (ct.board.height - bar.height));
  }
}

ct.board_view.draw();
window.requestAnimationFrame(controller);

function controller() {
  ct.board_view.play();
  settings_view.draw_previews(performance.now());
  update_tracks();

  window.requestAnimationFrame(controller);
}
