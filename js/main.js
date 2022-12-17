const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.strokeStyle = "black";
// ctx.stroke();
// ctx.closePath();

let x = canvas.width/2;
let y = 0;

let dx = 2;
let dy = 2;

let rightPressed = false;
let leftPressed = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBar();
    collisionDetection();
    drawBricks();
    drawScore();
    drawLife();
    if(x > canvas.width || x < 0) {
        //방향을 바꿔준다던가 어쩼든 안 쪽으로 다시 오는 튕겨주는 내용
        dx = -dx
    }
    if(y < 0) {
        //다시 튕겨주는 코드를 작성
        dy = -dy
    }
    if(y > canvas.height) {
        //alert("Game Over!")
        life -= 1;
        if(life >= 0) {
            y = 0;
        } else {
            alert("Game Over!");
        }
    }
    if((y >= canvas.height-barHeight) && (barX <= x && x <= barX + barWidth)) {
        dy = -dy;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
}

const barWidth = 50;
const barHeight = 10;

let barX = (canvas.width-barWidth)/2
function drawBar() {
    ctx.beginPath();
    if(rightPressed && barX < canvas.width-barWidth) {
        barX += 5;
    }
    if(leftPressed && barX > 0) {
        barX -= 5;
    }
    ctx.rect(barX, canvas.height-barHeight, barWidth, barHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function keyDown(e) {
    if(e.keyCode == 39) {
        //오른쪽 버튼을 눌러주는거
        rightPressed = true;
    } else if(e.keyCode == 37) {
        //왼쪽 버튼을 눌러주는 거
        leftPressed = true;
    }
}

function keyUp(e) {
    if(e.keyCode == 39) {
        //오른쪽 버튼을 뗀거
        rightPressed = false;
    } else if(e.keyCode == 37) {
        //왼쪽 버튼을 뗀거
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//preventDefault()

setInterval(draw, 10);


const brickRowCount = 5;
const brickColumnCount = 6;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 7;

const bricks = [];
for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x:0, y:0, status:1 };
    }
}

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            // const x = bricks[c][r].x;
            // const y = bricks[c][r].y;
            // ctx.beginPath();
            // ctx.rect(x, y, brickWidth, brickHeight);
            // ctx.fillStyle = "#0095DD";
            // ctx.fill();
            // ctx.closePath();
            if(bricks[c][r].status == 1) {
                let brickX = c * (brickWidth + brickPadding);
                let brickY = r * (brickHeight + brickPadding);
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
            
        }
    }
}
function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score += 1;
                    if(score >= 30) {
                        alert("YOU WIN!");
                    }
                }
            }        
        }
    }
}

let score = 0;

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score : " + score, 8, 20);
}

let life = 3;

function drawLife() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Life : " + life, canvas.width-65, 20);
}
function mouseMoveHandler(event) {
    let relativeX = event.clientX;
    if(relativeX > 0 && relativeX < canvas.width) {
        barX = relativeX - barWidth / 2;
    }
}

document.addEventListener("mousemove" , mouseMoveHandler, false);