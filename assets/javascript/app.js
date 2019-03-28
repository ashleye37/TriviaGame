$(document).ready(function() {
    
    var counter = 10; 
    var timer;
    var currentQuestion;
    var currentQuestionIndex = 0;
    var correctAnswers = [];
    var incorrectAnswers = [];

    var triviaQuestions = [{
          question: "What is the name of Will Smith’s character in Independence Day?",
          choices: ["Captain Steven Hiller", "Sargent Dan", "Michael Jordan", "Ryan Reynolds"],
          image: ["../images/q1image.jpeg"],
          answer: "Captain Steven Hiller"
        },
        
        {
          question: "Which 1997 film stars Nicolas Cage, John Cusack, and John Malkovich?",
          choices: ["Face Off", "Con Air", "Gone in 60 seconds", "National Treasure"],
          image: ["../images/q2image.jpeg"],
          answer: "Con Air"
        },

        {
            question: "How many people were killed in the 1996 film Scream?",
            choices: ["8", "5", "7", "4"],
            image: ["../images/q3image.jpeg"],
            answer: "7"
        },
          
        {
            question: "What year was Forrest Gump released?",
            choices: ["1987", "1992", "1998", "1994"],
            image: ["../images/q4image.jpeg"],
            answer: "1994"
        },

        {
            question: "What year was the song “My Heart Will Go On” from Titanic released?",
            choices: ["1985", "1992", "1997", "1995"],
            image: ["../images/q5image.jpeg"],
            answer: "1985"
        },
          
        {
            question: "Which 90’s movie soundtrack is the best-selling soundtrack of all time?",
            choices: ["Titanic", "The Bodyguard", "Forrest Gump", "Fast and the Furious"],
            image: ["../images/q6image.jpeg"],
            answer: "The Bodyguard"
        },
  
        {
              question: "What movie is this quote from? You can’t handle the truth!",
              choices: ["Home Alone", "Rush Hour", "The Sixth Sense", "A Few Good Men"],
              image: ["../images/q7image.jpeg"],
              answer: "A Few Good Men"
        },
            
        {
              question: "Which 90’s animated film was Disney’s first ever DVD?",
              choices: ["Fern Gully", "Mulan", "Lion King", "Hercules"],
              image: ["../images/q8image.jpeg"],
              answer: "Mulan"
        },

        {
            question: "In Jumanji, a stampede is released. What is the slowest animal??",
            choices: ["Zebra", "Antelope", "Rhinoseros", "Lion"],
            image: ["../images/q9image.jpeg"],
            answer: "Rhinoseros"
      },
          
      {
            question: "What was Adam Sandler's occupation in Big Daddy?",
            choices: ["Janitor", "Construction Worker", "Landscaper", "Toll Booth Worker"],
            image: ["../images/q10image.jpeg"],
            answer: "Toll Booth Worker"
        }
    ];

    $("#questionDIV").hide();
    $("#alerts").hide();

    // Starts the Trivia Game and displays the questions.
    $("#startButton").on("click", function startTimer() {
        currentQuestion = triviaQuestions[0];
        displayQuestion(currentQuestion);
        $("#questionDIV").show();
        $("#instructions").hide();
        correctAnswers = [];
        incorrectAnswers = [];
        currentQuestionIndex = 0;
    });

    // Displays the next question in the game and hides the previous alert.
    function displayQuestion(arg) {
        setTimer();
        $("#alerts").hide();
        $("#questionDisplay").html(arg.question);
        $("#choice1").html(arg.choices[0]);
        $("#choice2").html(arg.choices[1]);
        $("#choice3").html(arg.choices[2]);
        $("#choice4").html(arg.choices[3]); 
    };

    //Sets the timer for the game.
    function setTimer() {
        counter = 11;
        clearInterval(timer);
        timer = setInterval (countDown, 1000);
    };

    //Sets the count down for the timer after it has been set.
    function countDown() {
        counter--;
        $("#timer").html("<h2> Timer: 00:" + counter + "</h2>");
        timeOut();
    };

    //Displays alert that the player is correct when function is called.
    function yourRight() {
        $("#alerts").html("<h2> You are correct! </h2>");
        $("#alerts").show();
        stopTimer();
        setTimeout(function(){nextQuestion()}, 1000);
        correctAnswers.push(currentQuestion);
    };
    
    //Displays alert that the player is incorrect or ran out of time when function is called.
    function yourWrong(updateAlert) {
        if (updateAlert) {
            $("#alerts").html("<h2> The timer ran out! The correct answer was " + currentQuestion.answer + "</h2>");
            $("#alerts").show();
            stopTimer();
            setTimeout(function(){nextQuestion()}, 1000);
            incorrectAnswers.push(currentQuestion);
        } else {
        $("#alerts").html("<h2> You are incorrect! The correct answer was " + currentQuestion.answer + "</h2>");
        $("#alerts").show();
        stopTimer();
        setTimeout(function(){nextQuestion()}, 1000);
        incorrectAnswers.push(currentQuestion);
        };    
    };

    //Checks to see if the answer is correct or not and uses the correct function.
    $(".checkAnswer").on("click", function checkAnswer () {
        if (this.innerHTML === currentQuestion.answer) {
            yourRight();
        }
        if (this.innerHTML !== currentQuestion.answer) {
            yourWrong();
        }
    });

    //Moves game to the next trivia question when called and hides or shows alerts.
    function nextQuestion(){
        $("#alerts").hide();
        currentQuestion = triviaQuestions[currentQuestionIndex + 1];
        currentQuestionIndex++;
        if (currentQuestionIndex >= 10) {
            $("#alerts").html("<h2> Nice job! Click the Start 90s Trivia button to play again! <br> Questions Correct: " + correctAnswers.length + " <br> Questions Incorrect: " + incorrectAnswers.length + " </h2>");
            $("#alerts").show();
            stopTimer();
        } else {
        displayQuestion(currentQuestion);
        };
    };

    //Funtion that will run the correct your wrong alert if the timer runs out.
    function timeOut() {
        if (counter === 0) {
            yourWrong(true);
        }; 
    };

    //Completely stops the timer.
    function stopTimer() {
        clearInterval(timer);
    }

});