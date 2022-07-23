(function(){
  self.Board = function(width, height){
    this.width= width;
    this.height= height;
    this.playing=false;
    this.game_over= false;
    this.bars= [];
    this.ball= null;
  } 
  
  self.Board.prototype= {
    get elements(){
      let elements= this.bars;
      elements.push(this.ball);
      return elements;
    }
  }
})();

(function(){
  self.Bar= function (x,y,width,height,board){
    this.x= x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.board= board;
    this.board.bars.push(this);
    this.kind= "rectangle";
    this.speed= 10;
  }

  self.Bar.prototype= {
    down: function(){
      this.y+=speed;
    },
    up: function(){
      this.x+=speed;
    }
  }
})();

(function(){
  self.BoardView = function(canvas,board){
    this.canvas= canvas;
    this.canvas.width=board.width;
    this.canvas.height=board.height;
    this.board= board;
    this.ctx= canvas.getContext("2d");
  }

  self.BoardView.prototype = {
    draw: function(){
      for (var i= this.board.elements.length -1;i>=0; i--){
        var el= this.board.elements[i];
        draw(this.ctx,el);
      }
    }
  }

  function draw(ctx,element){
    if (element !== null && element.hasOwnProperty("kind")){
    switch (element.kind) {
      case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;
    }
  }
  }
})();

window.addEventListener('load',main)


function main(){

  const board= new Board(800,400);
  const bar= new Bar(20,100,30,100,board);
  const bar2 = new Bar(750, 100, 30, 100, board);
  const canvas= document.getElementById('canvas');
  const board_view= new BoardView(canvas,board);
  board_view.draw();
  


}