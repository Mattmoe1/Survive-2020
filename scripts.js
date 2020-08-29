let timeLeft = 120
const timeLeftDisplay = document.querySelector('#timer')
var button1 = document.getElementById('first-choice')
var button2 = document.getElementById('second-choice')
var button3 = document.getElementById('third-choice')
var button4 = document.getElementById('fourth-choice')
var restartBtn = document.getElementById('restart-btn')
var againBtn = document.getElementById('try-again-btn')
var avatarBtn = document.getElementById('avatar-btn')
const startBtn = document.getElementById('start-btn')


//Countdown/Timer functions
document.addEventListener('DOMContentLoaded', () => {
const startButton = document.getElementById("start-btn");

startBtn.addEventListener('click', function () {
    countDown();
 })
})
 function countDown() {
    setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timeLeft = 0)
        }
        timeLeftDisplay.innerHTML = timeLeft
        timeLeft -= 1
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

