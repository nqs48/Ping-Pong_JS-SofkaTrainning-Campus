import { BoardModel } from "../Model/board.model.js"
import { BallModel } from "../Model/ball.model.js";
import { BarModel } from "../Model/bar.model.js";
import { BoardView } from "../View/board.view.js";


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


ct.board_view.draw();
window.requestAnimationFrame(controller);

function controller() {
  ct.board_view.play();

  window.requestAnimationFrame(controller);
}
