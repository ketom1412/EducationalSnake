// Pressing Control-R will render this sketch.
var gridsize = 20;
var snake;
var newDir;
var timer;
var tickSpeed;
var apple;
var score;
var crashed;

void setup() 
{  // this is run once.   
    size(500,500);
    background(0);
    newDir = "right";
    timer = millis();
    tickSpeed = 60;
    score = 0;
    crashed = false;
    
    apple = {
        x: floor(random(0, width/gridsize))*gridsize + 10,
        y: floor(random(5, height/gridsize))*gridsize + 10
    };
    
    snake = {
        dir: "right",
        x: 110,
        y: 50,
        tail: [
            {x: 50, y: 50},
            {x: 70, y: 50},
            {x: 90, y: 50}
            ]
        };
} 

void draw() 
{   
    if(millis() - timer >= tickSpeed)
    {
        // this is run repeatedly.  
        background(0);
        snake.dir = newDir;
    
        if(keyCode == RIGHT && snake.dir != "left")
        {
            newDir = "right";
        }
        if(keyCode == LEFT && snake.dir != "right")
        {
            newDir = "left";
        }
        if(keyCode == UP && snake.dir != "down")
        {
            newDir = "up";
        }
        if(keyCode == DOWN && snake.dir != "up")
        {
            newDir = "down";
        }
        
        if(!crashed)
        {
            moveSnake();
        }
        
        drawSnake();
        crashCheck();
        eatApple();
        drawApple();
        drawScore();
        
        //82 is keycode for r
        if(keyCode == 82 && crashed)
        {
            setup();
        }
        
        timer = millis();
    }
}

var eatApple = function()
{
    if(snake.x == apple.x && snake.y == apple.y)
    {
        snake.tail.push({x: snake.x, y: snake.y});
        moveApple();
        score++;
    }
}

var moveApple = function()
{
    apple.x = floor(random(0, width/gridsize))*gridsize + 10;
    apple.y = floor(random(0, height/gridsize))*gridsize + 10;
    for(var i = 0; i < snake.tail.length; i++)
    {
        if(apple.x == snake.tail[i].x && apple.y == snake.tail[i].y)
        {
            moveApple();
        }
    }
}

var drawApple = function()
{
    fill(255, 0, 0);
    ellipse(apple.x, apple.y, gridsize, gridsize);
}

var drawSnake = function()
{
    fill(255, 255, 0);
    ellipse(snake.x, snake.y, gridsize, gridsize);
    
    for(var i = 0; i < snake.tail.length; i++) 
    {
        fill(0, 255, 0);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(snake.tail[i].x, snake.tail[i].y, gridsize, gridsize);
    }
}

var moveSnake = function() 
{
    snake.tail.push({x: snake.x, y: snake.y});
    if(snake.dir === "right")
    {
        snake.x += gridsize;
    }
    else if(snake.dir === "left")
    {
        snake.x -= gridsize;
    }
    else if(snake.dir === "down")
    {
        snake.y += gridsize;
    }
    else if(snake.dir === "up")
    {
        snake.y -= gridsize;
    }
    
    wrap();
    //Removes the last segment of the tail from the array
    snake.tail.splice(0,1);
}

var wrap = function()
{
    if(snake.x > width)
    {
        snake.x = snake.x - width;
    }
    else if(snake.x < 0)
    {
        snake.x = snake.x + width;
    }
    else if(snake.y > height)
    {
        snake.y = snake.y - height;
    }
    else if(snake.y < 0)
    {
        snake.y = snake.y + height;
    }
}

var drawScore = function()
{
    fill(255, 255, 255);
    stroke(10);
    strokeWeight(20);
    textSize(30);
    text(score, 250, 40);
    noStroke();
}

var crashCheck = function()
{
    for(var i = 0; i < snake.tail.length; i++)
    {
        if(snake.x == snake.tail[i].x && snake.y == snake.tail[i].y)
        {
            crashed = true;
            fill(255, 255, 0);
            ellipse(snake.x, snake.y, gridsize, gridsize);
            stroke(255, 0, 0);
            strokeWeight(4);
            line(snake.x - 10, snake.y - 10, snake.x + 10, snake.y + 10);
            line(snake.x - 10, snake.y + 10, snake.x + 10, snake.y - 10);
        }
    }
}
