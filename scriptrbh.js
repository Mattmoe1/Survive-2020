//replace div id with a different div id//


function FrankBR() {
    var frankgif = document.createElement("frank");
    frankgif.setAttribute("src","frankwannabepure.gif")
    document.getElementById("main").innerHTML = "You approach the bathroom." + ("</br>") +  "You see a trail of a translucent fluid leading to the door." + ("</br>") +  "It looks like something was dragged there." + ("</br>") +  "You open the door and withness a horrifying sight" + ("</br>") + ("</br>") + ("</br>") + ("<img src='frankwannabepure.gif' />")
  }

function StayHome() {
document.getElementById("main").innerHTML = document.getElementById("winner").innerHTML
}

function GetSupplies() {
document.getElementById("main").innerHTML = document.getElementById("freakout").innerHTML
}

function Restart() {
    document.body.innerHTML = document.getElementById("main").innerHTML
  }

  //restart button//
  //    <button id="restart" onclick="window.location.reload()">RESTART THE GAME</button> //