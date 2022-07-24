export class BarModel {
  constructor(x, y, width, height, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.board.bars.push(this);
    this.kind = "rectangle";
    this.speed = 20;
  }

  down(){
    this.y += this.speed;
  }

  up(){
    this.y -= this.speed;
  }

  toString(){
    return "x: " + this.x + " y: " + this.y;
  }
}


// (function () {
//   self.Bar = function (x, y, width, height, board) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.board = board;
//     this.board.bars.push(this);
//     this.kind = "rectangle";
//     this.speed = 20;
//   };

//   self.Bar.prototype = {
//     down: function () {
//       this.y += this.speed;
//     },
//     up: function () {
//       this.y -= this.speed;
//     },
//     toString: function () {
//       return "x: " + this.x + " y: " + this.y;
//     },
//   };
// })();
