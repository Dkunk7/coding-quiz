var scorePull = {};

var initials = 0
var seconds = 0
var timeCounter = $(`.time`)
timeCounter.append(seconds);
var theTimer = 0

var scoreList = $(`.score-list`)

var mainPage = $(".mainPage");
var initDiv = $("<div class = 'main-contain'>");
var footer = $("footer");

var textDiv = $("<div class = 'main-text'>");
var titleh1 = $("<h1>Coding Quiz Challenge</h1>");
var titleP = $("<p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>");

var button1 = $("<button type = 'button' class = 'startBtn'>Start the Quiz!</button>")

textDiv.append(titleh1);
textDiv.append(titleP);
initDiv.append(textDiv);
initDiv.append(button1);
mainPage.append(initDiv);





var qArray = [
    { q: "Commonly used data types do NOT include:", a: "1. strings", b: "2. booleans", c: "3. alerts", d: "4. numbers", answer: "3. alerts"},
    { q: "Arrays in Javascript can be used to store _____.", a: "1. numbers and strings",  b: "2. other arrays", c: "3. booleans", d: "4. all of the above", answer: "4. all of the above"},
    { q: "A very useful tool used during development for printing content to the debugger is:", a: "1. JavaScript", b: "2. terminal/bash", c: "3. for loops", d: "4. console.log", answer: "4. console.log"},
    { q: "String values must be enclosed within _____ when being assigned to variable.", a: "1. commas", b: "2. curly brackets", c: "3. quotes", d: "4. parenthesis", answer: "3. quotes"},
    { q: "The condition in an if/else statement is enclosed with _____.", a: "1. quotes", b: "2. parenthesis", c: "3. curly brackets", d: "4. square brackets", answer: "2. parenthesis"},
];
console.log(qArray[0].q)

var quizDiv = $("<div class = 'quiz-div'>'");

var quizGo = function() {
    qNum ++
    
    displayQuestion(qNum); 
};

var createScore = function(initials, score) {
    var scoreLi = $(`<li>${initials} - ${score}</li>`)
        // .text(`${initials} - ${score}`);
    scoreList.append(scoreLi);

};
var getScore = function(){
    scorePull = JSON.parse(localStorage.getItem("score"))
    if (!scorePull) {
        scores = {
          initials: [],
          score: [],
    
        };
      }
    
      // loop over object properties
      $.each(scorePull, function(list, arr) {
        console.log(list, arr);
        // then loop over sub-array
        createScore(scorePull[list].initials, scorePull[list].score);
        // scorePull.forEach(score => function() {
        //   createScore(score.initials, score.score);
        //   console.log("lol")
        // });
      });
};

var endGame = function() {
    qClear();
    
    if (seconds < 0) {
        var finalScore = 0;
    } else {
        finalScore = seconds;
    }
    timeCounter.empty();
    timeCounter.append(` ${finalScore}`);
    clearInterval(theTimer);

    var scoreDiv = $(`<div></div>`);
    
    var allDone = $(`<h1>All done!</h1>`);
    var scoreText = $(`<p>Your final score is ${finalScore}.</p>`);

    var scoreForm = $(`<form id = "score-form" action = "./highScores.html"></form>`);
    var scoreLabel = $(`<label for = "score-init">Enter Initials: </label>`);
    var scoreInitials = $(`<input type = "text" id = "score-init" placeholder = "Your Initials">`);
    var scoreSubmit = $(`<button type = "submit">Submit</button>`);

    scoreDiv.append(allDone);
    scoreDiv.append(scoreText);

    scoreForm.append(scoreLabel);
    scoreForm.append(scoreInitials);
    scoreForm.append(scoreSubmit);

    scoreDiv.append(scoreForm);
    mainPage.append(scoreDiv);

    scoreSubmit.on("click", function() {
        var scoreData = document.querySelector("#score-init");
        var initials = scoreData.value
        console.log(initials);

        

        var scoreArr = JSON.parse(localStorage.getItem("score")) || [];
        scoreArr.push({
            initials: initials,
            score: finalScore
        });
        localStorage.setItem("score", JSON.stringify(scoreArr));

        
    });
};


var displayQuestion =  function(qNum) {
    var quizQ = $(`<h1>${qArray[qNum].q}</h1>`);
    var quizUL = $(`<ul class = "answers-list"></ul>`);
    
    var qA = $(`<li class = "qButton">${qArray[qNum].a}</li>`);
    var qB = $(`<li class = "qButton">${qArray[qNum].b}</li>`);
    var qC = $(`<li class = "qButton">${qArray[qNum].c}</li>`);
    var qD = $(`<li class = "qButton">${qArray[qNum].d}</li>`);
    
    quizDiv.append(quizQ);
    quizUL.append(qA, qB, qC, qD);
    quizDiv.append(quizUL);
    mainPage.append(quizDiv);

    correct = $(`<p class = "ccc">Correct!</p>`);
    incorrect = $(`<p class = "ccc">Incorrect!</p>`);
    
    
    $(".qButton").on("click", function() {
        qResponse = this.textContent;
        if (qResponse === qArray[qNum].answer) {
            console.log("you did it!");
            qClear();
            quizGo();
            footer.append(correct);
            setTimeout(function() {
                footer.empty();
            }, 3000);
        }
        else {
            console.log("aw geez");
            qClear();
            seconds = seconds - 10;
            quizGo();
            footer.append(incorrect);
            setTimeout(function() {
                footer.empty();
            }, 3000);
        }
    });
};

var qClear = function() {
    quizDiv.empty();
}

var qNum = -1
var runQuiz = function() {
    seconds = 75;
    var theTimer = setInterval(function() {
        
        timeCounter.empty();
        timeCounter.append(` ${seconds}`);
        if (seconds < 1 || qNum > 4) {
            clearInterval(theTimer);
            endGame();
        }
        seconds--
    }, 1000);
    
    quizGo();
}
$(button1).on("click", function() {
    initDiv.remove();
    console.log("hi again");
    runQuiz();
 });

 $(`#clear-scores`).on("click", function(){
     localStorage.removeItem("score");
     scoreList.empty();
 })