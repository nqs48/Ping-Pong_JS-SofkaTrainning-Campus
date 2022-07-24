export class BoardModel {

  constructor(width, height){
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
  }

  get elements(){
    let elements = this.bars.map((bar) => bar);
    elements.push(this.ball);
    return elements;
  }

}





// ( function () {
//   self.Board = function (width, height) {
//     this.width = width;
//     this.height = height;
//     this.playing = false;
//     this.game_over = false;
//     this.bars = [];
//     this.ball = null;
//   };

//   self.Board.prototype = {
//     get elements() {
//       let elements = this.bars.map((bar) => bar);
//       elements.push(this.ball);
//       return elements;
//     },
//   };
// })();
