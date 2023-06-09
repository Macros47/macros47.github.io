//ИГРОВОЕ ПОЛЕ
const modal = document.querySelector('#modal');
let game = document.querySelector('.game'),
result = document.querySelector('.result'),
fields = document.querySelectorAll('.field'),
btnGame = document.querySelector('.newgame'),
step = false,
circle = `<svg class = "circle"> <circle r="45" cx="58" cy="58" stroke-width="10" fill = "none" stroke-linecap="round"/> </svg>`,
cross =  `<svg class = "cross"> <line class = "one" x1="15" y1="15" x2="100" y2="100" stroke-width="10" stroke-linecap="round" /><line class = "two" x1="100" y1="15" x2="15" y2="100" stroke-width="10" stroke-linecap="round" /> </svg>`,
count = 0;
statx = 0;
stato = 0;
statd = 0;
var time1 = "0:00";
var time2 = "0:00";
var time3 = "0:00";
var time4 = "0:00";
var time5 = "0:00";
timeIndex1 = 0;
timeIndex2 = 0;
timeIndex3 = 0;
timeIndex4 = 0;
timeIndex5 = 0;
timerstart = 0;
playerstatus = 0;
let crossWin = new Audio('audio/XWin.mp3');
let circleWin = new Audio('audio/OWin.mp3');
let XOWin = new Audio('audio/XOWin.mp3');

function updateStat() {
    document.getElementById('sX').innerHTML = statx;
    document.getElementById('sO').innerHTML = stato;
    document.getElementById('sD').innerHTML = statd;
    document.getElementById('Time1').innerHTML = time1;
    document.getElementById('Time2').innerHTML = time2;
    document.getElementById('Time3').innerHTML = time3;
    document.getElementById('Time4').innerHTML = time4;
    document.getElementById('Time5').innerHTML = time5;
    document.getElementById('TimeIndex1').innerHTML = timeIndex1;
    document.getElementById('TimeIndex2').innerHTML = timeIndex2;
    document.getElementById('TimeIndex3').innerHTML = timeIndex3;
    document.getElementById('TimeIndex4').innerHTML = timeIndex4;
    document.getElementById('TimeIndex5').innerHTML = timeIndex5;
}

function stepCross(target) {
    if(target.tagName == 'svg' || target.tagName == 'line' || target.tagName == 'circle') {
        return;
    }
    result.innerText = "";
    target.innerHTML = cross;
    target.classList.add('x');
    let crossAudio = new Audio('audio/cross.mp3');
    crossAudio.play();
    count++;
    step = true;
    if (timerstart == 0) {
        timer();
        timerstart++;
    }
    if (playerstatus == 0) {
        PlayerA.innerText = "Сейчас ходит: O"
        playerstatus++;
    }
}

function stepCircle(target) {
    if(target.tagName == 'svg'|| target.tagName == 'line' || target.tagName == 'circle') {
        return;
    }
    result.innerText = "";
    target.innerHTML = circle;
    target.classList.add('o');
    let circleAudio = new Audio('audio/circle.mp3');
    circleAudio.play();
    count++;
    step = false;
    if (timerstart == 0) {
        timer();
        timerstart++;
    }
    if (playerstatus == 1) {
        PlayerA.innerText = "Сейчас ходит: X"
        playerstatus--;
    }
}

function newGame() {
    circleWin.currentTime = 0;
    crossWin.currentTime = 0;
    XOWin.currentTime = 0;
    circleWin.pause();
    crossWin.pause();
    XOWin.pause();
    step = false;
    if (result.innerText == "Ничья")
    {statd++;}
    sec = 0;
    min = 0;
    time5 = time4;
    time4 = time3;
    time3 = time2;
    time2 = time1;
    time1 = p.textContent;
    timeIndex5 = timeIndex4;
    timeIndex4 = timeIndex3;
    timeIndex3 = timeIndex2;
    timeIndex2 = timeIndex1;
    timeIndex1++;
    timerstart = 0;
    PlayerA.innerText = "Сейчас ходит: X"
    playerstatus = 0;


    p.textContent = "0:00";
    updateStat();

    count = 0;
    result.innerText = '';
    fields.forEach(item => {
        item.innerHTML = '';
        item.classList.remove('x', 'o', 'active');
    });
    modal.style.display = 'none';
    game.addEventListener('mouseup', init);
};

function init(e) {
 if (!step) stepCross(e.target);
 else stepCircle(e.target);
 win();
}

function win() {
  let comb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

for (let i = 0; i < comb.length; i++) {
    if (fields[comb[i][0]].classList.contains('x') 
    && fields[comb[i][1]].classList.contains('x')
    && fields[comb[i][2]].classList.contains('x')) {
    setTimeout(() => {
        fields[comb[i][0]].classList.add('active');
        fields[comb[i][1]].classList.add('active');
        fields[comb[i][2]].classList.add('active');
        result.innerText = "Выиграл X";
        crossWin.play();
        statx++;
        clearTimeout(t);
    
    });
    game.removeEventListener('click', init);
    modal.style.display = 'block';
    return;
}

else if (fields[comb[i][0]].classList.contains('o') 
    && fields[comb[i][1]].classList.contains('o')
    && fields[comb[i][2]].classList.contains('o')) {
    setTimeout(() => {
        fields[comb[i][0]].classList.add('active');
        fields[comb[i][1]].classList.add('active');
        fields[comb[i][2]].classList.add('active');
        result.innerText = "Выиграл O";
        circleWin.play();
        stato++;
        clearTimeout(t);
    });
    game.removeEventListener('click', init);
    modal.style.display = 'block';
    return;
}
}
for (let i = 0; i < comb.length; i++) {
if (count == 9) {
    result.innerText = "Ничья";
    game.removeEventListener('click', init);
    modal.style.display = 'block';
    XOWin.play();
    clearTimeout(t);
    return;
}
}
}

btnGame.addEventListener('click', newGame);
game.addEventListener('mouseup', init);


//ТАЙМЕР
p = document.getElementsByTagName('p')[0];
sec = 0;
min = 0;
var t;

function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
}
function add() {
    tick();
    p.textContent = + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

