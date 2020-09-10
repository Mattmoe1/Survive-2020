$(document).ready(function () { 
    var panic = 0;
    var experience = 0;
    var capturedSeconds = 0;
    var infectionStatus = 0;
    var score = 0;
    var secondsLeft = 120;
    var generatedInsult = "";
    var infected = false;
    var persuadedThief = false;
    var items = 0;
    var interval;
    var highscores = [];
    var playerName = "";
    var itemType = 0;
    var replacementItem = 0;
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('#'+burger.dataset.target);

    burger.addEventListener('click', function(){
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
    });
    
    
    $("#timer").text(secondsLeft);
    $("#panic").text(panic);
    loadHighscores(); 

    // Load highscores from localStorage and render highscores in #highscores-screen
    function loadHighscores() {
        var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

        $("#highscores-table").empty();

        if (storedHighscores !== null) {
            highscores = storedHighscores;   
        }

        for (var i = 0; i < highscores.length; i++) {
            var highscoreRow = $("<tr>");
            var nameTd = $("<td>").text(highscores[i].name);
            var scoreTd = $("<td>").text(highscores[i].score);

            highscoreRow.append(nameTd, scoreTd);
            $("#highscores-table").append(highscoreRow);
        }
    };

    // Store playerData in highscores array
    function storeScore() {
        var playerScore = score;
        var playerData = {
            name: playerName,
            score: playerScore,
        };

        if (playerName === "") {
            return;
        }

        highscores.push(playerData);
        highscores.sort(function(a,b) {
            return (b.score - a.score)
        });
        localStorage.setItem("highscores", JSON.stringify(highscores));

        loadHighscores();
    };

    // Called in startTimer(), checks panic; if (panic >= 50), then toggle to #game-over-freakout
    function checkPanic() {
        if (panic >= 50) {
            var allSlidesSansGameOvers = $("#start-screen, #0-slide, #1-slide, #1-a-slide, #1-a-a-slide, #1-a-b-slide, #2-slide, #bathroom-slide, #bathroom-a-slide, #3-slide, #4-slide, #4-a-slide, #4-a-a-slide, #5-slide, #6-slide, #7-slide");
            
            capturedSeconds = secondsLeft;
            stopTimer();
            allSlidesSansGameOvers.removeClass("show");
            if (allSlidesSansGameOvers.classList === "hide") { 
                return;
            } else {
                allSlidesSansGameOvers.addClass("hide");
                $("#game-over-freakout").removeClass("hide"); // Defaulting to game-over-freakout screen for now
                $("#game-over-freakout").addClass("show");
            }
        }
    }

    // Resets global variables, styling, and empties values
    function gameReset() {
        panic = 0;
        experience = 0;
        capturedSeconds = 0;
        infectionStatus = 0;
        score = 0;
        items = 0;
        infected = false;
        persuadedThief = false;
        playerName = "";
        itemType = 0;
        replacementItem = 0;
        document.getElementById('water-item').style.visibility = 'visible';
        document.getElementById('toilet-item').style.visibility = 'visible';
        document.getElementById('sanitizer-item').style.visibility = 'visible';
        $("#player-name-input").val("");
        
    }

    // Renders time every second for #timer. If (secondsLeft <= 0), then calculate, store, and append score and toggle to .game-over-freakout
    function renderTime() {
        $("#timer").text(secondsLeft);
        if (secondsLeft <= 0) { // If 
            var allSlidesSansGameOvers = $("#start-screen, #0-slide, #1-slide, #1-a-slide, #1-a-a-slide, #1-a-b-slide, #2-slide, #bathroom-slide, #bathroom-a-slide, #3-slide, #4-slide, #4-a-slide, #4-a-a-slide, #5-slide, #6-slide, #7-slide");
            
            stopTimer();
            allSlidesSansGameOvers.removeClass("show");
            if (allSlidesSansGameOvers.classList === "hide") { 
                return;
            } else {
                allSlidesSansGameOvers.addClass("hide");
                if (infected === true) { // Player is infected; nothing added to score
                    return;
                } else {
                    infectionStatus += 100; // Player is not infected; 100 added to score  
                }
                score = capturedSeconds + experience + infectionStatus - panic; // Calculate final score
                // console.log(score);
                storeScore();
                appendScore();
        
                // Toggle .game-over-freakout
                $("#6-slide").removeClass("show");
                $("#6-slide").addClass("hide");
                $("#game-over-freakout").removeClass("hide");
                $("#game-over-freakout").addClass("show");
            }
        }
    }

    // Start timer, calling renderTime() and checkPanic() every second
    function startTimer() {
        if (secondsLeft > 0) {
            interval = setInterval(function() {
                secondsLeft--; 
                renderTime(); // Renders time text and checks when secondsLeft = 0
                checkPanic(); // Checks when panic reaches high level for auto game-over-freakout
            }, 1000) // Per second
        }
    }

    // Stop timer, clearing interval
    function stopTimer() {
        secondsLeft = 0;
        clearInterval(interval);
        secondsLeft = 120; 
        renderTime();
    }

    // Generate doctor information from BetterDoctorAPI
    /* function generateDoctorInfo() {
        var lat = "37.773";
        var lon = "-122.413";
        var location = lat + "%2C" + lon + "%2C100" // in circular (lat,lon,range (miles))
        var userLocation = lat + "%2C" + lon;
        var doctorAPIKey = "2f9e311e779577414edcd98d54ffa226";
        var corsAnywhereURL = "https://cors-anywhere.herokuapp.com/";
        var doctorQueryURL = "https://api.betterdoctor.com/2016-03-01/doctors?location=" + location + "&user_location=" + userLocation + "&skip=0&limit=10&user_key=" + doctorAPIKey;

        $.ajax({
            url: corsAnywhereURL + doctorQueryURL,
            method: "GET",
        }).then(function(response) {
            console.log(response);
        })
    }; */

    // Generate an insult from the Evil Insult API
    function generateInsult() {
        var corsAnywhereURL = "https://cors-anywhere.herokuapp.com/";

        // api urls
        var insultQueryURL = "https://evilinsult.com/generate_insult.php?lang=en";

        return $.ajax({
            url: corsAnywhereURL + insultQueryURL,
            method: "GET"
        })
    }; 

    // Reset and activate .stats-modal, populating it with a random country's COVID-19 statistics from a COVID-19 API
    function generateStatsModal() {
        var statsModalTitle = $(`<p class="title has-text-centered">Did you know?</p>`);
        var statsModalStats = $(`<p>In <span id="country-name"></span>, there have been <span id="country-cases"></span> cases of COVID-19 reported since the start of the global pandemic. <span id="country-recovered"></span> people have recovered, and <span id="country-deaths"></span> have died.</p>`);
        var getCountriesURL = "https://covid19-api.org/api/countries";

        $("#generate-modal").append(statsModalTitle, statsModalStats);
        $("#country-name, #country-cases, #country-recovered, #country-deaths").empty();

        $.ajax({
            url: getCountriesURL,
            method: "GET"
        }).then(function(response) {
                // console.log(response);
                var allCountryInfo = response;
                var randomAlpha = Math.floor(Math.random() * Math.floor(allCountryInfo.length)); // Randomize selection of all countries, getting alpha-2                        
                var randomString = randomAlpha; // Setting string to same alpha-2, so country name and alpha-2 math
                var covid19QueryURL = "https://covid19-api.org/api/status/" + allCountryInfo[randomAlpha].alpha2; 
                        
                return $.ajax({
                    url: covid19QueryURL,                        
                    method: "GET"
                }).then(function(countryResponse) {                            
                    // console.log("We should be seeing info for country: " + allCountryInfo[randomString].name + " (" + allCountryInfo[randomAlpha].alpha2 + ")");                        
                    // console.log(countryResponse);

                    var countryName = allCountryInfo[randomString].name;
                    var countryCases = countryResponse.cases.toLocaleString('en-US'); // Using .toLocaleString('en-US') to format numbers
                    var countryRecovered = countryResponse.recovered.toLocaleString('en-US');
                    var countryDeaths = countryResponse.deaths.toLocaleString('en-US');

                    $("#country-name").text(countryName);                            
                    $("#country-cases").text(countryCases); 
                    $("#country-recovered").text(countryRecovered);
                    $("#country-deaths").text(countryDeaths);
                });
            });

            if ($(".modal").hasClass("is-active") === true) {
                return;
            } else {
                $(".modal").addClass("is-active");
            }
        
    };

    // Removes .is-active from .modal
    $(".modal-background, .modal-close").on("click", function(event) {
        $(".modal").removeClass("is-active"); 
        $("#generate-modal").empty();
        if (persuadedThief === true) { 
            persuadedThief = false;
            $("#3-a-slide").removeClass("show");
            $("#3-a-slide").addClass("hide");
            $("#3-a-a-slide").removeClass("hide");
            $("#3-a-a-slide").addClass("show"); 
        }
    })

    // 50/50 chance to persuadeThief, called in #3-a-slide to move to next slide
    function persuadeThief() {
        if (persuadedThief === true) {
            return;
        };

        if (Math.random() < 0.5) {
            persuadedThief = false;
        } else {
            persuadedThief = true;
        }
    }
    
    // 50/50 chance to change infected, called in slides where player risks infection
    function coinTossInfection() {
        if (infected === true) {
            return;
        };

        if (Math.random() < 0.5) {
            infected = false;
        } else {
            infected = true;
        };
    };

    // On click .view-highscores, stop current game and toggle #highscores-screen
    $(".view-highscores").on("click", function(event) {
        event.preventDefault();
        var allSlides = $("#start-screen, #0-slide, #1-slide, #1-a-slide, #1-a-a-slide, #1-a-b-slide, #2-slide, #bathroom-slide, #bathroom-a-slide, #3-slide, #3-a-slide, #3-a-a-slide, #4-slide, #5-slide, #6-slide, #game-over-loss, #game-over-win, #game-over-freakout");
        
        loadHighscores();
        stopTimer();
        gameReset();
        allSlides.removeClass("show");
        if (allSlides.classList === "hide") { 
            return;
        } else {
            allSlides.addClass("hide");
            $("#highscores-screen").removeClass("hide");
            $("#highscores-screen").addClass("show");
        }

        // Trying to make it so we confirm going to .highscores-screen if player is current in gameplay slides
        /* var gameSlides = $("#0-slide, #1-slide, #1-a-slide, #1-a-a-slide, #1-a-b-slide, #2-slide, #bathroom-slide, #bathroom-a-slide, #3-slide, #3-a-slide, #3-a-a-slide, #4-slide, #5-slide, #6-slide");

        if (gameSlides.classList === "show") {
            var continueToHighscores = confirm("You are currently in the middle of a game! If you View Highscores right now, your progress will not be saved.");
            if (continueToHighscores) {
                stopTimer();
                gameReset();

                allSlides.removeClass("show");
                if (allSlides.classList === "hide") { 
                    return;
                } else {
                    allSlides.addClass("hide");
                    $("#highscores-screen").removeClass("hide");
                    $("#highscores-screen").addClass("show");
                }
            } else {
                return;
            }
        } else {
            stopTimer();
            gameReset();

            allSlides.removeClass("show");
            if (allSlides.classList === "hide") { 
                return;
            } else {
                allSlides.addClass("hide");
                $("#highscores-screen").removeClass("hide");
                $("#highscores-screen").addClass("show");
            }
        } */

    })

    // Start game (grab playerName, startTimer(), and toggle #0-slide-choices
    $("#start-btn").on("click", function(event) {
        event.preventDefault();
        playerName = $("#player-name-input").val().trim();
        startTimer();

        $("#start-screen").removeClass("show");
        $("#start-screen").addClass("hide");
        $("#0-slide").removeClass("hide");
        $("#0-slide").addClass("show");

        // generateDoctorInfo();
    });

    // Player stats change and page toggles to #1-slide, #game-over-win, or #game-over-freakout depending on user choice
    $("#0-slide-choices").on("click", function(event) {
        event.preventDefault();

        if (event.target.id === "0-slide-next") {
            experience += 10;
            panic += 5;
            generateStatsModal();
            $("#0-slide").removeClass("show");
            $("#0-slide").addClass("hide");
            $("#1-slide").removeClass("hide");
            $("#1-slide").addClass("show");
        } else if (event.target.id === "0-slide-autowin") { // Player chose to stay home and quarantine - generate .game-over-win
            experience += 100;
            infectionStatus += 100; // Player is not infected; 100 added to score
            capturedSeconds = secondsLeft; // Capture seconds left in timer, to be added to score
            score = capturedSeconds + experience + infectionStatus - panic; // Calculate final score
            // console.log(score);
            storeScore();
            appendScore();
            $("#0-slide").removeClass("show");
            $("#0-slide").addClass("hide");
            $("#game-over-win").removeClass("hide");
            $("#game-over-win").addClass("show");
        } else if (event.target.id === "0-slide-freak") { // Player chose to freak out - generate .game-over-freakout
            panic += 50; // Calls checkPanic()
            infectionStatus += 100; // Player is not infected; 100 added to score
            capturedSeconds = secondsLeft; // Capture seconds left in timer, to be added to score
            score = capturedSeconds + experience + infectionStatus - panic; // Calculate final score
            // console.log(score);
            storeScore();
            appendScore();
        }
    });

    // Player stats change and page toggles to #1-a-slide or #2-slide depending on user choice 
    $("#1-slide-choices").on("click", function(event) {
        event.preventDefault();
        generateStatsModal();
        if (event.target.id === "1-slide-bus") {
            panic += 5;
            $("#1-slide").removeClass("show");
            $("#1-slide").addClass("hide");
            $("#1-a-slide").removeClass("hide");
            $("#1-a-slide").addClass("show");
        } else if (event.target.id === "1-slide-drive" || "1-slide-walk") {
            experience += 10;
            $("#1-slide").removeClass("show");
            $("#1-slide").addClass("hide");
            $("#2-slide").removeClass("hide");
            $("#2-slide").addClass("show");
        } 
    });

    // Player stats change and page toggles to #1-a-a-slide, #1-a-b-slide, or #2-slide cepending on user choice
    $("#1-a-slide-choices").on("click", function(event) {
        event.preventDefault();
        generateStatsModal();
        coinTossInfection(); // Toss to see if become infected
        console.log("Infected: " + infected);
        
        if (event.target.id === "1-a-slide-toss") {
            experience += 5;
            $("#1-a-slide").removeClass("show");
            $("#1-a-slide").addClass("hide");
            $("#2-slide").removeClass("hide");
            $("#2-slide").addClass("show");
        } else if (event.target.id === "1-a-slide-scream") {
            generateInsult().then(function(response) {
                generatedInsult = response; 
                $("#bus-insult").text(generatedInsult);
            })
            panic += 5;
            $("#1-a-slide").removeClass("show");
            $("#1-a-slide").addClass("hide");
            $("#1-a-a-slide").removeClass("hide");
            $("#1-a-a-slide").addClass("show");
        } else if (event.target.id === "1-a-slide-distance") {
            $("#1-a-slide").removeClass("show");
            $("#1-a-slide").addClass("hide");
            $("#1-a-b-slide").removeClass("hide");
            $("#1-a-b-slide").addClass("show");
        }
    });

    // Player stats change and page toggles to #2-slide
    $("#1-a-a-slide-next").on("click", function(event) {
        event.preventDefault();
        panic += 5;

        generateStatsModal();
        coinTossInfection();
        console.log("Infected: " + infected);
        
        $("#1-a-a-slide").removeClass("show");
        $("#1-a-a-slide").addClass("hide");
        $("#2-slide").removeClass("hide");
        $("#2-slide").addClass("show");
    });

    // Player stats change and page toggles to #2-slide
    $("#1-a-b-slide-next").on("click", function(event) {
        event.preventDefault();
        experience += 5;

        generateStatsModal();
        coinTossInfection();
        console.log("Infected: " + infected);

        $("#1-a-b-slide").removeClass("show");
        $("#1-a-b-slide").addClass("hide");
        $("#2-slide").removeClass("hide");
        $("#2-slide").addClass("show");
    });

    // When player is in store and presses .bathroom-btn, page toggles to #bathroom-slide, saving data-from to return to same slide; and player stats change
    $(".bathroom-btn").on("click", function(event) {
        event.preventDefault();
        var toBathroomSlides = $("#2-slide, #3-slide, #4-slide");
        panic += 10;

        generateStatsModal();
        coinTossInfection();
        console.log("Infected: " + infected);

        toBathroomSlides.removeClass("show");
        if (toBathroomSlides.classList === "hide") {
            return;
        } else {
            toBathroomSlides.addClass("hide");
            $("#bathroom-slide").removeClass("hide");
            $("#bathroom-slide").addClass("show");
        }

        // Set data-from attribute from #bathroom-a-slide so that we can go back to same page
        if (event.target.id === "from-2-slide") {
            // Clear data each time
            $("#back-to-store").data("from", null); // Clear data-from attribute each time to avoid stacking
            $("#back-to-store").data("from", "from-2-slide");
        } else if (event.target.id === "from-3-slide") {
            $("#back-to-store").data("from", null);
            $("#back-to-store").data("from", "from-3-slide");
        } else if (event.target.id === "from-4-slide") {
            $("#back-to-store").data("from", null);
            $("#back-to-store").data("from", "from-4-slide");
        } 
    })

    // Player stats change and page toggles to #bathroom-a-slide
    $("#bathroom-next").on("click", function(event) {
        event.preventDefault();
        panic += 10;
        coinTossInfection();
        console.log("Infected: " + infected);
        $("#bathroom-slide").removeClass("show");
        $("#bathroom-slide").addClass("hide");
        $("#bathroom-a-slide").removeClass("hide");
        $("#bathroom-a-slide").addClass("show");
    })

    // Player stats change, and depending on stored data-from attribute, page toggles back to #2-slide, #3-slide, or #4-slide
    $("#back-to-store").on("click", function(event) {
        event.preventDefault();

        experience += 10;
        panic += 5;

        generateStatsModal();
        
        if ($("#back-to-store").data("from") === "from-2-slide") {
            $("#bathroom-a-slide").removeClass("show");
            $("#bathroom-a-slide").addClass("hide");
            $("#2-slide").removeClass("hide");
            $("#2-slide").addClass("show");
        } else if ($("#back-to-store").data("from") === "from-3-slide") {
            $("#bathroom-a-slide").removeClass("show");
            $("#bathroom-a-slide").addClass("hide");
            $("#3-slide").removeClass("hide");
            $("#3-slide").addClass("show");
        } else if ($("#back-to-store").data("from") === "from-4-slide") {
            $("#bathroom-a-slide").removeClass("show");
            $("#bathroom-a-slide").addClass("hide");
            $("#4-slide").removeClass("hide");
            $("#4-slide").addClass("show");
        } 
    })

    // In #2-slide, player chooses the first or second items, whose visibility is set to "hidden", or the third item, calling lastItem()
    $("#water-item").on("click", function(event) {
        event.preventDefault();
        if (items === 2) {
            lastItem();
        } else {
            var modalItem = $(`<p>You grab some water.</p>`);

            items++;
            itemType++;
            document.getElementById('water-item').style.visibility = 'hidden'; 
            $("#generate-modal").append(modalItem);
            $(".modal").addClass("is-active");           
        }
    })

    // In #2-slide, player chooses the first or second items, whose visibility is set to "hidden", or the third item, calling lastItem()
    $("#toilet-item").on("click", function(event) {
        event.preventDefault();
        if (items === 2) {
            lastItem();
        } else {
            var modalItem = $(`<p>You grab some toilet paper.</p>`);

            items++;
            itemType += 2;
            document.getElementById('toilet-item').style.visibility = 'hidden'; 
            $("#generate-modal").append(modalItem);
            $(".modal").addClass("is-active");           
        }
    })

    // In #2-slide, player chooses the first or second items, whose visibility is set to "hidden", or the third item, calling lastItem()
    $("#sanitizer-item").on("click", function(event) {
        event.preventDefault();
        if (items === 2) {
            lastItem();
        } else {
            var modalItem = $(`<p>You grab some hand sanitizer.</p>`)

            items++;
            itemType += 4;
            document.getElementById('sanitizer-item').style.visibility = 'hidden'; 
            $("#generate-modal").append(modalItem);
            $(".modal").addClass("is-active");
        }
    })

    // Calls reportReplacement() and page toggles to #3-slide
    async function lastItem() {
        reportReplacement();

        $("#2-slide").removeClass("show");
        $("#2-slide").addClass("hide");
        $("#3-slide").removeClass("hide");
        $("#3-slide").addClass("show");
    }

    // Determines what .final-item is based on previous choices and calls finalItem(); 
    function reportReplacement() {
        // console.log(itemType);
        if (itemType == 6) {
            var modalItem = $(`<p>You've collected toilet paper and hand sanitizer. Head over to get some water.</p>`);
            
            replacementItem++;
            $("#generate-modal").append(modalItem);
            $(".modal").addClass("is-active");
            // console.log("replacement 1", replacementItem);
        } else if (itemType == 3) {
            var modalItem = $(`<p>You've collected toilet paper and water. Head over to get some hand sanitizer.</p>`);
            
            replacementItem += 2;
            $("#generate-modal").append(modalItem);
            $(".modal").addClass("is-active");
        } else if (itemType == 5) {
            var modalItem = $(`<p>You've collected hand sanitizer and water. Head over to get some toilet paper.</p>`);
            
            replacementItem += 3;
            $("#generate-modal").append(modalItem);
            $(".modal").addClass("is-active");
        }
        
        finalItem();
    }
    
    // Sets .final-item text
    async function finalItem() {
        if (replacementItem == 1) {
           $(".final-item").text("water");
        } else if (replacementItem == 2) {
            $(".final-item").text("hand sanitizer");
        } else if (replacementItem == 3) {
            $(".final-item").text("toilet paper");
        }
    }
    
    
    // Player stats change and page toggles to #3-a-slide or #4-slide
    $(".3-slide-choices").on("click", function(event) {
        event.preventDefault();
        coinTossInfection();
        generateStatsModal();
        if (event.target.id === "3-slide-approach") {
            $("#3-slide").removeClass("show");
            $("#3-slide").addClass("hide");
            $("#3-a-slide").removeClass("hide");
            $("#3-a-slide").addClass("show");
        } else if (event.target.id === "3-slide-away") {
            experience += 10;
            $("#3-slide").removeClass("show");
            $("#3-slide").addClass("hide");
            $("#4-slide").removeClass("hide");
            $("#4-slide").addClass("show");
        } 
    });

    // Player stats change and generate a modal with choice and effectiveness
    $(".3-a-slide-choices").on("click", function(event) {
        event.preventDefault();

        coinTossInfection();
        panic += 5;
        
        if (event.target.id === "3-a-slide-insult") {
            generateInsultModal();
        } else if (event.target.id === "3-a-slide-cough") {
            var modalChoice = $(`<p><span class="3-a-slide-choice"></span></p>`);
            // var modalEffectiveness = $(`<p>It was <span class="effective-inffective"></span>.</p>`);
            
            persuadeThief();
            $("#generate-modal").empty();
            $("#generate-modal").append(modalChoice);
            $(".3-a-slide-choice").text(`You stagger up to the thief and force yourself to cough and wheeze upon him.`);
            
            /*
            if (persuadedThief === true) {
                $(".effective-ineffective").text("effective");
            } else {
                $(".effective-ineffective").text("ineffective. Try again");
            }; */

            
            $(".modal").addClass("is-active");
        } else if (event.target.id === "3-a-slide-beg") {
            var modalChoice = $(`<p><span class="3-a-slide-choice"></span></p>`);
            // var modalEffectiveness = $(`<p>It was <span class="effective-inffective"></span>.</p>`);
            
            persuadeThief();
            $("#generate-modal").empty();
            $("#generate-modal").append(modalChoice);
            $(".3-a-slide-choice").text(`You get on your hands and knees on the floor, which is slightly sticky, and beg, hysterical.`);
            
            /*
            if (persuadedThief === true) {
                $(".effective-ineffective").text("effective");
            } else {
                $(".effective-ineffective").text("ineffective. Try again");
            }; */
            
            $(".modal").addClass("is-active");
        }    
    });

    // Generates modal of insult from EvilInsult API 
    function generateInsultModal() {
        generateInsult().then(function(response) {
            var insultModalChoice = $(`<p><span class="3-a-slide-choice"></span></p>`);
            // var insultModalEffectiveness = $(`<p>It was <span class="effective-inffective"></span>.</p>`);

            generatedInsult = response;
            $("#generate-modal").append(insultModalChoice);
            
            persuadeThief();
            $(".3-a-slide-choice").text(`You scream, "` + generatedInsult + `"`);
            
            /*
            if (persuadedThief === true) {
                $(".effective-ineffective").text("effective");
            } else {
                $(".effective-ineffective").text("ineffective. Try again");
            }; */

            $(".modal").addClass("is-active");
        });
    };

    // Player stats change and toggle to #4-slide
    $("#3-a-a-slide-next").on("click", function(event) {
        event.preventDefault();
        experience += 5;
        coinTossInfection();
        generateStatsModal();
        $("#3-a-a-slide").removeClass("show");
        $("#3-a-a-slide").addClass("hide");
        $("#4-slide").removeClass("hide");
        $("#4-slide").addClass("show");
    });

    // Player stats change and toggle to #5-slide
    $(".4-slide-choices").on("click", function(event) {
        event.preventDefault();
        experience += 5;
        coinTossInfection();
        generateStatsModal();
        if (event.target.id === "5-slide-steal" || "5-slide-stay" || "5-slide-leave") {
            $("#4-slide").removeClass("show");
            $("#4-slide").addClass("hide");
            $("#5-slide").removeClass("hide");
            $("#5-slide").addClass("show");
        }
    });

    // Player stats change and toggle to #6-slide
    $(".5-slide-choices").on("click", function(event) {
        event.preventDefault();
        experience += 5;
        generateStatsModal();
        $("#5-slide").removeClass("show");
        $("#5-slide").addClass("hide");
        $("#6-slide").removeClass("hide");
        $("#6-slide").addClass("show");
    });

    // Empty previous and append new player .score
    function appendScore() {
        $("#freakout-score, #loss-score, #win-score").empty();
        $(".score").text(score);
    }

    // Last slide to game over. Depending on stats, will generate either .game-over-loss or .game-over-win depending on infectionStatus
    $("#6-slide-next").on("click", function(event) {
        event.preventDefault();
        capturedSeconds = secondsLeft;
        stopTimer();
        // If time, add generateStatsModal() here but modify to make a U.S. Stats modal
        
        if (infected === true) { // Player is infected; nothing added to score
            score = capturedSeconds + experience - panic; // Calculate final score
            console.log(score);
            storeScore();
            appendScore();

            // Toggle .game-over-loss
            $("#6-slide").removeClass("show");
            $("#6-slide").addClass("hide");
            $("#game-over-loss").removeClass("hide"); 
            $("#game-over-loss").addClass("show");
        } else {
            infectionStatus += 100; // Player is not infected; 100 added to score
            score = capturedSeconds + experience + infectionStatus - panic; // Calculate final score
            console.log(score);
            storeScore();
            appendScore();

            // Toggle .game-over-win
            $("#6-slide").removeClass("show");
            $("#6-slide").addClass("hide");
            $("#game-over-win").removeClass("hide");
            $("#game-over-win").addClass("show");
        }
    });

    // On-click of .restart-btn resets all parameters and takes player back to #start-screen
    $(".restart-btn").on("click", function(event) { 
        event.preventDefault();
        var allSlidesSansStart = $("#0-slide, #1-slide, #1-a-slide, #1-a-a-slide, #1-a-b-slide, #2-slide, #bathroom-slide, #bathroom-a-slide, #3-slide, #3-a-slide, #3-a-a-slide, #4-slide, #5-slide, #6-slide, #game-over-loss, #game-over-win, #game-over-freakout, #highscores-screen");
        
        stopTimer();
        gameReset();
        allSlidesSansStart.removeClass("show");
        // console.log(allSlidesSansStart.hasClass("hide"));
        if (allSlidesSansStart.classList === "hide") { 
            return;
        } else {
            allSlidesSansStart.addClass("hide");
            $("#start-screen").removeClass("hide");
            $("#start-screen").addClass("show");
        }
    }); 

    // Generate reaction gif from GIPHY API for successful confrontation
    $("#gif1").on("click", function () {
        var gif1 = $(this).attr("data-gif1");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif1 + "&api_key=DBRAWwObrruaGJNOu68zDwNAqwaxo9ZK&limit=1";
        var gif1b = $(this).attr("data-gif1b");
        var queryURL1b = "https://api.giphy.com/v1/gifs/search?q=" + gif1b + "&api_key=DBRAWwObrruaGJNOu68zDwNAqwaxo9ZK&limit=1";
        
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function (response) { 
        // console.log(queryURL);
        // console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv1 = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>");
            var gifImage1 = $("<img>");
            gifImage1.attr("src", results[i].images.fixed_height.url);
            gifImage1.attr("alt", gif1 + " Gif");
            gifDiv1.append(p);
            gifDiv1.append(gifImage1);
            $("#gifAppear1").prepend(gifDiv1);
        }
        });
        
        $.ajax({
        url: queryURL1b,
        method: "GET"
        }).then(function (response) { 
        console.log(queryURL1b);
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv1b = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>");
            var gifImage1b = $("<img>");
            gifImage1b.attr("src", results[i].images.fixed_height.url);
            gifImage1b.attr("alt", gif1 + " Gif");
            gifDiv1b.append(p);
            gifDiv1b.append(gifImage1b);
            $("#gifAppear1b").prepend(gifDiv1b);
        }
        });
    });
    
    // Generate reaction gif from GIPHY API for winning result
    $("#gif2").on("click", function () {
        var gif2 = $(this).attr("data-gif2");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif2 + "&api_key=DBRAWwObrruaGJNOu68zDwNAqwaxo9ZK&limit=1";
    
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function (response) { 
        // console.log(queryURL);
        // console.log(response);
        var results = response.data;
    
        for (var i = 0; i < results.length; i++) {
            var gifDiv2 = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>");
            var gifImage2 = $("<img>");
            gifImage2.attr("src", results[i].images.fixed_height.url);
            gifImage2.attr("alt", gif2 + " Gif");
            gifDiv2.append(p);
            gifDiv2.append(gifImage2);
            $("#gifAppear2").prepend(gifDiv2);
        }
    
        document.getElementById("winnerslide").innerHTML = '<p class="title has-text-centered">Yay! You Win!</p><p>You made it! Your choices have lead you down the correct path. You continue to stay safe. You wash your hands frequently and for 20 seconds. You maintain 6 feet social distancing from others. You wear a mask which covers your mouth and nose when you are out in public. The future is uncertain, but with good decision making like this you feel you at least have a chance to make it through to the other side of this apocalypse. Stay safe out there.</p>});'
        }); 
    });
    
    // Generate reaction gif from GIPHY API for bathroom slide
    $("#gif3").on("click", function () {
        var gif3 = $(this).attr("data-gif3");
        var queryURL3 = "https://api.giphy.com/v1/gifs/search?q=" + gif3 + "&api_key=DBRAWwObrruaGJNOu68zDwNAqwaxo9ZK&limit=1";
    
        $.ajax({
        url: queryURL3,
        method: "GET"
        }).then(function (response) { 
        // console.log(queryURL3);
        // console.log(response);
        var results = response.data;
    
        for (var i = 0; i < results.length; i++) {
            var gifDiv3 = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>");
            var gifImage3 = $("<img>");
            gifImage3.attr("src", results[i].images.fixed_height.url);
            gifImage3.attr("alt", gif3 + " Gif");
            gifDiv3.append(p);
            gifDiv3.append(gifImage3);
            $("#gifAppear3").prepend(gifDiv3);
        }
    
        document.getElementById("bathroom-slide-gif").innerHTML = '<div class="tile is-child box" id="scenario-description">                        <p class="title has-text-centered">A Slimey Mystery</p><p>You wander cautiously looking for the bathroom.  You see a sign and walk towards it, but as you head there, you see a trail of some viscous liquid in a continous path as though something were draged.  You arrive at the bathroom and reveal a horrid sight</p>                    </div>'
        });
    });

    $("#gif4").on("click", function () {
        var gif4 = $(this).attr("data-gif4");
        var queryURL4 = "https://api.giphy.com/v1/gifs/search?q=" + gif4 + "&api_key=DBRAWwObrruaGJNOu68zDwNAqwaxo9ZK&limit=1";

        $.ajax({
          url: queryURL4,
          method: "GET"
        }).then(function (response) { 
          // console.log(queryURL4);
          // console.log(response);
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv4 = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>");
            var gifImage4 = $("<img>");
            gifImage4.attr("src", results[i].images.downsized.url);
            gifImage4.attr("alt", gif4 + " Gif");
            gifDiv4.append(p);
            gifDiv4.append(gifImage4);
            $("#gifAppear4").prepend(gifDiv4);
          }
        });
      })
    });