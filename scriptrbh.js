//replace div id with a different div id//

//BATHROOM BUTTON, CONTENT, AND FUNCTION//
function FrankBR() {
    var frankgif = document.createElement("frank");
    frankgif.setAttribute("src","frankwannabepure.gif")
    document.getElementById("main").innerHTML = "You approach the bathroom." + ("</br>") +  "You see a trail of a translucent fluid leading to the door." + ("</br>") +  "It looks like something was dragged there." + ("</br>") +  "You open the door and witness a horrifying sight" + ("</br>") + ("</br>") + ("</br>") + ("<img src='frankwannabepure.gif' />") + ("</br>") + ('<button id="stepback" onclick="StepBack()">Step back slowly and leave...</button>"')
  }

  //GO TO GAME OVER : WIN //
function StayHome() {
document.getElementById("main").innerHTML = document.getElementById("winner").innerHTML
}

//GO TO FREAKOUT ENDING//
function FreakOut() {
document.getElementById("main").innerHTML = document.getElementById("freakout").innerHTML
}

//REFRESH PAGE / RESET ALL //
function Restart() {
document.body.innerHTML = document.getElementById("main").innerHTML
}

//SLIDE-3 TEXT / CONTENT//
function StepBack () {
document.body.innerHTML = '<button id="restart" onclick="window.location.reload()">RESTART THE GAME<div id="stepbackcss"></button> </br> <img src="https://media.giphy.com/media/xAvVf0nXCvLz2/giphy.gif" /> <div class="mainS-3"> <div class="prompt"> <h3> You make it safe and sound and head to the center of the store.  </br> All around you are hordes of people frantically trying to grab supplies.  </br> You think about what items you need to get. </h3> </div>  </br> </div> <div  lass="choice-screen hide has-text-centered"> <div class="choices"> <h1></h1> </br> </br> <div class="question" id="grab_item">What item do you get?</div> <button class="first-choice" id="waterItem" onclick="GetWater()">Get Water</button> <button class="second-choice" id="toiletItem" onclick="GetToiletPaper()">Get Toilet Paper</button> <button class="third-choice" id="sanitizerItem" onclick="GetSanitizer()">Get Hand Sanitizer</button> </div> </div> </div> </div> </div> </div></div>';
document.getElementById('pure').style.visibility = 'hidden'; 
}

//ITEM FUNCTIONS SLIDE-3//
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
function LastItem () {
  document.body.innerHTML = '<button id="restart" onclick="window.location.reload()">RESTART THE GAME<div id="stepbackcss"></button> </br> <div class="container hide has-text-centered" id="slide-5"> </div>  </div>  </div>  <img src="lastitemdilema.gif" id="slide1" style="width:400;height:400">  <div class="bad-ending hide has-text-centered">  <div class="prompt">  <h1> You grabbed your first two items. </br> You arrive to the location of your final item.  </br>  You behold a remaining case of   [FUNCTION : SET THIS TO USERS FINAL ITEM].  </br>   A person rushes past you and grabs it.  </br>  You need that [3rd item]</h1>  </div>   </br> </div> </br>   <div class="choices">  What are you going to do? </br>  <button class="choice-btn good-choice" id="first-choice">Attack him, take the item</button>  <button class="choice-btnneutral-choice" id="second-choice">Speak with him</button>  <button class="choice-btnneutral-choice" id="third-choice">Walk away, head to the checkout</button>  </div>'
}


// </div> <!-- next slide --> <div class="container hide as-text-centered" id="slide-4"> <h1 class="title">Grab 2nd item</h1> <div class="card"> <div class="card-image"> <figure class="image"> <img src="" alt="" id="avatar"> </figure> </div> <div class="card-footer"> </div> </div> </div> <img src="https://foreignpolicy.com/wp-content/uploads/2020/04/zombie-coronavirus-shaun-of-the-dead-rogue-pictures-1.jpg?w=800&h=533&quality=90" id="slide1" style="width:20%;height:20%"> <div class="bad-ending hide has-text-centered"> <div class="prompt"> <h1> You have gathered your first item.  Now you go to the next most important item:</h1> </div> <!-- Dynamically change text? Need <span> if yes --> <!-- If we add stats to show, they should appear in a separate div here --> <button class="restart-btn">Restart</button> <!-- Taken to start screen --> </br> <button class="try-again-btn">Load Checkpoint</button> <!-- Taken to latest save point. Should this button appear/dissapear? Way to if/then and have only one button? To option or not to option...--> </div> <div class="good-ending hide has-text-centered"> <h1></h1> <!-- Dynamically change text? Need <span> if yes --> <!-- If we add stats to show, they should appear in a separate div here --> </br> <button class="restart-btn">Restart</button> <!-- Taken to start screen --> </div> <div class="choice-screen hide has-text-centered"> <h1></h1> <img id="avatar"> <!-- Need styling to overlay at bottom left corner --> <div class="choices"> <h1></h1> <div class="question">What item do you grab next?</div> <button class="choice-btn good-choice" id="first-choice">Water/Hand Sanitizer</button> <button class="choice-btnneutral-choice" id="second-choice">Toilet Paper/Hand Sanitizer</button> <!-- exclude last choice from slide-3 --> <!-- <button class="choice-btnneutral-choice" id="third-choice">Go by foot</button> --> <!-- move on to slide 5 --> </div> </br> <button class="prev-btn">Prev</button> </div> </div>)


  //restart button//
  //    <button id="restart" onclick="window.location.reload()">RESTART THE GAME</button> //
