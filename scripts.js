let timeLeft = 120
let panicAmount = 0
const timeLeftDisplay = document.querySelector('#timer')
console.log(timeLeftDisplay);
const panicAmountDisplay = document.querySelector('#panic')
console.log(panicAmountDisplay);
var button1 = document.getElementById('first-choice')
var button2 = document.getElementById('second-choice')
var button3 = document.getElementById('third-choice')
var button4 = document.getElementById('fourth-choice')
var restartBtn = document.getElementById('restart-btn')
var againBtn = document.getElementById('try-again-btn')
var avatarBtn = document.getElementById('avatar-btn')
const startBtn = document.getElementById('start-btn')
const musicFast = document.querySelector('fast-music')
const musicNormal = document.querySelector('normal-music')



//Countdown/Timer functions
document.addEventListener('DOMContentLoaded', () => {
const startButton = document.getElementById("start-btn");

startBtn.addEventListener('click', function () {
    countDown();
    countUp();
 })
})
 //timer going down (work in progress)
 function countDown() {
    setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timeLeft = 0)
        }
        timeLeftDisplay.innerHTML = timeLeft
        timeLeft -= 1
    }, 1000)
 }
 // panic timer going up (work in progress)
 function countUp() {
    setInterval(function () {
        if (panicAmount >= 200) {
            clearInterval(panicAmount = 200)
        }
        panicAmountDisplay.innerHTML = panicAmount
        panicAmount += 1
    }, 1000)
 }
// Insult generator (work in progress)
function wrongAnswer(response) {
    var insultURL = "https://evilinsult.com/generate_insult.php?lang=en&type=json"
}


//Name Generator API
function insertName(response) {
    var nameURL = ""
}


//music API (maybe 8bit?)
function normalSpeed (response) {
    var songURL = "" 
}

function fastSpeed (response) {
    var songURL = ""
}

