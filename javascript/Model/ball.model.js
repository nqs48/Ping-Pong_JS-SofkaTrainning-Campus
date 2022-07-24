export class BallModel{

  constructor(x,y,radius,board){
    this.x=x;
    this.y= y;
    this.radius= radius;
    this.speed_y= 0;
    this.speed_x=1;
    this.board=board;
    this.direction= 1;
    this.bounce_angle= 0;
    this.max_bounce_angle	= Math.PI/12;
    this.speed= 1;

    board.ball= this;
    this.kind= "circle";
  }


  move(){
    this.x += (this.speed_x * this.direction);
    this.y += (this.speed_y); 
  }

  collision(bar){
    //react to the collision with a bar
      let relative_interset_y = bar.y + bar.height / 2 - this.y;

      let normalize_interset_y = relative_interset_y / (bar.height / 2);

      this.bounce_angle = normalize_interset_y * this.max_bounce_angle;

      this.speed_y = this.speed * -Math.sin(this.bounce_angle);
      this.speed_x = this.speed * Math.cos(this.bounce_angle);

      if (this.x > this.board.width / 2) this.direction = -1;
      else this.direction = 1;
  }


  get width(){
      return this.radius * 2;
  }

  get height(){
      return this.radius * 2;
  }


}





// (function(){
//   self.Ball= function(x,y,radius,board){
//     this.x=x;
//     this.y= y;
//     this.radius= radius;
//     this.speed_y= 0;
//     this.speed_x=1;
//     this.board=board;
//     this.direction= 1;
//     this.bounce_angle= 0;
//     this.max_bounce_angle	= Math.PI/12;
//     this.speed= 1;

//     board.ball= this;
//     this.kind= "circle";
//   }

//   self.Ball.prototype= {
//     move: function(){
//       this.x += (this.speed_x * this.direction);
//       this.y += (this.speed_y); 
//     },
//     get width(){
//       return this.radius * 2;
//     },
//     get height(){
//       return this.radius * 2;
//     },
//     collision: function(bar){
//       //react to the collision with a bar
//       let relative_interset_y = bar.y + bar.height / 2 - this.y;

//       let normalize_interset_y = relative_interset_y / (bar.height / 2);

//       this.bounce_angle = normalize_interset_y * this.max_bounce_angle;

//       this.speed_y = this.speed * -Math.sin(this.bounce_angle);
//       this.speed_x = this.speed * Math.cos(this.bounce_angle);

//       if (this.x > this.board.width / 2) this.direction = -1;
//       else this.direction = 1;

//     }
//   }