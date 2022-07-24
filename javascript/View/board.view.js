import {draw, hit} from "../Controller/view.controller.js"


export class BoardView{

  constructor(canvas, board){
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext("2d");
  }

  clean(){
    this.ctx.clearRect(0, 0, this.board.width, this.board.height);
  }

  draw(){
    for (let i = this.board.elements.length - 1; i >= 0; i--) {
      let el = this.board.elements[i];
      draw(this.ctx, el);
    }
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
    if (this.board.playing) {
      this.clean();
      this.draw();
      this.check_collisions();
      this.board.ball.move();
    }
  }
}


