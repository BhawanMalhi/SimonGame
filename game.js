// an array of colors
var buttonColours =["red","blue","green","yellow"];
 //an array to fill up the colorspattern
var gamePattern =[];
var userClickedPattern =[];
//A var to keep trap the game has started when
//user press buttonColours
var started = false;
//var to see the levels
var level=0;
// on the fisrt key press it will change the text of h1 and then
//call funtion nextSequence and then started = true
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started =true;
  }
});

//function is taking user answers to the game
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber= Math.floor(Math.random()*4);
  // a variable that chooses random colour
  var randomChosenColour = buttonColours[randomNumber];
  // adding that color to the empty array
  gamePattern.push(randomChosenColour);
  //jquery to choose random button and adding flash effect
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  playSound(randomChosenColour);
}
//crteating a function that will play sound of the value inputted
function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
//a function when clicked on button the style change to pressed class and then after 100
//millisecond that style again go to normal
function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function (){
  $("#"+currentColor).removeClass("pressed");},100);
}
function checkAnswer(currentLevel)
{
 if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
 {
   console.log("sucess");

 if(userClickedPattern.length===gamePattern.length)
 {
   setTimeout(function()
   {
     nextSequence();
   },1000);

 }
}
 else{
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function (){
   $("body").removeClass("game-over");},200);
  $("#level-title").text("Game over ,Press any key to restart");
  startOver();
 }
}
function startOver()
{
  gamePattern=[];
  level=0;
  started=false;
}
