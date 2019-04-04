//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
    guessLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again - Event Listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
   let guess = parseInt(guessInput.value);

   //Validate
   if(isNaN(guess) || guess < min || guess > max) {
      setMessage(`Please enter a number between ${min} and ${max}`, 'red'); //Note: The text output utilises backticks (``)
   }

   //Check if won
   if (guess === winningNum) {
       //Game over --> won

       //goes to gameOver func - uses the true part of the turnary operator (left side)
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

   } else {
       //Wrong number
       guessLeft -=1;

       if (guessLeft === 0) {
            //Game over lost

            //goes to gameOver func - uses the false part of the turnary operator (right side)
           gameOver(false, `Game over - you lost. The correct number is: ${winningNum}`, 'red');
           
       } else {
           //Game continues - Answer wrong

           //Change border colour
           guessInput.style.borderColor = 'red';

           //Clear Input
           guessInput.value = '';

           // Tell user it's the wrong number + guesses left
           setMessage(`${guess} is not correct, ${guessLeft} guesses left`, 'red');
       }
   }
});

//Game over
function gameOver(won, msg) {
    let color; 
    won === true ? color = 'green' : color = 'red'; //uses turnary operator -> 'won' equals true color is green else(:) color is red

    //Disable input
    guessInput.disabled = true;
    // Change text colour
    message.style.color = color;
    //Change border colour
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg);

    //Play again?
    guessBtn.value = 'Play Again'; //Changes the text in the button
    guessBtn.className += 'play-again'; //Adds a class to the button - this links to the event listener (see above)

}

//Get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max-min + 1) + min); //generates random number between 1 - 10
}

//Set message
function setMessage(msg, colour){
   message.style.color = colour
   message.textContent = msg;
}
