// challenge 1: your age in days

function ageinDays() {


    var birthday = prompt("What year you were born.... Good friend?");
    var ageIndays = (2022 - birthday) * 365;
    console.log(ageIndays);

    var h1 = document.createElement('h1');
    var textanswer = document.createTextNode("You are " + ageIndays + ' days old');
    h1.setAttribute('id', 'ageIndays');
    h1.appendChild(textanswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset() {
    document.getElementById('ageIndays').remove();
}

function Generate() {
    var img = document.createElement("img");
    var cat_result = document.getElementById("cat_result");
    img.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    cat_result.appendChild(img);
}

//challage 3: rps game

document.querySelector('#play-again').addEventListener('click', playAgain);

function playAgain(){
    window.location.reload();
}


function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    console.log(humanChoice);
    var rps = ["rock", "paper", "scissors"];
    var botChoice = rps[Math.floor(Math.random() * rps.length)];
    console.log(botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    messages = finalMessage(results); //you won!
    console.log(messages);
    rpsFrontend(humanChoice, botChoice, messages);

}

function rpsFrontend(HumanChoice, BotChoice, messages) {
    console.log(HumanChoice);
    var imgdatabase = {
        "rock": document.getElementById('rock').src,
        "paper": document.getElementById('paper').src,
        "scissors": document.getElementById('scissors').src,
    }
    // remove elelments
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humdiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var messagediv = document.createElement('div');

    humdiv.innerHTML = "<img src = '" + imgdatabase[HumanChoice] + "' style = 'width = 200px; '>";
    messagediv.innerHTML = "<h1  style='color:" + messages['color'] + "; font-size:60px; padding : 30px; ' >" + messages['message'] + "</h1>";
    botdiv.innerHTML = "<img src = '" + imgdatabase[BotChoice] + "' style = ' width = 200px; ' >";

    document.getElementById('flex-box-game-result').appendChild(humdiv);
    document.getElementById('flex-box-game-result').appendChild(messagediv);
    document.getElementById('flex-box-game-result').appendChild(botdiv);
}

function finalMessage(results) {
    console.log(results);
    if (results[0] === 0.5) {
        return { 'message': 'Draw!', 'color': 'yellow' };
    }
    else if (results[0] === 1) {
        return { 'message': 'You Win!!!!!', 'color': 'Green' };
    }
    else {
        return { 'message': 'You Loss!', 'color': 'red' };
    }
}

function decideWinner(Hch, Bch) {
    rpsdatabse = {
        "rock": {
            "scissors": 1,
            "rock": 0.5,
            "paper": 0,
        },
        "paper": {
            "rock": 1,
            "paper": 0.5,
            "scissors": 0,
        },
        "scissors": {
            "paper": 1,
            "scissors": 0.5,
            "rock": 0,
        },
    }
    var yourScore = rpsdatabse[Hch][Bch];
    var computerScore = rpsdatabse[Bch][Hch];

    return [yourScore, computerScore];


}

//challage 4: change the color of all buttons

var all_butttons = document.getElementsByTagName('button');
var copyalbuttons = [];
for (let i = 0; i < all_butttons.length; i++) {
    copyalbuttons.push(all_butttons[i].classList[1]);
}
console.log(copyalbuttons);

function buttoncolorchange(buttonThingy) {
    if (buttonThingy.value == 'red') {
        buttonRED();
    }
    else if (buttonThingy.value == 'green') {
        buttonGreen();
    }
    else if (buttonThingy.value == 'reset') {
        buttonReset();
    }
    else if (buttonThingy.value == 'random') {
        randomColor();
    }
}
function buttonRED() {
    for (let i = 0; i < all_butttons.length; i++) {
        all_butttons[i].classList.remove(all_butttons[i].classList[1]);
        all_butttons[i].classList.add('btn-danger');
    }
}
function buttonGreen() {
    for (let i = 0; i < all_butttons.length; i++) {
        all_butttons[i].classList.remove(all_butttons[i].classList[1]);
        all_butttons[i].classList.add('btn-success');
    }
}
function buttonReset() {
    for (let i = 0; i < all_butttons.length; i++) {
        all_butttons[i].classList.remove(all_butttons[i].classList[1]);
        all_butttons[i].classList.add(copyalbuttons[i]);
    }
}
function randomColor() {
    for (let i = 0; i < all_butttons.length; i++) {
        all_butttons[i].classList.remove(all_butttons[i].classList[1]);
        all_butttons[i].classList.add(copyalbuttons[Math.floor(Math.random() * copyalbuttons.length)]);
    }
}

// BlackJack

let blackjackGame = {
    'you': { 'scorespan': '#your-balckjack-score', 'div': '#your-box', 'score': 0 },
    'bot': { 'scorespan': '#bot-balckjack-score', 'div': '#bot-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}

const YOU = blackjackGame['you'];
const BOT = blackjackGame['bot'];
const hitsound = new Audio("static/sound/swish.m4a");
const losssound = new Audio("static/sound/aww.mp3");
const winsound = new Audio("static/sound/cash.mp3");

document.querySelector('#black-jack-hit-btn').addEventListener('click', BlackJackHit);

document.querySelector('#black-jack-stand-btn').addEventListener('click', botLogic);

document.querySelector('#black-jack-deal-btn').addEventListener('click', BlackjackDeal);

function BlackJackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        console.log(card);
        showcard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }
}


function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showcard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `/static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitsound.play();
    }
}

function BlackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let botImages = document.querySelector('#bot-box').querySelectorAll('img');

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < botImages.length; i++) {
            botImages[i].remove();
        }
        YOU['score'] = 0;
        BOT['score'] = 0;
        document.querySelector("#your-balckjack-score").textContent = 0;
        document.querySelector("#bot-balckjack-score").textContent = 0;
        document.querySelector("#your-balckjack-score").style.color = 'aliceblue';
        document.querySelector("#bot-balckjack-score").style.color = 'aliceblue';
        document.querySelector("#blackjack-result").textContent = "Lets Play!";
        document.querySelector("#blackjack-result").style.color = "black";
        blackjackGame['turnsOver'] = false;
        blackjackGame['isStand'] = false;
    }
}

function updateScore(card, activePlayer) {
    // if adding 11 keeps me below 21, add 11. Otherwise, add 1
    if (card == 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scorespan']).textContent = "BUST!";
        document.querySelector(activePlayer['scorespan']).style.color = "red";
    } else {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
}

async function botLogic() {
    blackjackGame['isStand'] = true;
    while (BOT['score'] < 16 && blackjackGame['isStand'] === true) {

        let card = randomCard();
        showcard(card, BOT);
        updateScore(card, BOT);
        showScore(BOT);
        await sleep(1000);
    }
    if (BOT['score'] > 15) {
        let winner = computeWinner();
        showresult(winner);

    }
    blackjackGame['turnsOver'] = true;
}

// compute winner and return winner

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > BOT['score'] || BOT['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < BOT['score']) {
            blackjackGame['losses']++;
            winner = BOT;
        }
    } else if (YOU['score'] === BOT['score']) {
        blackjackGame['draws']++;
        winner = "none";
    } else if (YOU['score'] > 21 && BOT['score'] <= 21) {
        blackjackGame['losses']++;
        winner = BOT;
    } else if (YOU['score'] > 21 && BOT['score'] > 21) {
        blackjackGame['draws']++;
        winner = "none";
    }
    console.log("Wins", blackjackGame['wins']);
    console.log("loss", blackjackGame['losses']);
    console.log("draws", blackjackGame['draws']);
    return winner;
}

function showresult(winner) {
    let message, messageColor;
    blackjackGame['turnsOver'] = true;
    if (winner === YOU) {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = "You Won!";
        messageColor = "green";
        winsound.play();
    } else if (winner === BOT) {
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = "You Loss!";
        messageColor = "red";
        losssound.play();
    } else {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = "Draw!";
        messageColor = "black";
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
}