//variable
var questionArray = ["Nemo is a puffer fish", "Porcupines can float", "Polar bear skin color is black", "The name of Batman's butler is Albert", "Cows sleep standing up"];
var answer = ["False", "True", "True", "False", "True"]
var Correct = 0;
var Wrong = 0;

//buttons
$("#startButton").on("click", start);
$("#submit").on("click", submit);
$("#restartB").on("click", reset);

//clock variable
var timer;
var timerOn = false;
var time = 0;
var maxTime = 30;


//Setting up game state
function start() {
    time = maxTime;
    Correct = 0;
    Wrong = 0;
    if (!timerOn) {
        timer = setInterval(decrement, 1000);
        timerOn = true;
        $("#startButton").css("visibility", "hidden");
        $("#restartB").css("visibility", "hidden");
        $("#submit").css("visibility", "visible");
        $("fieldset").css("visibility", "visible");
        
        initialize()
    }
}
//Game running - Generate the input, label, p, on the HTML 
function initialize() {
    
    for (var i = 0; i < questionArray.length; i++) {
        var question = document.createElement("p")
        $("fieldset").append(question);
        $(question).text(questionArray[i]);


        var fill1 = document.createElement("label");
        var fill2 = document.createElement("label");
        $("fieldset").append(fill1, fill2);

        var data1 = document.createElement("input");
        data1.setAttribute("type", "radio");
        data1.setAttribute("id", "inputTrue" + i);
        data1.setAttribute("name", "question" + i);
        data1.setAttribute("value", "True");
        $(fill1).text("True");

        var data2 = document.createElement("input");
        data2.setAttribute("type", "radio");
        data2.setAttribute("id", "inputFalse" + i);
        data2.setAttribute("name", "question" + i);
        data2.setAttribute("value", "False");
        $(fill2).text("False");

        

        $("fieldset").append(data1, data2)
    
    $(fill1).append(data1);
    $(fill2).append(data2);
    }

}
//Stop the game and bring user to result page
function submit() {
    clearInterval(timer);
    timerOn = false;
    result ();
}
// Decrease time and once reach 0, stop the game and take to result page.
function decrement() {
    time--;
    $("#display").text(time);
    if (time === 0) {
        $("#display").text("Time's up!")
        submit();
    }

}
//Check the user choice and add pts to Correct or Wrong
function result() {
    
    for( let i = 0; i < questionArray.length; i++) {
        var inputTrue = $("#inputTrue"+i);
        var inputFalse = $("#inputFalse"+i);
        
        if(answer[i] == "True"){
            if(inputTrue.prop("checked")){
                Correct++;
            }
            else{
                Wrong++;
            }
        }
        else{
            if(inputFalse.prop("checked")){
                Correct++;
            }
            else{
                Wrong++;
            }
        }
    }
    $("#submit").css("visibility", "hidden");
    $("#restartB").css("visibility", "visible");
    $("#right").text("Correct: " + Correct);
    $("#wrong").text("Wrong: " + Wrong);
    $("#Result").css("visibility", "visible");

}
//reset
function reset () {
    time = maxTime;
    Correct = 0;
    Wrong = 0;
    if (!timerOn) {
        timer = setInterval(decrement, 1000);
        timerOn = true;
        $("#Result").css("visibility", "hidden");
        $("#startButton").css("visibility", "hidden");
        $("#restartB").css("visibility", "hidden");
        $("#submit").css("visibility", "visible");
        $("fieldset").css("visibility", "visible");
        $("#right").text("");
        $("#wrong").text("");
    }
}