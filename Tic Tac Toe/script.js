console.log("Welcome to Tic Tac Toe");
let music=new Audio("music.mp3");
let AudioTurn=new Audio("ting.mp3");
let gameover=new Audio("gameover.mp3");

let turn = "X";

//function to chane the turn
const changeTurn = ()=>{
    return turn === "X"? "O":"X";
}

//game Logic
