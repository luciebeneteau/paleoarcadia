var player1;
var player2;
var ball;
var game = false;

function setup()
{
  createCanvas(600,400);
  rectMode(CENTER);
  textAlign(CENTER);
  noStroke();
  
  player1 = new Paddle(20,height/2);
  player2 = new Paddle(width-20,height/2);
  ball = new Ball();
}

function draw()
{
  background(0);
  
  fill(255);
  for (var i = 0; i < 14; i++)
  {
    rect(width/2,i*30+5,10,20);
  }
  
  textSize(40);
  text(player1.score, width/2-60,40);
  text(player2.score, width/2+60,40);
  
  player1.show();
  if (game)
    player1.update();
  player1.boundary();
  
  player2.show();
  if (game)
    player2.AImove();
  player2.boundary();
  
  ball.show();
  if (game)
    ball.update();
  ball.boundary();
  
  if (!game)
  {
    fill(150);
    textSize(12);
    text("Press Space to play",width/2,height/2);
  }
}

function keyPressed()
{
  if (keyCode === UP_ARROW)
  {
    player1.move(-3);
  } else if (keyCode === DOWN_ARROW)
  {
    player1.move(3);
  } else if (key == ' ')
  {
    game = true;
  }
}

function keyReleased()
{
  player1.move(0);
}

function Paddle(x,y)
{
  this.x = x;
  this.y = y;
  this.s = 0;
  this.score = 0;
  
  this.show = function()
  {
    fill(255);
    rect(this.x,this.y,12,100)
  }
  
  this.boundary = function()
  {
    if (this.y > height-50)
    {
      this.y = height-50;
    } else if (this.y < 50)
    {
      this.y = 50;
    }
  }
  
  this.AImove = function()
  {
    if (this.y < ball.y)
    {
      this.y+=1.35;
    } else if (this.y > ball.y)
    {
      this.y-=1.35;
    }
  }
  
  this.update = function()
  {
    this.y+=this.s;
  }
  
  this.move = function(speed)
  {
    this.s = speed;
  }
}

function Ball()
{
  this.x = width/2;
  this.y = height/2;
  this.xvel = -2;
  this.yvel = 2;
  
  this.show = function()
  {
    fill(255);
    ellipse(this.x,this.y,20);
  }
  
  this.update = function()
  {
    this.xvel+=0.001;
    this.x+=this.xvel;
    this.y+=this.yvel;
  }
  
  this.boundary = function()
  {
    if (this.y < 10 || this.y > height-10)
    {
      this.yvel*=-1;
    }
    
    if (this.x < 36 || this.x > width-36)
    {
      if ((this.y+5 > player1.y-50 && this.y-5 < player1.y+50) || (this.y+5 > player2.y-50 && this.y-5 < player2.y+50))
      {
        if ((this.x+10 > player1.x-6 && this.x-10 < player1.x+6) || (this.x+10 > player2.x-6 && this.x-10 < player2.x+6))
        {
          this.xvel*=-1;
        }
      }
    }
    
    if (this.x > width)
    {
      
      player1.score++;
      this.x = width/2;
      this.y = height/2;
      this.yvel*=-1;
    } else if (this.x < 0)
    {
      player2.score++;
      this.x = width/2;
      this.y = height/2;
      this.yvel*=-1;
    }
  }
}