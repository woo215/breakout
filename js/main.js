const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();
let ballX = canvas.width / 2;
let ballY = 0;
let dx = 2;
let dy = 2;

let rightPressed = false;
let leftPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    ballX += dx;
    ballY += dy;
    if(ballX > canvas.width || ballX < 0) {
        dx = -dx
    }
    if(ballY < 0) {
        dy = -dy
    }
    if(ballY+10 > canvas.height) {
        if(ballX > barX && ballX < barX + 70){
            dy = -dy
        } else {
            alert("Game Over");
            window.location.reload();
            ballY = 0;
        }
    }
}
let barX = (canvas.width-70)/2

function drawBar() {
    ctx.beginPath();
    if(leftPressed && barX>0) {
        barX -= 2;
    } else if (rightPressed && barX<canvas.width-70) {
        barX += 2;
    }
    ctx.rect(barX, canvas.height-10, 70, 10);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBar();
}

setInterval(draw, 10)

function keyDownHandler(e) {
    if(e.keyCode==37) {
        //왼쪽 방향키를 눌렀을 때의 변화
        leftPressed=true;
    } else if(e.keyCode == 39) {
        //오른쪽 방향키를 눌렀을 때의 변화
        rightPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 37) {
        //왼쪽 방향키 뗄 때 변화
        leftPressed = false;
    } else if(e.keyCode == 39) {
        //오른쪽 방향키 뗄 때 변화
        rightPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)