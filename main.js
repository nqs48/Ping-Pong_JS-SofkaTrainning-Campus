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
      var elements= this.bars;
      // elements.push(this.ball);
      return elements;
    }
  }
})();

(function(){
  self.Bar= function (x,y,width,height,board){
    this.x= x;
    this.y= y;
    this.width= width;
    this.height= height;
    this.board= board;
    this.board.bars.push(this);
    this.kind= "rectangle";
    this.speed= 20;
  }

  self.Bar.prototype= {
    down: function(){
      this.y+=this.speed;
    },
    up: function(){
      this.y-=this.speed;
    },
    toString: function(){
      return "x: "+this.x + " y: "+ this.y;
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
    clean: function(){
      this.ctx.clearRect(0,0,this.board.width,this.board.height);
    },
    draw: function(){
      for (var i= this.board.elements.length -1;i>=0; i--){
        var el= this.board.elements[i];
        draw(this.ctx,el);
      }
    },
    play: function(){
      this.clean();
      this.draw();
    }
  }

  function draw(ctx,element){
    // if (element !== null && element.hasOwnProperty("kind")){
    switch (element.kind) {
      case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;
    }
  // }
  }
})();





document.addEventListener("keydown",(event) => {
  event.preventDefault();
    switch (event.keyCode){
      case 38: 
        bar.up();
        break
      case 40: 
        bar.down();
        break;
      case 87: 
        bar2.up();
        break;
      case 83:
        bar2.down();
        break;
    }
    console.log(bar2.toString());
  });

//self.addEventListener("load", main);



let board = new Board(800, 400);
let bar = new Bar(20, 100, 40, 100, board);
let bar2 = new Bar(700, 100, 40, 100, board);
let canvas = document.getElementById("canvas");
let board_view = new BoardView(canvas, board);

window.requestAnimationFrame(controller);

function controller(){
  board_view.play();
  
  window.requestAnimationFrame(controller);
  
  


}