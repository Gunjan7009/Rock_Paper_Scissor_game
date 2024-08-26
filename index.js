// Rules
document.getElementById('open-rules').addEventListener('click', function() {
    document.getElementById('rules-popup').classList.add('active');
});

document.getElementById('close-rules').addEventListener('click', function() {
    document.getElementById('rules-popup').classList.remove('active');
});
const rock = document.getElementById("rock");
rock.addEventListener("click",() => playGame("rock"));
const paper = document.getElementById("paper");
paper.addEventListener("click",() => playGame("paper"));
const scissors = document.getElementById("scissors");
scissors.addEventListener("click",() => playGame("scissors"));
const nextbutton = document.getElementById("next_btn");


// Check if this is a new session or a continuation of an existing one
if (!sessionStorage.getItem('sessionActive')) {
    // New session: Clear scores from local storage
    localStorage.removeItem('playerScore');
    localStorage.removeItem('computerScore');
    sessionStorage.setItem('sessionActive', 'true'); // Mark the session as active
}

// Initialize scores from local storage or set to 0 if not present
let playerScore = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;


// Display the initial scores on the screen
const playerScoreElem = document.querySelector('.scores .score:nth-child(2) .score-value');
const computerScoreElem = document.querySelector('.scores .score:nth-child(1) .score-value');

playerScoreElem.textContent = playerScore;
computerScoreElem.textContent = computerScore;


// Choices array for random selection by computer
const options = ['rock', 'paper', 'scissors'];

// Function to get computer's random choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

// Function to update scores in local storage
function updateScores() {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}

// Function to play the game
function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = getresult(playerChoice, computerChoice)
    // Determine the winner
    

    // Update the scores on the screen
    // playerScoreElem.textContent = playerScore;
    // computerScoreElem.textContent = computerScore;

    updateScores();
    changedisplay(playerChoice, computerChoice, result);
    
}

function getresult (playerChoice, computerChoice){
    if (playerChoice === computerChoice) {
        return `It's a draw! Both chose ${playerChoice}` ;
    }
     else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) 
    {
        playerScore++;
        return `You win aginest PC! ${playerChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        return `Computer wins! ${computerChoice} beats ${playerChoice}`;
    }
}
   const playagain = document.createElement("button")

   const Choicedisplay = document.createElement("div")

function changedisplay(playerChoice, computerChoice, result){
    document.querySelector(".choices").innerHTML='';

    const picture1 = document.createElement("img");
    const picture2 = document.createElement("img");

    picture1.src=`./images/${playerChoice}.jpg`;
    picture2.src=`./images/${computerChoice}.jpg`;

    picture1.alt = playerChoice
    picture2.alt = computerChoice

    picture1.classList.add('choice-img')
    picture2.classList.add('choice-img')

    let winningChoice;
    if (result.includes("You win")) {
        winningChoice = "player";
    } else if (result.includes("Computer wins")) {
        winningChoice = "computer";
    }


    Choicedisplay.innerHTML=`
    <div class="result">
        <div class="choice-section ${winningChoice === 'player' ? 'winning-choice' : ''}">
            <p class ="choice-text">YOU PICKED</p>
            <div class="choice-first">${picture1.outerHTML}</div>
        </div>
        <div class="final">
        <span class="text">${result}</span>
        <br>
        <br>
        <button class="play-btn">Play Again</button>
        </div>
        <div class="choice-section  ${winningChoice === 'computer' ? 'winning-choice' : ''}">
            <p class ="choice-text">PC PICKED</p>
            <div class="choice-second">${picture2.outerHTML}</div>
        </div>
       
    </div>`
    document.querySelector(".choices").appendChild(Choicedisplay);
    document.querySelector(".play-btn").addEventListener('click',()=>{
        window.location.reload();
    })
    
    // Show the "Next" button only if the player wins
    if (result.includes("You win")) {
        nextbutton.style.visibility = "visible";
    } else {
        nextbutton.style.visibility = "hidden";
    }
}



