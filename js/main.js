const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, true);
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
    if(x > canvas.width || x < 0) {
        //방향을 바꿔준다던가 어쨋든 안 쪽으로 다시 오는 튕겨주는 내용
        dx = -dx
    }
    if( y < 0) {
        //다시 튕겨주는 코드를 작성
        dy = -dy
    }
    if(y > canvas.height) {
        alert("게임 오버!")
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
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function keyDown(e) {
    if(e.keyCode == 39) {
        //오른쪽 버튼을 눌러주는거.
        rightPressed = true;
    } else if(e.keyCode == 37) {
        //왼쪽 버튼을 눌러주는거.
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