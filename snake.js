const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

// create unit
const box = 32;

// load image
const ground = new Image();
ground.src = 'ground.png';

const foodImg = new Image();
foodImg.src = 'food.png';

// create snake
let snake = [];
snake[0] = {
    x : 9*box,
    y : 10*box
};


// create food
let food = {
    x : Math.floor(Math.random() * 17 + 1) * box,
    y : Math.floor(Math.random() * 15 + 3) * box
}

// create the score value
let score = 0;

// direction
let d;

// control the snake
document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode;
    // console.log(key);
    if(key == 37 && d != "RIGHT"){
        d = "LEFT";
    } else if(key == 38 && d != "DOWN"){
        d = "UP";
    } else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    } else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

// check collision
function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


// draw every thing into the canvas
function draw(){
    ctx.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // draw food
    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    // which dirction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random() * 17 + 1) * box,
            y : Math.floor(Math.random() * 15 + 3) * box
        }
        // we do not remove tail 
    } else {
        // remove the tail
        snake.pop();
    }

    // new head
    let newHead = {
        x : snakeX,
        y : snakeY
    };

    // game over
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
        clearInterval(game);
    }

    snake.unshift(newHead);

    // draw score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa One";
    ctx.fillText(score, 2*box, 1.6*box);
}


// call draw function every 100ms
let game = setInterval(draw, 100);