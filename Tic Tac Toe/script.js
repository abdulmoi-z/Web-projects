console.log("Welcome to Tic Tac Toe");
//audio variables
let music=new Audio("music.mp3");
let AudioTurn=new Audio("ting.mp3");
let GameOverAudion=new Audio("gameover.mp3");
//variable to track the turns of each player
let turn = "X";
//bool to track the game over condtion
let GameOver = false;
//function to chane the turn
const changeTurn = ()=>{
    return turn === "X"? "O":"X";
}

//Logic for winning conditions
CheckWin = ()=>{
    // targeting the each box's text to match the occurance of X or O
    let boxtext=document.getElementsByClassName("BoxText");
    //all the win conditions along with the x,y positions and rotations for line animation
    let wins =[
        [0,1,2,3,5,0],
        [3,4,5,3,15,0],
        [6,7,8,3,25,0],
        [0,3,6,-7.5,15,90],
        [1,4,7,2.5,15,90],
        [2,5,8,12.5,15,90],
        [0,4,8,3,15,45],
        [2,4,6,3,15,135],
    ]
    //iterating each box to check for win conditions by matching the inner texts
    wins.forEach(e=>{
        if(
            (boxtext[e[0]].innerText===boxtext[e[1]].innerText) && 
            (boxtext[e[2]].innerText===boxtext[e[1]].innerText) && 
            (boxtext[e[0]].innerText!=="")){
                //displaying the player tg that won 
                document.querySelector(".Info").innerText = boxtext[e[0]].innerText + " Won!";
                //displaying the winning gif
                document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="200px" ;
                //line animation display
                document.querySelector(".line").style.width = "25vw";
                document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            GameOver = true;
        }
    });
}

//game Logic
let boxes = document.getElementsByClassName("Box");
//selecting each box as am array 
Array.from(boxes).forEach(element =>{
    //selecting the text inside the box
    let boxtext = element.querySelector('.BoxText');
    // adding the funtion in case of clicking the text
    element.addEventListener('click', ()=>{
        //if the text is empty then print 
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            //changing turn
            turn = changeTurn();
            //changing turn audio
            AudioTurn.play();
            CheckWin();
            if(!GameOver){
                document.getElementsByClassName("Info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

//replay button logic
let Replay = document.getElementById('Replay');
Replay.addEventListener('click',()=>{
    Array.from(boxes).forEach(element =>{
        let boxtext = element.querySelector('.BoxText');
        boxtext.innerText = "";
    });
    turn = "X"; // reset turn
    GameOver = false; // reset game
    document.querySelector(".Info").innerText = "Turn for " + turn; //rest turn display
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="0" ;  //reset gif
    document.querySelector(".line").style.width = "0vw";    //hide line
});