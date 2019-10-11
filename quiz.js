"use strict";
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");
//Spørgsmål fra klassen
var questions = [
    {
        //sjov med xss
        question: "<b style=\"color:red\">Skal man altid bruge innerHTML?</b><img src='x' onerror='let a = document.querySelector(\"#A\");let b = document.querySelector(\"#B\");let c = document.querySelector(\"#C\"); for(let i = 0; i < 12; i++) { let clone = a.parentNode.appendChild(a.cloneNode(true)).addEventListener(\"click\", function(){ let elms = document.querySelectorAll(\"#A\"); console.log(elms); for(let x = 1; x < elms.length; x++){a.parentNode.removeChild(elms[x]);} a.style=\"\"; b.style = \"\"; c.style=\"\"; });console.log(clone);} a.style.display=\"none\"; b.style.display = \"none\"; c.style.display = \"none\";'>",
        imgSrc: "img/xss.jpg",
        choiceA: "Nej!",
        choiceB: "",
        choiceC: "",
        correct: "A"
    },
    {
        question: "Hvad betyder MAGNO på latinsk",
        imgSrc: "img/DramaticQuestionMark.png",
        choiceA: "Den Hurtige",
        choiceB: "Den Lille",
        choiceC: "Den Store",
        correct: "C"
    },
    {
        question: "Hvem opfandt JavaScript?",
        imgSrc: "img/javascript.png",
        choiceA: "John Resig",
        choiceB: "Brendan Eich",
        choiceC: "Mitchell Baker",
        correct: "B"
    },
    {
        question: "Hvem sørgede for kage op til efterårsferien??",
        imgSrc: "img/cake.png.png",
        choiceA: "Gandalf",
        choiceB: "Marianne",
        choiceC: "Julemanden",
        correct: "B",
    },
    {
        question: "hvad skal der stå der kig på billedet",
        imgSrc: "img/dsad.jpg",
        choiceA: "setAutoSpawn",
        choiceB: "AutoSpawn",
        choiceC: "Spawn",
        correct: "A",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        imgSrc: "img/javas1.jpg",
        choiceA: "Javascript",
        choiceB: "js",
        choiceC: "script",
        correct: "C"
    },
    {
        question: "Hvad hedder vores uddannelse?",
        imgSrc: "img/html.png",
        choiceA: "Webintegrator",
        choiceB: "Webudvikler",
        choiceC: "Fronted Udvikler",
        correct: "B"
    },
    {
        question: "Hvis man lider af Hippopotomonstrosesquippedaliophobia - hvad er det så man frygter?",
        imgSrc: "img/frygt.jpg",
        choiceA: "Lange ord",
        choiceB: "Opvaskebaljer",
        choiceC: "Flodheste",
        correct: "A"
    },
    {
        question: "Hvad er specielt ved const?",
        imgSrc: "img/const.png",
        choiceA: "Kan få givet en værdi ligemeget hvornår",
        choiceB: "Kan ikke få tildelt en ny værdi",
        choiceC: "At den definerer en konstant værdi",
        correct: "B"
    },
    {
        question: "Hvor mange scener er der på Roskile Festival?",
        imgSrc: "img/roskilde.png",
        choiceA: "5",
        choiceB: "10",
        choiceC: "8",
        correct: "C"
    }
];
var lastQuestion = questions.length - 1;
var questionTime = 10;
var gaugeWidth = 150;
var gaugeUnit = gaugeWidth / questionTime;
var runningQuestion = 0;
var count = 0;
var TIMER;
var score = 0;
function renderQuestion() {
    var q = questions[runningQuestion];
    //Vis spørgsmålene
    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
start.addEventListener("click", startQuiz);
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}
function renderProgress() {
    //Viser fremskridt via små cirkler. 
    for (var qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}
function renderCounter() {
    if (count <= questionTime) {
        //Hvis tiden stadig er i gang
        counter.innerHTML = count.toString();
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    }
    else {
        //Hvis tiden er løbet ud.
        count = 0;
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            //Hvis det ikke er sidste spørgsmål
            runningQuestion++;
            renderQuestion();
        }
        else {
            //Hvis det er sidste spørgsmål, så hvis score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
function checkAnswer(answer) {
    //Hvis svaret matcher det korrekte var
    if (answer == questions[runningQuestion].correct) {
        score++;
        answerIsCorrect();
    }
    else {
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    }
    else {
        clearInterval(TIMER);
        scoreRender();
    }
}
function answerIsCorrect() {
    document.getElementById(runningQuestion.toString()).style.backgroundColor = "#0f0";
}
function answerIsWrong() {
    document.getElementById(runningQuestion.toString()).style.backgroundColor = "#f00";
}
function scoreRender() {
    scoreDiv.style.display = "block";
    var scorePerCent = Math.round(100 * score / questions.length);
    //Hvis billede ud fra hvor godt det gik.
    var img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
                (scorePerCent >= 20) ? "img/2.png" :
                    "img/1.png";
    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}
