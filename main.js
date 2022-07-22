(function(){
  self.Board = function(width, height){
    this.width= width;
    this.height= height;
    this.playing=false;
    this.game_over= false;
  } 
  
  self.Board.prototype= {
    get elements(){
      let elements= this.bars;
      elements.push(ball);
      return elements;
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
})();

window.addEventListener('load',main)


function main(){

  const board= new Board(800,400);
  const canvas= document.getElementById('canvas');
  const board_view= new BoardView(canvas,board);


}