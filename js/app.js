
let opendCards = [];
let numOfmoves = 0;
let numOfSuccess = 0;
const numOfPairs = 8;
let newGame = true;
let seconds = 0; minutes = 0;hours = 0;
let counter = document.querySelector(".moves");

let stars = document.querySelectorAll(".stars li");
let restart = document.getElementById("restart");
let timer = document.querySelector(".timer");
let deck = document.querySelector(".deck");
let card = document.querySelectorAll(".card");
let modal = document.getElementById("myModal");
let starsModal = document.querySelectorAll(".stars-modal li");
let timerModal = document.querySelector(".timer-modal");
let restartModal = document.getElementById("restart-modal");
let cards = [...card];


// rearrange table 
rearrange();
// on click on cards udate score and cards
cards.forEach(check);
function check(element) {
    element.addEventListener("click", updateScore);
    element.addEventListener("click", compare);
}
// on click restart, reset everything 
restart.addEventListener("click", reset);
restartModal.addEventListener("click", reset);

function updateScore() {
    //1. start timer
    if (newGame) {
        seconds = 0;
        minutes = 0;
        hours = 0;
        newGame = false;
        startTimer();
    }


    //3. update number of stars
    if (numOfmoves > 16 && numOfmoves < 32) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "hidden";
            }
        }
    }
    if (numOfmoves > 32 && numOfmoves < 48) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "hidden";
            }
        }
    }
}

function reset() {
    //rearrange cards
    modal.style.display = "none";
    rearrange();
    opendCards = [];
    numOfmoves = 0;
    numOfSuccess = 0;
    newGame = true;
    for (i = 0; i < 3; i++) {
        stars[i].style.visibility = "visible";
    }
    //update number of moves
    counter.innerHTML = numOfmoves;
    //stop and clear time
    stopTime();
    cleartTime();

}
// rearrange function to rearrange cards
function rearrange() {
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
}
// update cards status
function compare(event) {
    // 1. if it already selected do nothing
    if (event.target.classList.contains("open") || event.target.classList.contains("match")) {
        return
    }
    //2. make it visibale
    event.target.classList.add("open", "show")
    //3. compare it to prev opend card
    if (opendCards.length > 0) {
        if (event.target.type == opendCards[0].type) {
            opendCards[0].classList.add("match");
            event.target.classList.add("match");
            numOfSuccess++;
            //check for success so we stop if true
            if (numOfSuccess == numOfPairs) {
                stopTime();
                modal.style.display = "block";
                success();
            }
        } else {
            //increase num of moves as this move was wrong
            numOfmoves++;
            counter.innerHTML = numOfmoves;
            // don"t hide the second card  immediately 
            setTimeout(function() {
                event.target.classList.remove("open", "show");
            }, 350);
            opendCards[0].classList.remove("open", "show");
        }
        opendCards = [];
    } else {
        opendCards.push(event.target);
    }

}
function success(){
    if (numOfmoves > 16 && numOfmoves < 32) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                starsModal[i].style.visibility = "hidden";
            }
        }
    }
    if (numOfmoves > 32 && numOfmoves < 48) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                starsModal[i].style.visibility = "hidden";
            }
        }
    }
    timerModal.innerHTML = timer.innerHTML;
    cleartTime() ;
}
// calculating  timer is used with the help from the source https://jsfiddle.net/Daniel_Hug/pvk6p/
function startTimer() {
    t = setTimeout(add, 1000);
}

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    timer.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    startTimer();
}

function stopTime() {
    clearTimeout(t);
}

function cleartTime() {
    timer.innerHTML = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}