// Challenge 1: Your Age in Days
function ageInDays() {
  var birthYear = prompt("What year were you born... Good friend?");
  var ageInDays = (2018 - birthYear) * 365;
  var h1 = document.createElement('H1');
  var textAnswer = document.createTextNode('You are ' + ageInDays.toString() + ' days old.');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
  document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
function generateCat() {
  var catDiv = document.createElement('div');
  catDiv.innerHTML = "<img class='cat-image' src='http://thecatapi.com/api/images/get?format=src&type=gif&size=small'>"
  document.getElementById('flex-cat-gen').appendChild(catDiv);
}


// Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  results = decideWinner(humanChoice, botChoice);
  message = finalMessage(results)
  rpsFrontEnd(yourChoice.id, botChoice, message);
  // alert(message + '\n---------------------------\n\nYou: ' + humanChoice + '\nBot: ' + botChoice + '\nYour Score: ' + humanScore + '\nBot Score: ' + botScore);
}

/**
 * Returns either 0, 1 or 2
 */
function randToRpsInt() {
  return Math.floor(Math.random() * 3)
}

/**
 * Takes in a integer and returns the choice as a string.
 * @param {int} number - Numbers 0-2
 */
function numberToChoice(number) {
  return ['rock', 'paper', 'scissors'][number]
}

/**
 * Takes in your choice & computer's choice as strings and returns
 * the scores as an array.
 * @param {string} yourChoice
 * @param {string} computerChoice
 */
function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
    'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
  }

  var yourScore = rpsDatabase[yourChoice][computerChoice]
  var computerScore = rpsDatabase[computerChoice][yourChoice]

  return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]){
  if (yourScore === 0) {
    return {'message': 'You lost!', 'color': 'red'}
  } else if (yourScore == 0.5) {
    return {'message': 'You tied!', 'color': 'yellow'}
  } else {
    return {'message': 'You won!', 'color': 'green'}
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var items = ['rock', 'paper', 'scissors'];

  var imagesDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  };

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
  messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//Challenge 4. Change the color of all buttons.
var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);


//Main funtion
function buttonColorChange(buttonThingy) {
  if(buttonThingy.value === 'red') {
    buttonsRed();
  } else if (buttonThingy.value === 'green') {
    buttonsGreen();
  } else if (buttonThingy.value === 'reset') {
    buttonColorReset();
  } else if (buttonThingy.value === 'random') {
    randomColors();
  }
}

//Breaking up the main function, maiking its functions.
function buttonsRed(){
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonsGreen(){
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  var allButtons = document.getElementsByTagName('button');

  var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

  for (i = 0; i < allButtons.length; i++) {
    var randomNumber = Math.floor(Math.random() * 4);
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(choices[randomNumber]);
  }
}


// Challenge 5 BlackJack


let blackjackGame = {
  'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
  'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A'],
  'cardsMap': {'2': 2, '3': 3, '4': 3, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10 , 'A': [1, 11], 'Q': 10},
  'wins' : 0,
  'losses' : 0,
  'draws' : 0,
  'isStand': false,
  'turnsOver': false,
};

const DEALER = blackjackGame['dealer']
const YOU = blackjackGame['you']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
  // showCard(DEALER);
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 12);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    //alert('hey!');
  }
}

function blackjackDeal() {
  //let winner = computeWinner();
  //showResult(winner);
  if (blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false;

    //showResult(computeWinner());
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

     //console.log('yourImages');
    //yourImages[0].remove();
    for (i=0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (i=0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = true;
  }
}

function updateScore(card, activePlayer) {
  if (card === 'A') {
  // if adding 11 keeps me below 21, add 11, else add 1
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsmap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }

  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}


function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
    //showResult(computeWinner());
  }

  //if (DEALER['score'] > 15) {
  blackjackGame['turnsOver'] = true;
  let winner = computeWinner();
  showResult(winner);
    //console.log(blackjackGame['turnsOver']);
}

// compute winner and return just won
//update the win dras and losses
function computeWinner() {
  let winner;

  if (YOU['score'] <= 21) {
    // condition higher score than dealer or when dealer busts but you are 2
    if (YOU['score'] < DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackGame['wins']++;
      console.log('You won!');
      winner = YOU;

    } else if (YOU['score'] < DEALER['score']) {
      console.log('You lost!');
      blackjackGame['losses']++;
      winner = DEALER;

    } else if (YOU['score'] === DEALER['score']) {
      console.log('You drew');
      blackjackGame['draws']++;
    } else if (YOU['score'] <= 21 && YOU['score'] > DEALER['score']) {
      blackjackGame['win']++;
      winner = YOU;
    }
  //condition when user busts but dealer doesnt
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
   console.log('You lost');
   blackjackGame['losses']++;
   winner = DEALER;

   //condition when you And dealer busts
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    console.log('You drew!');
    blackjackGame['draws']++;
  }

  console.log(blackjackGame);
  console.log('Winner is', winner);
  return winner;
}



function showResult(winner) {
  let message, messageColor;

  if (blackjackGame['turnsOver'] === true) {


    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = 'You won!';
      messageColor = 'green';
      winSound.play();

    } else if (winner === DEALER){
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You lost';
      messageColor = 'red';
      lossSound.play();

    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You drew!';
      messageColor = 'black';
    }


    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}
