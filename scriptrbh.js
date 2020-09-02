//replace div id with a different div id//


function FrankBR() {
    var frankgif = document.createElement("frank");
    frankgif.setAttribute("src","frankwannabepure.gif")
    document.getElementById("main").innerHTML = "You approach the bathroom." + ("</br>") +  "You see a trail of a translucent fluid leading to the door." + ("</br>") +  "It looks like something was dragged there." + ("</br>") +  "You open the door and withness a horrifying sight" + ("</br>") + ("</br>") + ("</br>") + ("<img src='frankwannabepure.gif' />") + ('<button id="stepback" onclick="StepBack()">Step back slowly and leave...</button>"')
  }

function StayHome() {
document.getElementById("main").innerHTML = document.getElementById("winner").innerHTML
}

function FreakOut() {
document.getElementById("main").innerHTML = document.getElementById("freakout").innerHTML
}

//resets the webpage
function Restart() {
document.body.innerHTML = document.getElementById("main").innerHTML
}

function StepBack () {
document.body.innerHTML = '<button id="pure" onclick="FrankBR()">GO TO THE BATHROOM</button> <button id="restart" onclick="window.location.reload()">RESTART THE GAME<div id="stepbackcss"></button><div class="mainS-3"> <div class="container hide has-text-centered" id="slide-3"> <h1 class="title"></h1> <div class="card"> <div class="card-image"> <figure class="image"> <img src="" alt="" id="avatar"> </figure> </div> <div class="card-footer"> <iframe src="https://giphy.com/embed/xAvVf0nXCvLz2" width="500" height="300" style="display: in-line-box" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><a href="https://giphy.com/gifs/happy-black-friday-xAvVf0nXCvLz2"></a></p> <div class="bad-ending hide has-text-centered"> </br> <div class="prompt"> <h3> You make it safe and sound and head to the center of the store.  All around you are hordes of people frantically trying to grab supplies.  You think about </h3> </div>  </br> </div> <div  lass="choice-screen hide has-text-centered"> <h1></h1> <div class="choices"> <h1></h1> <div class="question" id="grab item">You have [INSERT NUMBEROFITEMS FUNCTION()] items out of 3.  What do you do next?</div> <button class="first-choice" id="waterItem" onclick="GetWater()">Get Water</button> <button class="second-choice" id="toiletItem" onclick="GetToiletPaper()">Get Toilet Paper</button> <button class="third-choice" id="sanitizerItem" onclick="GetSanitizer()">Get Hand Sanitizer</button> </div> </div> </div> </div> </div> </div></div>' 
}

function getWater () {
  var gW = 1;
  var getWater = document.getElementById("waterItem");
  getWater.style.visibility = "hidden" ;
}
// </div> <!-- next slide --> <div class="container hide as-text-centered" id="slide-4"> <h1 class="title">Grab 2nd item</h1> <div class="card"> <div class="card-image"> <figure class="image"> <img src="" alt="" id="avatar"> </figure> </div> <div class="card-footer"> </div> </div> </div> <img src="https://foreignpolicy.com/wp-content/uploads/2020/04/zombie-coronavirus-shaun-of-the-dead-rogue-pictures-1.jpg?w=800&h=533&quality=90" id="slide1" style="width:20%;height:20%"> <div class="bad-ending hide has-text-centered"> <div class="prompt"> <h1> You have gathered your first item.  Now you go to the next most important item:</h1> </div> <!-- Dynamically change text? Need <span> if yes --> <!-- If we add stats to show, they should appear in a separate div here --> <button class="restart-btn">Restart</button> <!-- Taken to start screen --> </br> <button class="try-again-btn">Load Checkpoint</button> <!-- Taken to latest save point. Should this button appear/dissapear? Way to if/then and have only one button? To option or not to option...--> </div> <div class="good-ending hide has-text-centered"> <h1></h1> <!-- Dynamically change text? Need <span> if yes --> <!-- If we add stats to show, they should appear in a separate div here --> </br> <button class="restart-btn">Restart</button> <!-- Taken to start screen --> </div> <div class="choice-screen hide has-text-centered"> <h1></h1> <img id="avatar"> <!-- Need styling to overlay at bottom left corner --> <div class="choices"> <h1></h1> <div class="question">What item do you grab next?</div> <button class="choice-btn good-choice" id="first-choice">Water/Hand Sanitizer</button> <button class="choice-btnneutral-choice" id="second-choice">Toilet Paper/Hand Sanitizer</button> <!-- exclude last choice from slide-3 --> <!-- <button class="choice-btnneutral-choice" id="third-choice">Go by foot</button> --> <!-- move on to slide 5 --> </div> </br> <button class="prev-btn">Prev</button> </div> </div>)


  //restart button//
  //    <button id="restart" onclick="window.location.reload()">RESTART THE GAME</button> //
