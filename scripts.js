let timeLeft = 120
const timeLeftDisplay = document.querySelector('#timer')
var button1 = document.getElementById('first-choice')
var button2 = document.getElementById('second-choice')
var button3 = document.getElementById('third-choice')
var button4 = document.getElementById('fourth-choice')
var restartBtn = document.getElementById('restart-btn')
var againBtn = document.getElementById('try-again-btn')
var avatarBtn = document.getElementById('avatar-btn')


//Countdown/Timer functions
start-btn.addEventListener('click', function () {
    startGame();
    countDown();
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
function wrongAnswer(response)
var apiURL = "https://evilinsult.com/generate_insult.php?lang=en&type=json"

//Name Generator API

//music API (maybe 8bit?)
