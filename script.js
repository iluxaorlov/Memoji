'use strict';

let gameStart = false,
    timer = 59,
    previousCard,
    wrongCards,
    interval;

document.getElementById('field').addEventListener('click', function(event) {
    if (event.target.className === 'back') {
        // clicking on a shirt
        if (gameStart === false) {
            // starting game
            gameStart = true;
            // insert emojis in cards
            randomEmojis();

            // starting timer
            interval = setInterval(function() {
                let seconds = String(timer).length === 2 ? timer-- : '0' + timer--;

                document.getElementById('timer').innerHTML = '00:' + seconds;

                if (timer === -1) {
                    lose();
                }
            }, 1000);
        }
        
        open(event.target);
    }

    if (event.target.className === 'front') {
        // clicking on a figure
        close(event.target);
    }

    if (document.getElementsByClassName('green').length === 12) {
        // final of the game
        win();
    }
});

function randomEmojis() {
    let emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐶', '🐱', '🐭', '🐹', '🐰', '🐻'];
    let cards = Array.from(document.getElementsByClassName('front'));

    emojis.sort(() => {
        // randomize emojis array
        return 0.5 - Math.random();
    });

    cards.forEach((card, key) => {
        card.innerHTML = emojis[key];
    });
}

function open(back) {
    // back
    let shirt = back;
    // front
    let figure = shirt.nextElementSibling;

    shirt.style.transform = 'rotateY(180deg)';
    figure.style.transform = 'rotateY(0deg)';

    if (wrongCards) {
        // previous cards are not equal
        for (let card of Array.from(document.getElementsByClassName('red'))) {
            card.classList.remove('red');
            close(card);
        }
    }

    if (previousCard === undefined) {
        // first card
        previousCard = figure;
    } else {
        // second card
        let currentCard = figure;

        if (previousCard.innerHTML === currentCard.innerHTML) {
            previousCard.classList.add('green');
            currentCard.classList.add('green');
        } else {
            previousCard.classList.add('red');
            currentCard.classList.add('red');
            // cards are not equal
            wrongCards = true;
        }

        // clear previous card after actions
        previousCard = undefined;
    }
}

function close(front) {
    // front
    let figure = front;
    // back
    let shirt = figure.previousElementSibling;

    figure.style.transform = 'rotateY(180deg)';
    shirt.style.transform = 'rotateY(0deg)';
    // clear previous card after closing
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
    for (let card of Array.from(document.getElementsByClassName('front'))) {
        card.classList.remove('green');
        card.classList.remove('red');
        card.innerHTML = '';
        close(card);
    }

    // reset everything
    gameStart = false;
    timer = 59;
    previousCard = undefined;
    wrongCards = undefined;
    interval = undefined;
    document.getElementById('timer').innerHTML = '01:00';
    document.getElementById('background').style.visibility = 'hidden';
});