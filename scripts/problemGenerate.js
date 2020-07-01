
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
    return "$$\\int\\limits_0^2 {3{x^2}} $$ \n $$\\int\\limits_0^\\pi  {\\sin (x)} $$";
  } else{
    return "There was an error reading finding the type of problem.";
  }
}

function findSolution(type, index){
  if (type =='d'){
    var sol = "-2\ncos(x)\ne^x\n-sin(x)\n1/x";
  }else if (type == 'i'){
    var sol = "8\n1";
  }
  var split = sol.split('\n');
  return split[index];
}
