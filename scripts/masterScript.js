function generateProblem(type){
  var map = createArray(type);

  if (localStorage.problemsGenerated) {
    localStorage.problemsGenerated = Number(localStorage.problemsGenerated) + 1;
  } else {
    localStorage.problemsGenerated = 1;
  }

  for (const [key, value] of map) {
    var text = key;
    sessionStorage.solution = value;
  }
  if (type == 'i'){
    document.getElementById("title").innerHTML = "Find the solution to " + text;
  } else{
    document.getElementById("title").innerHTML = "Find the first derivative of " + text;
  }
 MathJax.typeset();
}

function checkAnswer(){
    // Will not check the answer if there is no problem presented.
    // Checks if the title text is not presenting a problem (i.e waiting for an answer).
    if (checkIfProblem(document.getElementById("title").innerHTML)){
      console.log("problem not found");
      return;
    }
    var answer = document.getElementById("answerBox").value;
    if (answer == sessionStorage.solution){
      document.getElementById("title").innerHTML = "Correct! Answer: " + answer;
      addStats(true);
    } else{
      document.getElementById("title").innerHTML = "Incorrect. Answer: " + sessionStorage.solution;
      addStats(false);
    }
      document.getElementById("answerBox").value = "";
}

function reportStats(){
  var accur = 100 * localStorage.correctAnswers / localStorage.guesses;
  accur = accur.toFixed(1);
  document.getElementById("title").innerHTML = "Problems generated: " + localStorage.problemsGenerated + " Correct answers: "
  + localStorage.correctAnswers + " Questions anwsered: " + localStorage.guesses + " Accuracy: " + accur + "%";
}
// Splits the string at every space and returns a random element from said Splits
// Accepts a type ('d' or 'i') representing the desired type of problem.
// Returns a problem.
function createArray(type){
  var str = findFile(type);
  var array = str.split('\n');
  var index = Math.floor(Math.random()*(array.length));
  var value = array[index];
  var solution = findSolution(type, index);

  let myMap = new Map()
  myMap.set(value, solution);
  return myMap;
  }

function findFile(type){
  if (type == 'd'){
    return "$$ 1 - 2x$$ \n $$\\sin (x)$$ \n $$ {e^x}$$ \n $$ \\cos (x)$$ \n $$ \\ln (x)$$";
  } else if (type == 'i'){
    return "$$\\int\\limits_0^2 {3{x^2}} $$ \n $$\\int\\limits_0^\\pi  {\\sin (x)} $$ \n $$\\int\\limits_1^4 {{x^2} + 4} $$";
  } else{
    return "There was an error reading finding the type of problem.";
  }
}

function findSolution(type, index){
  if (type =='d'){
    var sol = "-2\ncos(x)\ne^x\n-sin(x)\n1/x";
  }else if (type == 'i'){
    var sol = "8\n1\n33";
  }
  var split = sol.split('\n');
  return split[index];
}

function addStats(correct){
  if (correct){
    if (localStorage.correctAnswers) {
      localStorage.correctAnswers = Number(localStorage.correctAnswers) + 1;
    } else {
      localStorage.correctAnswers = 1;
    }
  }
  addTotal();
}

function addTotal(){
  if (localStorage.guesses) {
    localStorage.guesses = Number(localStorage.guesses) + 1;
  } else {
    localStorage.guesses = 1;
  }
}

function resetStats(){
  localStorage.guesses = 0;
  localStorage.correctAnswers = 0;
  localStorage.problemsGenerated = 0;
  reportStats();
}

function enterText(event){
  if (event.keyCode === 13){
    checkAnswer();
  }
}

function checkIfProblem(text){
  if (text == "Derivabator" || text.includes("Correct!") || text.includes("Incorrect.")){
    return true;
  }
}
