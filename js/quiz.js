var app = {
    getQuiz: function() {
        var url = "https://opentdb.com/api.php?amount=10&type=multiple";
        $.getJSON(url, function(data) {
            var correctOption = -1;

            var fetchQuestion = function(question) {
                console.log(question);
                var questionNumber = data.results.indexOf(question) + 1;
                $("#question").html(questionNumber + ". " + question.question);
                correctOption = Math.floor(Math.random() * 4);
                for (i = 0; i < 4; i++) {
                    if (correctOption == i) {
                        $("#option" + i).html(question.correct_answer);
                    } else {
                        $("#option" + i).html(question.incorrect_answers.pop());
                    }
                }
                highlightOption(-1); // Clears selection
            };

            var selectedAnswer = -1;

            var highlightOption = function(selectedIndex) {
                for (i = 0; i < 4; i++) {
                    $("#option" + i).removeClass("selected");
                }
                if (selectedIndex >= 0) {
                    selectedAnswer = selectedIndex;
                    $("#option" + selectedIndex).addClass("selected");
                    $("#checkAnswer").show();
                } else {
                    selectedAnswer = -1;
                    $("#checkAnswer").hide();
                }
            };

            $("#option0").click(function() {
                highlightOption(0);
            });
            $("#option1").click(function() {
                highlightOption(1);
            });
            $("#option2").click(function() {
                highlightOption(2);
            });
            $("#option3").click(function() {
                highlightOption(3);
            });

            var currentQuestion = 0;
            fetchQuestion(data.results[currentQuestion]);
            $("#nextQuestion").hide();
            $("#scorecard").html("Score is 0/10");

            var score = 0;

            $("#checkAnswer").click(function() {
                $("#option" + correctOption).addClass("correct");
                if (selectedAnswer === correctOption) {
                    score++;
                    $("#scorecard").html("Correct! Your score is: " + score);
                } else {
                    $("#option" + selectedAnswer).addClass("incorrect");
                    $("#scorecard").html("Incorrect. Your score is: " + score);
                }
                $("#nextQuestion").show();
                $("#checkAnswer").hide();
            })

            $("#nextQuestion").click(function() {
                currentQuestion++;
                if (currentQuestion >= 10) {
                    $("#scorecard").html("Quiz complete! You scored " + score);
                } else {
                    $("#option" + selectedAnswer).removeClass("incorrect");
                    $("#option" + correctOption).removeClass("correct");
                    fetchQuestion(data.results[currentQuestion]);
                    $("#scorecard").html(`${score} / 10`);
                }
                $("#nextQuestion").hide();
            });

        }); 
    },

    refresh: function() {
        $("#quiz").html("");
        this.getQuiz();
    }
};

app.getQuiz();