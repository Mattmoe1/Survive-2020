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

function displayQuestion(){
var h2 = $("<h2>").text("question:" + questions[currentIndex].title)
console.log("question:" + questions[currentIndex].title)
$(".question-container").append(h2);


}

function btnOptions() {
    $("#choice-screen")
    questions[currentIndex].choices.forEach(function(choice, i){
        var btn =  $("<button>").text(choice);
        btn.attr("value", choice);
        btn.addClass("choice");

    $(".question-container").append(btn);
}

function nextBtn () {
    
}



// function makeChoice(){
//     if(this.value !== questions[currentIndex].answer){
//         $("#first-choice").on("click", function(){
//             $(".bad-ending").removeClass("hide")
//             $(".bad-ending").addClass("show")
//         })    
//         currentIndex++;
//     }


    //once the choices are clicked
    //currentIndex++;
    

//}
// makeChoice();

// $("#first-choice").on("click", function(){
//     $(".bad-ending").removeClass("hide")
//     $(".bad-ending").addClass("show")
//     })
// $("#second-choice").on("click", function(){
//     $(".win-screen").removeClass("hide")
//     $(".win-screen").addClass("show")
//     }