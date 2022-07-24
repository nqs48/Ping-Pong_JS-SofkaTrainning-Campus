import {BoardModel} from "./Model/board.model.js"
import {BallModel} from "./Model/ball.model.js"
import {BarModel} from "./Model/bar.model.js"
import {BoardView} from "./View/board.view.js"


const board = new BoardModel(800, 400);
const bar2 = new BarModel(20, 100, 40, 100, board);
const bar = new BarModel(700, 100, 40, 100, board);
const ball = new BallModel(350, 100, 10, board);
const canvas = document.getElementById("canvas");
const board_view = new BoardView(canvas, board);

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


board_view.draw();
window.requestAnimationFrame(controller);


function controller(){
  board_view.play();
  
  window.requestAnimationFrame(controller);
  
  


}