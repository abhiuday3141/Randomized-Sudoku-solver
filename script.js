var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]
var PuzzleInstalled=false;
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}

function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    PuzzleInstalled=false;
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {

        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
        PuzzleInstalled=true;
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}



function isSafe(board,r,c,no){


    //not repeating in the same row or column 
    for(var i=0;i<9;i++){
        if(board[i][c]==no || board[r][i]==no){
            return false;
        }
    }
    //subgrid
    var sx = r - r%3;
    var sy = c - c%3;

    for(var x=sx;x<sx+3;x++){
        for(var y=sy;y<sy+3;y++){
            if(board[x][y]==no){
                return false;
            }
        }
    }

    return true;
}
var m = new Array(81);
  
for (var i = 0; i < m.length; i++) {
    m[i] = [];
}


function solveSudokuHelper(board,r,c){

    //base case 
    if(r==9){
        changeBoard(board);
        return true;
    }
    //other cases 
    if(c==9){
        return solveSudokuHelper(board,r+1,0);
    }
    //pre-filled cell, skip it
    if(board[r][c]!=0){
        return solveSudokuHelper(board,r,c+1);
    }

    //there is 0 in the current location
    let digit;
    for(var i=0;i<9;i++){
          
        digit=m[9*r+c][i];

        if(isSafe(board,r,c,digit)){
            board[r][c] = digit;
            var success = solveSudokuHelper(board,r,c+1);
            if(success==true){
                return true;
            }
            //backtracking step
            board[r][c] = 0;
        }

    }
    return false;

}
function solveSudoku(board) {
    var n=9;
      
   var val;
   var b=[];
   var mod;
 

      for(let i=0;i<9;i++)
      {
          for(let j=0;j<9;j++)
          {
             val=i*9+j;
             mod=9;
             for(let i=0;i<9;i++)
        b[i]=i+1;
         while(mod>0)
         {
        let p=Math.floor(Math.random()*100+1)%mod;
        m[val].push(b[p]);
        b[p]=b[mod-1];
        mod--;
         }

        
          
          }
      }
    
    solveSudokuHelper(board,0,0);
}

function BoardEmpty() {

    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(arr[i][j]!=0)
            return false;
        }
    }
    return true;
   

}
solve.onclick = function () {

    if(PuzzleInstalled)
    solveSudoku(board)
    else
    alert("Please Generate Puzzle First");
}