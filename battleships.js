// This is the controller
$(document).ready(function(){
  tableLoop();
  boardData();
  callShip();
// This is the click to change color to red and counts torpedos
  $("td").click(function() {
    // This splits the class into coordinates
    var split = $(this).attr('class').split("");
    var row = split[0];
    var column = split[1];
    console.log(split);
    //checks for a hit and changes color to red
    if (board[row][column] === 1) {
      console.log('HIT!');
      hits++;
      $(this).css("background-color", "red");
      // $(this).addClass("hit");
      if (hits === 5){
        console.log("You win!");
      }
    }
    //checks for a miss and changes color to blue
    else{
      console.log("MISS!");
      $(this).css("background-color", "#00c0ff");
      if(torpedos === 0){
        console.log("You lose!!");
        $(".shipLocation").css("border-color", "red");
      }
    }
      $("#torpedos").text("Torpedos Remaining: " + torpedos--);
      $(this).off("click");
  });
});

// This is the model
// fucntion to makle the table 10 x 10
var torpedos = 0;
var hits;
var board = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];
//array of different ship lengths
 const ships = [5, 4, 4, 3, 3, 2, 2, 1];
function tableLoop() {
  var table = $("<table> </table>");
  // loop to make rows
  for (i = 0; i < 10; i++) {
    var row = $("<tr></tr>").addClass([i]);
    $(table).append(row);
    // loop to make 100 td
      for (var j = 0; j < 10; j++) {
        var stuff = $("<td></td>").addClass([i] + [j]);
        $(row).append(stuff);
      }
  }
  // adding table to html
  $(".board").append(table);
}
//makes the board model
function boardData() {
  for(var i= 0; i < 10; i++) {
    for(var j=1; j < 10; j++){
      board[i][j] = 0;
    }
  }
}

/**
 * Create 5 ships in the board array
 **/
 var counter = 0
function callShip() {
  //loops through different ships
  for (var i=0; i<ships.length; i++){
    var ship = ships[i];
    // Do-while loop for the random numbers while there in another ship
    do {
      var column = Math.floor(Math.random() * 10);
      var row = Math.floor(Math.random() * 10);
      // if
      console.log("row is " + row);
      console.log("column is " + column);
    } while (board[row][column] === 1);
    //calculate vertical or horizontal
    var direction = Math.floor(Math.random() * 2);
    //checks for surrounding ships
    var shipPositionWorks;
    //if direction is vertical
    if(direction === 0){
      //when checking for fitment if it overflows the edge, go the opposite direction
      if(row + ship > 9){
        //checking each spot for ship placement
        for(j=0; j<ship; j++){
          console.log('J: ', row - j);
          //checks for space around
          shipPositionWorks = checkSpace(row - j, column);
          //if there are ships around, stop running the loop
          if(shipPositionWorks === true){
            break;
          }
        }
        //if there are ships around, find another starting coordinate
        if(shipPositionWorks === true){
          i--;
          continue;
        }
        //if there are no ships around place the ship
        for(j=0; j<ship; j++){
          board[row - j][column]  = 1;
          var pop = "." + (row - j) + column;
          $(pop).addClass('shipLocation');
        }
        //when checking for fitment if it overflows the edge, go the opposite direction
      }else{
        for(j=0; j<ship; j++){
          console.log('J2: ', row + j);
          shipPositionWorks = checkSpace(row + j, column);
          if(shipPositionWorks === true){
            break;
          }
        }
        if(shipPositionWorks === true){
          i--;
          continue;
        }
        for(j=0; j<ship; j++){
          board[row + j][column]  = 1;
          var pop = "." + (row + j) + column;
          $(pop).addClass('shipLocation');
        }
      }
    }
    else{
      if(column + ship > 9){
        for(j=0; j<ship; j++){
          console.log('J3: ', column - j);
          shipPositionWorks = checkSpace(row, column - j);
          if(shipPositionWorks === true){
            break;
          }
        }
        if(shipPositionWorks === true){
          i--;
          continue;
        }
        for(j=0; j<ship; j++){
          board[row][column - j]  = 1;
          pop = "." + row + (column - j);
          $(pop).addClass('shipLocation');
        }
      }else{
        for(j=0; j<ship; j++){
          console.log('J4: ', column + j);
          shipPositionWorks = checkSpace(row, column + j);
          if(shipPositionWorks === true){
            break;
          }
        }
        if(shipPositionWorks === true){
          i--;
          continue;
        }
        for(j=0; j<ship; j++){
          board[row][column + j]  = 1;
          pop = "." + row + (column + j);
          $(pop).addClass('shipLocation');
        }
      }
    }
  console.log(board);
  }
}

//checks for space around each position around and allows for placement on edges
function checkSpace(row, column){
    for (var k = row-1; k<row+2; k++){
      //console.log("row position " + k);
      for(var l= column-1; l<column+2; l++){
        //console.log("column position " + l);
        if (k >= 0 && k <= 9 && l >= 0 && l <= 9) {
          if(board[k][l] === 1){
            return true;
          }
        }
      }
  }
  return false;
}
