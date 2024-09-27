function delay(ms){
    return new Promise( resolve => {
        setTimeout(()=> {resolve('')},ms);
    })
}


let bot = document.querySelector('.bot');
let target = document.querySelector('.target');
let botSt = document.querySelector('.bot-st');
let tarSt = document.querySelector('.tar-st');
let conSt = document.querySelector('.con-st');
let catchSt = document.querySelector('.catch-st');
let gameoverBoard = document.querySelector('.gameover-board');
let playAgainBtn = document.querySelector('.play-again');
let endScore = document.querySelector('.score-text');
let highScoreText = document.querySelector('.high-score');


/* botSt.style.color = 'blue';
tarSt.style.color = 'red';
conSt.style.color = 'green';
catchSt.style.color = 'purple'; */


// Initaialization for the begining

gameoverBoard.style.visibility ='hidden';

let botX = 10;
let botY = getRect(document.body).height/2 - getRect(bot).height/2;
let count = 0;
let score = 0;
let multiplier = 1;
catchSt.textContent = `Catches : ${count}`;

let direction = "right";
let speed = 6;

let highScore = 0;

let bT,bR,bB,bL,bText,bw,bh;
let tT,tR,tB,tL,tText;

let windowWidth = getRect(document.body).width;
let windowHeight = getRect(document.body).height;

let passForNextBubble = true;

highScoreText.textContent = `High Score : ${highScore}`;

// Game run Functions

if(passForNextBubble)targetRandomPosition();
setInterval(moving,10);



// Function Declartion

function moving(){
    
    bT = getRect(bot).top;
    bR = getRect(bot).right;
    bB = getRect(bot).bottom;
    bL = getRect(bot).left;
    bw = getRect(bot).width;
    bh = getRect(bot).width;
    bText = `Bot => t : ${bT} b : ${bB} r : ${bR}  l : ${bL}`;

    windowWidth = getRect(document.body).width;
    windowHeight = getRect(document.body).height;
    
    // up , left , right , down
    if(direction == "up") botY = reduce(botY,speed);
    else if(direction == "down") botY = add(botY,speed,windowHeight,windowWidth);
    else if(direction == "right") botX = add(botX,speed,windowHeight,windowWidth);
    else if(direction == "left") botX = reduce(botX,speed);

    botSt.textContent = bText;
    conSt.textContent = `windowHeight : ${windowHeight} windowWidth : ${windowWidth}`;
    
    bot.style.top = `${botY}px`;
    bot.style.left = `${botX}px`;

    bubbleAteCheck();
    
}
 

function getRect(el){
    let tempRec = el.getBoundingClientRect();
    return {
        top: tempRec.top,
        right: tempRec.right,
        bottom: tempRec.bottom,
        left: tempRec.left,
        width: tempRec.width,
        height: tempRec.height,
    }
}


function add(val,speed,windowHeight,windowWidth){
    console.log();
    for(let i=0;i<speed;i++){
        if(((val+bh) >= windowHeight && direction=="down") || ((val+bw) >= windowWidth && direction == "right")) gameOver();
        else val += 1;
    }
    return val;
}


function reduce(val,speed){
    console.log();
    if(direction == "up") bh = 0;
    if(direction == "left") bw = 0;
    for(let i=0;i<speed;i++){
        if((val+bh) <= 0 || (val+bw) <= 0) gameOver();
        else val -= 1;
    }
    return val;
}


function targetRandomPosition(){
    windowWidth = getRect(document.body).width;
    windowHeight = getRect(document.body).height;

    let targetWidth = getRect(target).width;
    let targetHeight = getRect(target).height;

    let randomX = Math.floor(Math.random()*(windowWidth-targetWidth));
    let randomY = Math.floor(Math.random()*(windowHeight-targetHeight));

    
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;

    tT = getRect(target).top;
    tR = getRect(target).right;
    tB = getRect(target).bottom;
    tL = getRect(target).left;
    tText = `Tar => b : ${tB} t : ${tT}  l : ${tL} r : ${tR}`;

    tarSt.textContent = tText;

    passForNextBubble = false;
}


document.addEventListener('keydown',(e)=>{
    if(e.key =="ArrowUp")direction = "up";
    if(e.key =="ArrowRight")direction = "right";
    if(e.key =="ArrowLeft")direction = "left";
    if(e.key =="ArrowDown")direction = "down";
    if(e.key =="a")speed += 1;
    if(e.key =="z" && speed-1 >= 0)speed -= 1;
    if(e.key ==" ") newGame();
})


function bubbleAteCheck(){
    // Horizontal Range   tl --- tR
    // Vertical Range   tT --- tB

    // check bot corners
    if(tL<=bR && bR<=tR){
        if((tT<=bT && bT<=tB) || (tT<=bB && bB<=tB))passForNextBubble = true;
    }
    else if(tL<=bL && bL<=tR){
        if((tT<=bT && bT<=tB) || (tT<=bB && bB<=tB))passForNextBubble = true;
    }

    if(passForNextBubble){
        addCount();
        targetRandomPosition();
    }

}

function addCount(){
    count += 1;
    catchSt.textContent = `Catches : ${count}`;
    score = score + (100*multiplier);
    //set speed 
    let tempVal = 5*multiplier;
    if(tempVal == count){
        multiplier += 1;
        speed +=1;
    }
}


function gameOver(){
    speed = 0;
    direction = "none";
    gameoverBoard.style.visibility ='visible';

    if(score>highScore){
        highScore = score;
        endScore.textContent = `High Score : ${score}`
    }
    else{
        endScore.textContent = `Score : ${score}`
    }
}

function newGame(){
    gameoverBoard.style.visibility ='hidden';

    botX = 10;
    botY = getRect(document.body).height/2 - getRect(bot).height/2;
    count = 0;
    score = 0;
    multiplier = 1;
    catchSt.textContent = `Catches : ${count}`;

    direction = "right";
    speed = 6;

    passForNextBubble = true;

    highScoreText.textContent = `High Score : ${highScore}`;
    targetRandomPosition();
}

playAgainBtn.addEventListener('click',(e)=>{newGame()})

//---------^^^----------

console.log(1);