let run = 1; //this is for checking how many times a player has played; playing at the start sets it to 1
let numSquares = 6;
let colors = generateRandomColors(numSquares);
let squares = document.querySelectorAll(".square");
let pickedColor = pickColor();
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let easyBtn = document.querySelector("#easyBtn");
let hardBtn = document.querySelector("#hardBtn");

colorDisplay.textContent = pickedColor;

easyBtn.addEventListener("click", function(){
    ++run; //increment every time player plays again
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(let i = 0; i < squares.length; i++ ) {
        if(colors[i]) {
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function(){
    ++run; //increment every time player plays again
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(let i = 0; i < squares.length; i++ ) {  
            squares[i].style.background = colors[i];
            squares[i].style.display = "block";      
    }
});

resetButton.addEventListener("click",function(){
    ++run; //increment every time player plays again
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    //change colors of the squares
    for(let i = 0; i < squares.length; i++ ) {
        squares[i].style.background = colors[i];
    }
    h1.style.background = "steelblue";
    messageDisplay.textContent = " ";
    this.textContent = "New Colors";
    
});

for(let i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.background = colors[i];
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
    //check color of clicked square
    //compare to picked color
    let clickedColor = this.style.background;
        if(clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again";
            changeColors(pickedColor);
            h1.style.background = clickedColor;
        } else {
            this.style.background = "#232323";
            messageDisplay.textContent = "Try Again";
        }
            
    });
}

function changeColors(color) {
    //loop through all squares
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
    //change each 
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array of colors
    let arr = [];
    //add num random Colors
    //repeat num times
    //if more than one time played
    if(run > 1){
        let getCurrentColorDisplay = document.getElementById("colorDisplay");
        let getRGBValues = getCurrentColorDisplay.textContent.match(/[+-]?\d+(?:\.\d+)?/g);
        for(let i = 0; i < num; i++) {
            arr.push(randomColor(getRGBValues[0], getRGBValues[1], getRGBValues[2]));
        }
    }else{
        for(let i = 0; i < num; i++) {
            arr.push(randomColor(0,0,0));
        }   
    }
    //return array
    return arr;
}

function randomColor(oldRed,oldGreen,oldBlue) { //gets the old value
    //added modulo 255 to formula to generate picking colors from 0-255
    //pick red 0-255
    let r = (Math.floor(Math.random() * (256 - oldRed)) + oldRed) % 256;
    //pick green 0-255
    let g =  (Math.floor(Math.random() * (256 - oldGreen)) + oldGreen) % 256;
    //pick blue 0-255
    let b =(Math.floor(Math.random() * (256 - oldBlue)) + oldBlue) % 256;
    return `rgb(${r}, ${g}, ${b})`;
}
