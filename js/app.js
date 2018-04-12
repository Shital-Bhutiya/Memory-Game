// declare a blank arryafor temporary storage of clicked cards
let clickedCards = [];

// declare a variable for star icon
let rating = document.getElementsByClassName("fa-star");

//create a varriable that count moves
let counter = document.querySelector('.moves');
let movesCounter = 0;

// temporary verriable for time.
let time = 0;
// select restart button
const restart = document.querySelector('.restart');


// create hour,minute, second with a new element that will display time.
const scroll = document.querySelector('.score-panel');
let clock = document.createElement('span');
scroll.appendChild(clock);
let h = 0,
    m = 0,
    s = 0,
    interval;

// create an arry that hold our whole cards.
const card = document.getElementsByClassName("card");
let cards = [];
for (let j = 0; j < card.length; j++) {
    cards[j] = card[j];
}


// select deck of cards.
const deck = document.querySelector(".deck");

// set restart and reload event.
restart.addEventListener('click', reload);
window.addEventListener('load', reload);

// add an event listener to deck 
deck.addEventListener("click", function (event) {

    // start timer on frist click only.
    if (time == 0) {
        timer();
        time = 1;
    }
    // check that selected item must be an li element, it has no show open or match class, and we can only click two cards at a time.
    if ((event.target.tagName) == 'LI' && (!event.target.classList.contains('show', 'open')) && (clickedCards.length < 2) && (!event.target.classList.contains('match'))) {
        // call showcards and pass that card which was clicked.
        showCards(event.target);
    }
});

function showCards(element) {

    // push that element into our blank array
    clickedCards.push(element);

    // add show open class with rotate animation.
    element.classList.add('show', 'open', 'rotate');

    // again chhek if the length of our temporary array is two then chek both element and increse move.
    if (clickedCards.length == 2) {
        cardCheking();
        moves();
    }
}


function cardCheking() {

    // select the icons from li.
    var fristIcon = clickedCards[0].querySelector('i');
    var secondIcon = clickedCards[1].querySelector('i');

    // set tiemout function and chek the classlist of both icon.
    setTimeout(function () {
        if ((fristIcon.classList.value === secondIcon.classList.value)) {
            // if it is equal then call eql().
            eql();

            // remove element for next round.
            clickedCards.splice(0, clickedCards.length);

            // call wiinner for cheking.
            winner();

        } else {
            // if it is not equal then call not_eql().
            not_eql();
        }
    }, 800);
}

// remove show open and rotate class from selected card and add match and rubberband animation.
function eql() {
    clickedCards[0].classList.remove('show', 'open', 'rotate');
    clickedCards[1].classList.remove('show', 'open', 'rotate');
    clickedCards[0].classList.add('rubberBand', 'match');
    clickedCards[1].classList.add('rubberBand', 'match');
}

//add wobble animation and sett a timeout function to flip that unmatched card.
function not_eql() {
    clickedCards[0].classList.add('wobble');
    clickedCards[1].classList.add('wobble');

    setTimeout(function () {
        // remove show open class to turn back and remove animations for next click.
        clickedCards[0].classList.remove('wobble', 'show', 'open', 'rotate');
        clickedCards[1].classList.remove('wobble', 'show', 'open', 'rotate');
        // remove element for next round.
        clickedCards.splice(0, clickedCards.length);
    }, 1000);
}


// Increse moves as user click.
function moves() {
    movesCounter++;
    //check for plurization
    let moveText = document.querySelector('.moveText');
    moveText.textContent = movesCounter === 1 ? 'Move' : 'Moves';

    // set the moves 
    counter.textContent = movesCounter;

    // remove stars as moves increase.
    if (movesCounter % 8 == 0 && rating.length > 1) {
        rating[rating.length - 1].remove();
    }
}

function reload() {

    // reset stars
    let totalrates = document.querySelector(".stars");
    totalrates.innerHTML = "";
    totalrates.innerHTML = '<li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li>';

    // reset moves
    movesCounter = 0;
    counter.textContent = movesCounter;

    // remove element from clikedcards array if any.
    clickedCards.splice(0, clickedCards.length);

    // remove congratulation box if there is.
    if (document.querySelector('div.congo1')) {
        const div = document.querySelector('div.congo1');
        div.remove();
    }

    // reset the timer.
    if (interval) {
        resetTimer();
    }
    // shuffle the cards in deck. and remove all classes.
    cards = shuffle(cards);
    deck.innerHTML = "";
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('open', 'show', 'match', 'rubberBand', 'wobble', 'rotate');
        deck.appendChild(cards[i]);
    }
}


// set timer using setinterval.
function timer() {
    // start interval 
    interval = setInterval(function () {
        // increse seconds after each 1 second
        s++;
        // set minutes
        if (s == 60) {
            m++;
            s = 0;
        }
        // set hours.
        if (m == 60) {
            h++;
            m = 0;
        }
        // display time.
        clock.innerHTML = ", Time = " + h + " : " + m + " : " + s;;
    }, 1000);

}

// reset the timer by reseting interval, second, minute, hour and time.
function resetTimer() {
    clearInterval(interval);
    h = m = s = 0;
    clock.innerHTML = "";
    time = 0;
}


function winner() {

    // slelct all cards who turned green(matched).
    const matchCards = document.querySelectorAll(".match");

    // check whole cards turned to green(match).
    if (matchCards.length == cards.length) {

        // for hiding the body and to display fireworks.
        const congo = document.createElement("div");
        congo.setAttribute('class', 'congo1');

        // Actual congratulation popup
        const div = document.createElement("div");
        div.setAttribute('class', 'congo');

        // for winning animation
        div.classList.add('lightSpeedIn');

        //create a button that allows to  play again.
        const playagain = document.createElement("button");
        playagain.textContent = "Play Again";
        playagain.setAttribute('class', 'playagain');
        playagain.addEventListener('click', reload);

        // for plurization.
        const stars = rating.length == 1 ? 'Star' : 'Stars';

        // Display message.
        div.innerHTML = "<h1>Congratulations</h1> <h2>you win with " + movesCounter + " Moves, " + rating.length + " " + stars + clock.textContent + "</h2><h4>Wooooooo! </h4>";

        // add button
        div.appendChild(playagain);

        // add popup to that element which hide the body.
        congo.appendChild(div);

        // add whole element to body.
        document.body.appendChild(congo);

    }

}


// for shuffle cards.
function shuffle(array) {
    var currentIndefristIcon = array.length,
        temporaryValue, randomIndefristIcon;

    while (currentIndefristIcon !== 0) {
        randomIndefristIcon = Math.floor(Math.random() * currentIndefristIcon);
        currentIndefristIcon -= 1;
        temporaryValue = array[currentIndefristIcon];
        array[currentIndefristIcon] = array[randomIndefristIcon];
        array[randomIndefristIcon] = temporaryValue;
    }

    return array;
}