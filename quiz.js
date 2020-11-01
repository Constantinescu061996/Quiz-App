//  select all elements in JavaScript
var start = document.getElementById("start");

var quiz = document.getElementById("quiz");

var qImg = document.getElementById("qImg");

var question = document.getElementById("question");

var counter = document.getElementById("counter");

var timeGauge = document.getElementById("timeGauge");

var choiseA = document.getElementById("A");
var choiseB = document.getElementById("B");
var choiseC = document.getElementById("C");

var progress = document.getElementById("progress");

var scoreDiv = document.getElementById("scoreContainer");

// create our questions

var  questions = [

    {
        question:"What is the latest version of html?",
        imgSrc: "img/html.png",
        choiceA: "HTML5",
        choiceB: "HTML7",
        choiceC: "HTML4",
        correct: "A"
    
    },{
    
        question:"What does CSS stand for?",
        imgSrc: "img/css.png",
        choiceA: "Computer Style Sheets",
        choiceB: "Cascading Style Sheets",
        choiceC: "Color Style Sheets",
        correct: "B"
    
    },{
        question:"Inside which HTML element do we put the JavaScript code?",
        imgSrc: "img/js.png",
        choiceA: "script",
        choiceB: "javascript",
        choiceC: "js",
        correct: 'A'
    
    }
    ];

// create important variables

var lastQuestion = questions.length -1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; //10 seconds
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;



// render a question 


function renderQuestion(){
    
    var q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiseA.innerHTML = q.choiceA;
    choiseB.innerHTML = q.choiceB;
    choiseC.innerHTML = q.choiceC;
    

}

 start.addEventListener('click',startQuiz);
// start quiz

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
    
    

}

//  render progress
function renderProgress (){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex ++ ){
    
        progress.innerHTML += "<div class ='prog' id=" +qIndex +"></div>";
        
    }
}

// counter render




function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    }else{
        count = 0;
        answerIsWrong()
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();   
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
// for correct

// to check the Answers

function checkAnswer(answer){

    if( answer == questions[runningQuestion].correct){
        score ++;
        // for correct
        answerIsCorrect();
    }else{
        //  if the answer is wrong,it's need to change the  color  in red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
        
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
        
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}


function scoreRender(){
 scoreDiv.style.display = 'block';
    
    // calculate the amount the question 
    
    const scorePerCent = Math.round(100*score/questions.length);
    
    var  img = (scorePerCent >= 80) ? "img/5.png":
                (scorePerCent >= 60) ? "img/4.png":
                (scorePerCent >= 40) ? "img/3.png":
                (scorePerCent >= 20) ? "img/2.png":
                "img/1.png";
                
        scoreDiv.innerHTML = "<img src = "+ img +">"   ;
    
        scoreDiv.innerHTML += "<p>"+  scorePerCent +"%</p>";
}

