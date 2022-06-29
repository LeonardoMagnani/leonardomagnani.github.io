const moscaImg = document.createElement('img');
const startbutton = document.getElementById('startbutton');
let points = 0;
let vidas = 3;
let hearts = 3;
let gameOver = 0;
let dificulty;

moscaImg.src = './src/img/mosca.png';
moscaImg.classList.add('mosca-img');
moscaImg.style.position = 'absolute';
moscaImg.style.cursor = ' url(./src/img/mata_mosca.png), auto';
document.body.appendChild(moscaImg);
moscaImg.style.visibility = 'hidden';

function gerarMoscas () {
    dificulty = document.getElementById('dificulty-select').value;
    if (dificulty == '') return alert('Selecione uma dificuldade para iniciar');
    moscaImg.style.visibility = 'visible';
    startbutton.style.visibility = 'hidden';
    document.getElementById('game-img').style.display = 'none';
    document.getElementById('gameover-img').style.display = 'none';
    document.getElementById('vitoria').style.display = 'none';
    document.getElementById('dificulty-select').style.display = 'none';
    document.getElementById('vida-1').src = './src/img/coracao_cheio.png';
    document.getElementById('vida-2').src = './src/img/coracao_cheio.png';
    document.getElementById('vida-3').src = './src/img/coracao_cheio.png';
    bugPosition();
    timeOutAndCounter();
}

function bugPosition () {
    let bugLeft = Math.floor(Math.random() * window.innerWidth);
    while (bugLeft <= 50) {
        bugLeft = Math.floor(Math.random() * 80);
    }
    let bugTop = Math.floor(Math.random() * window.innerHeight);
    while (bugTop <= 50) {
        bugTop = Math.floor(Math.random() * 80);
    }
    let bugSize = Math.floor(Math.random() * 80);
    while (bugSize <= 40) {
        bugSize = Math.floor(Math.random() * 80);
    }
    moscaImg.style.width = `${bugSize}px`;
    moscaImg.style.top = `${bugTop - 80}px`;
    moscaImg.style.left =  `${bugLeft - 80}px`;
    lifeOver();
}

function bugClicked () {
    points++;
    vidas++;
    if (points >= 5) {
        document.getElementById('vitoria').style.display = 'inline';
        document.getElementById('dificulty-select').style.display = 'inline';
        moscaImg.style.visibility = 'hidden';
        startbutton.style.visibility = 'visible';
        return;
    }
    
}

startbutton.addEventListener('click', gerarMoscas);
moscaImg.addEventListener('click', bugClicked);



function timeOutAndCounter () {
    let seconds = 30;
    const bugInterval = setInterval (bugPosition, dificulty);
    const timeOutBug = setTimeout (
        function () {
            alert('Game over, the bug wins!');
            moscaImg.style.visibility = 'hidden';
            startbutton.style.visibility = 'visible';
            document.getElementById('gameover-img').style.display = 'inline';
            document.getElementById('dificulty-select').style.display = 'inline';
            clearInterval(bugInterval);
    }, seconds * 1000);

    const intervalBug = setInterval (
        function () {
            if (seconds > 0) {
                seconds--;
                document.getElementById('time-count').innerHTML = seconds;
            } else {
                console.log('Game over, the bug wins.');
                document.getElementById('gameover-img').style.display = 'inline';
                document.getElementById('dificulty-select').style.display = 'inline';
                clearInterval(intervalBug);
                return seconds = 30;
            }

            if (points >= 5) {
                points = 0;
                clearInterval(bugInterval);
                clearInterval(intervalBug);
                clearTimeout(timeOutBug);
                document.getElementById('time-count').innerHTML = 30;
                seconds = 30;
                vidas = 3;
                hearts = 3;
                return;
            }

            if (gameOver === 1) {
                points = 0;
                clearInterval(bugInterval);
                clearInterval(intervalBug);
                clearTimeout(timeOutBug);
                document.getElementById('time-count').innerHTML = 30;
                gameOver = 0;
                seconds = 30;
                vidas = 3;
                hearts = 3;
                return;
            }
            
    }, 1000)
}

function lifeOver () {
    vidas--;
    if (vidas >= 0) { 
    } else {
        console.log('Perde vida');
        if (hearts > 1) {
            vidas = 3;
            hearts--;
            console.log(hearts);
            switch (hearts) {
                case 2:
                    document.getElementById('vida-3').src = './src/img/coracao_vazio.png';
                break;
                case 1:
                    document.getElementById('vida-2').src = './src/img/coracao_vazio.png';
                break;
                case 0:
                    document.getElementById('vida-1').src = './src/img/coracao_vazio.png';
                break;
            }
        } else {
            document.getElementById('vida-1').src = './src/img/coracao_vazio.png'
            moscaImg.style.visibility = 'hidden';
            startbutton.style.visibility = 'visible';
            gameOver = 1;
            document.getElementById('gameover-img').style.display = 'inline';
            document.getElementById('dificulty-select').style.display = 'inline';
            return console.log('Perdeu o jogo');
        }
    }
    
}