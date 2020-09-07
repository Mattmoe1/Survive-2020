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
var mySound;
//Countdown/Timer functions
// document.addEventListener('DOMContentLoaded', () => {
// const startButton = document.getElementById("start-btn");

// startButton.addEventListener('click', function () {
//     countDown();
//     countUp();
//  })
// })
 //timer going down (work in progress)
//  function countDown() {
//     setInterval(function () {
//         if (timeLeft <= 0) {
//             clearInterval(timeLeft = 0)
//         }
//         timeLeftDisplay.innerHTML = timeLeft
//         timeLeft -= 1
//     }, 1000)
//  }
 // panic timer going up (work in progress)
 function countUp() {
    setInterval(function () {
        if (panicAmount >= 75) {
            clearInterval(panicAmount = 75)
        }
        panicAmountDisplay.innerHTML = panicAmount
        panicAmount += 1
    }, 75)
 }
 // Restart Button (work in progress)
// document.addEventListener('DOMContentLoaded', () => {
//     const restartBtn = document.getElementById("restart-btn");

// restartBtn.addEventListener('click', function (){
//     restartClock();
//     })
// })
//  function restartClock() {
//      clearInterval(timeLeft, panicAmount);
//      timeLeft = 120;
//      panicAmount = 0;
    //  setInterval(function (){
    //      if (restartBtn)
    //      clearInterval(timeLeft = 120)
    //      if (restartBtn)
    // //      clearInterval(panicAmount = 0)
    //  }
// Insult generator (work in progress)
function wrongAnswer(response) {
    var insultURL = "https://evilinsult.com/generate_insult.php?lang=en&type=json"
}


//Name Generator API
function insertName(response) {
    var nameURL = ""
}


// RICHARD'S CODE//
  function FrankBR() {
        var frankgif = document.createElement("frank");
        frankgif.setAttribute("src","frankwannabepure.gif")
        document.getElementById("main").innerHTML = "You approach the bathroom." + ("</br>") +  "You see a trail of a translucent fluid leading to the door." + ("</br>") +  "It looks like something was dragged there." + ("</br>") +  "You open the door and witness a horrifying sight" + ("</br>") + ("</br>") + ("</br>") + ("<img src='frankwannabepure.gif' />") + ("</br>") + ('<button id="stepback" onclick="StepBack()">Step back slowly and leave...</button>"')
      }

var items = 0;
function GetWater () {
  if (items == 2) { LastItem () 
  } else {
alert("you have obtained water");
items++;
console.log(items);
document.getElementById('waterItem').style.visibility = 'hidden';
}
}
function GetToiletPaper () {
  if (items == 2) { LastItem () 
  } else {
  alert("you have obtained toilet paper");
  items++;
console.log(items);
document.getElementById('toiletItem').style.visibility = 'hidden';
}
}
function GetSanitizer () {
  if (items == 2) { LastItem () 
  } else {
  alert("you have obtained hand sanitizer");
  items++;
  console.log(items);
  document.getElementById('sanitizerItem').style.visibility = 'hidden';
}
}

function StayHome() {
document.getElementById("main").innerHTML = document.getElementById("winner").innerHTML
mySound = new sound ("sounds/typing_keyboard.ogg")
}

//GO TO FREAKOUT ENDING//
function FreakOut() {
document.getElementById("main").innerHTML = document.getElementById("freakout").innerHTML
mySound = new sound ("sounds/human_group_cry_out.ogg")
}

//REFRESH PAGE / RESET ALL //
function Restart() {
document.body.innerHTML = document.getElementById("main").innerHTML
}

// END OF RICHARD'S CODE

//KYLE's CODE//
//array of objects that will refer to the options.
var questions = [
    {
        title: "You wake up. You're groggy, as though you had a vivid dream but you can't quite remember what it was about.You grab your phone and begin flipping through the news. The first article blares in all caps 'BREAKING NEWS!' followed by: 'This just in! The COVID-19 virus has just been officially declared a pandemic by the United States. People are advised to stay home. Do not panic. Wash your hands thoroughly and maintain a minimum of 6ft distance from others. People are advised to avoid crowded public areas due to risk of infection. Again, do not panic.'",
        choices: ["Freak out", "Stay home", "Get supplies"],
        answer: "Stay home"
    },
    {
        title: "",
        choices: ["Start Over"],
        answer: "Start Over"
    }
]

var currentIndex = 0;

//function that displays the narrative/question
function displayQuestion(){
var h2 = $("<h2>").text("question:" + questions[currentIndex].title)
console.log("question:" + questions[currentIndex].title)
$(".question-container").append(h2);

btnOptions();

}

//function that generates the options in the object array
function btnOptions() {
    $("#choice-screen")
    questions[currentIndex].choices.forEach(function(choice, i){
        var btn =  $("<button>").text(choice);
        btn.attr("value", choice);
        btn.addClass("choice");

    $(".question-container").append(btn);
})
}
//function that runs the next feature
function nextBtn () {
}
