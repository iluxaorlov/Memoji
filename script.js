'use strict';

let previousCard;
let wrongCard;
let gameStart;
let timer = 59;
let interval;

document.getElementById('field').addEventListener('click', function(event) {
    if (!gameStart) {
        randomEmojis();
        gameStart = true;
        interval = setInterval(function() {
            let seconds = String(timer).length === 2 ? timer-- : '0' + timer--;

            document.getElementById('timer').innerHTML = '00:' + seconds;

            if (timer === -1) {
                lose();
            }
        }, 1000);
    }

    if (event.target.className === 'back') {
        open(event.target);
    }

    if (event.target.className === 'front') {
        close(event.target);
    }

    if (document.getElementsByClassName('green').length === 12) {
        win();
    }
});

function randomEmojis() {
    let emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻'];
    let figures = Array.from(document.getElementsByClassName('front'));
    let numbers = randomNumbersArray().concat(randomNumbersArray());

    figures.forEach(function(item, i) {
        item.innerHTML = emojis[numbers[i]];
    });

    function randomNumbersArray() {
        let numbersArray = [];

        for (let i = 0; i < 6;) {
            let rand = Math.floor(Math.random() * (6 - 0)) + 0;
            if (numbersArray.indexOf(rand) === -1) {
                numbersArray.push(rand);
                i++;
            }
        }

        return numbersArray;
    }
}

function open(card) {
    let figure = card;
    let shirt = card.nextElementSibling;

    figure.style.transform = 'rotateY(180deg)';
    shirt.style.transform = 'rotateY(0deg)';

    if (wrongCard) {
        let cards = Array.from(document.getElementsByClassName('red'));
        
        cards.forEach(function(item) {
            item.classList.remove('red');
            close(item);
        });
    }

    if (!previousCard) {
        previousCard = shirt;
    } else {
        let currentCard = shirt;

        if (previousCard.innerHTML === currentCard.innerHTML) {
            previousCard.classList.add('green');
            currentCard.classList.add('green');
        } else {
            previousCard.classList.add('red');
            currentCard.classList.add('red');
            wrongCard = true;
        }

        previousCard = undefined;
    }
}

function close(card) {
    let figure = card;
    let shirt = card.previousElementSibling;

    figure.style.transform = 'rotateY(180deg)';
    shirt.style.transform = 'rotateY(0deg)';
    previousCard = undefined;
}

function win() {
    document.getElementById('background').style.visibility = 'visible';
    document.getElementById('result').innerHTML = '<span>W</span><span>i</span><span>n</span>'
    document.getElementById('replay').innerHTML = 'Play again';
    clearInterval(interval);
}

function lose() {
    document.getElementById('background').style.visibility = 'visible';
    document.getElementById('result').innerHTML = '<span>L</span><span>o</span><span>s</span><span>e</span>'
    document.getElementById('replay').innerHTML = 'Try again';
    clearInterval(interval);
}

document.getElementById('replay').addEventListener('click', function() {
    let cards = Array.from(document.getElementsByClassName('front'));

    cards.forEach(function(item) {
        document.getElementById('background').style.visibility = 'hidden';
        item.classList.remove('green');
        item.classList.remove('red');
        close(item);
    });

    previousCard = undefined;
    wrongCard = undefined;
    gameStart = undefined;
    timer = 59;
    document.getElementById('timer').innerHTML = '01:00';
});