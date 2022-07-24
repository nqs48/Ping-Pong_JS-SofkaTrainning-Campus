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
      var elements= this.bars.map(bar => bar);
      elements.push(this.ball);
      return elements;
    }
  }
})();

(function(){
  self.Ball= function(x,y,radius,board){
    this.x=x;
    this.y= y;
    this.radius= radius;
    this.speed_y= 0;
    this.speed_x=2;
    this.board=board;
    this.direction= 1;	

    board.ball= this;
    this.kind= "circle";
  }

  self.Ball.prototype= {
    move: function(){
      this.x += (this.speed_x * this.direction);
      this.y += (this.speed_y); 
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
      if(this.board.playing){
        this.clean();
        this.draw();
        this.board.ball.move();
      }
    }
  }

  function draw(ctx,element){
    // if (element !== null && element.hasOwnProperty("kind")){
    switch (element.kind) {
      case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(element.x,element.y,element.radius,0,7);
        ctx.fill();
        ctx.closePath();
        break;
    }
  // }
  }
})();





document.addEventListener("keydown",(event) => {
  
    switch (event.keyCode){
      case 38:
        event.preventDefault(); 
        bar.up();
        break
      case 40:
        event.preventDefault(); 
        bar.down();
        break;
      case 87:
        event.preventDefault(); 
        bar2.up();
        break;
      case 83:
        event.preventDefault();
        bar2.down();
        break;
      case 32:
        event.preventDefault();
        board.playing = !board.playing;

    }
    console.log(bar2.toString());
  });

//self.addEventListener("load", main);



let board = new Board(800, 400);
let bar2 = new Bar(20, 100, 40, 100, board);
let bar = new Bar(700, 100, 40, 100, board);
let ball= new Ball(350, 100, 10,board);
let canvas = document.getElementById("canvas");
let board_view = new BoardView(canvas, board);


board_view.draw();
window.requestAnimationFrame(controller);


function controller(){
  board_view.play();
  
  window.requestAnimationFrame(controller);
  
  


}