import {draw, hit} from "../Controller/view.controller.js"
import { SKINS, paint_skin, paint_trail } from "./ball.skins.js";

const COLORS = {
  background: "#000000",
  net: "rgba(209, 247, 255, 0.35)",
  left: "#05d9e8",
  right: "#ff2a6d",
  text: "#d1f7ff",
};
const FONT = '"Press Start 2P", monospace';
const TRAIL_LENGTH = 10;


export class BoardView{

  constructor(canvas, board){
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext("2d");
    this.skin = SKINS.classic;
    this.spin = 0;
    this.trail = [];
  }

  clean(){
    this.ctx.fillStyle = COLORS.background;
    this.ctx.fillRect(0, 0, this.board.width, this.board.height);
  }

  draw(){
    this.draw_net();
    this.draw_score();
    for (let i = this.board.elements.length - 1; i >= 0; i--) {
      let el = this.board.elements[i];
      if (el === this.board.ball) this.draw_ball(el);
      else this.glow(this.bar_color(el), () => draw(this.ctx, el));
    }
    if (!this.board.playing) this.draw_pause();
  }

  bar_color(bar){
    return bar.x < this.board.width / 2 ? COLORS.left : COLORS.right;
  }

  glow(color, paint){
    //neon effect: paint with a blurred shadow of the same color
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 15;
    paint();
    this.ctx.restore();
  }

  draw_ball(ball){
    paint_trail(this.ctx, this.skin, this.trail, ball.radius);
    paint_skin(this.ctx, this.skin, ball.x, ball.y, ball.radius, this.spin, performance.now());
  }

  track_ball(){
    //spin the ball as it rolls and remember its last positions for the trail
    let ball = this.board.ball;
    this.spin += (ball.speed_x * ball.direction) / ball.radius;
    this.trail.push({ x: ball.x, y: ball.y });
    if (this.trail.length > TRAIL_LENGTH) this.trail.shift();
  }

  draw_net(){
    let size = 10;
    this.ctx.fillStyle = COLORS.net;
    for (let y = size / 2; y < this.board.height; y += size * 2) {
      this.ctx.fillRect(this.board.width / 2 - size / 4, y, size / 2, size);
    }
  }

  draw_score(){
    this.ctx.textAlign = "center";
    this.ctx.font = `10px ${FONT}`;
    this.glow(COLORS.left, () => this.ctx.fillText("P1", this.board.width / 4, 25));
    this.glow(COLORS.right, () => this.ctx.fillText("P2", (this.board.width * 3) / 4, 25));

    this.ctx.font = `36px ${FONT}`;
    this.glow(COLORS.left, () => this.ctx.fillText(this.board.score.left, this.board.width / 4, 70));
    this.glow(COLORS.right, () => this.ctx.fillText(this.board.score.right, (this.board.width * 3) / 4, 70));
  }

  draw_pause(){
    //blinking message while the game is paused
    if (Math.floor(Date.now() / 600) % 2) return;
    this.ctx.textAlign = "center";
    this.ctx.font = `16px ${FONT}`;
    this.glow(COLORS.text, () => this.ctx.fillText("PRESS SPACE", this.board.width / 2, this.board.height - 40));
  }

  check_goal(){
    let ball = this.board.ball;
    if (ball.x + ball.radius < 0) {
      this.board.score.right++;
      ball.reset(-1);
    } else if (ball.x - ball.radius > this.board.width) {
      this.board.score.left++;
      ball.reset(1);
    } else {
      return;
    }
    //pause until the next serve
    this.trail = [];
    this.board.playing = false;
  }

  check_collisions(){
    for (let i = this.board.bars.length - 1; i >= 0; i--) {
      let bar = this.board.bars[i];
      if (hit(bar, this.board.ball)) {
        this.board.ball.collision(bar);
      }
    }
  }

  play(){
    //always redraw so bars and the pause message stay updated
    this.clean();
    this.draw();
    if (this.board.playing) {
      this.check_collisions();
      this.board.ball.move();
      this.track_ball();
      this.check_goal();
    }
  }
}
