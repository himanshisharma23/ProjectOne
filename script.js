const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard=false;
let firstCard, secondCard;
let lockBoard=false;
let numberOfMoves=0, correctFlip=0;

function flipCard(){    
    if(lockBoard) return;
    if(this===firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard = this;
        return;
    }
    secondCard=this;
    isMatched();
}
function isMatched(){
    let isMatch = firstCard.dataset.framework===secondCard.dataset.framework;
    isMatch ? freezeCards() : unFlipCards();
}
function freezeCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    numberOfMoves++;
    correctFlip++;
    console.log(correctFlip);
    if(correctFlip===6){
        document.querySelector('.finished-game-box').style.visibility="visible";
        document.querySelector('.game-over-message').innerHTML =  `Well done! You have completed the game in ${numberOfMoves} moves.`;
    }
    resetCards();
}
function unFlipCards(){
    lockBoard=true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        numberOfMoves++;
        lockBoard=false;
        resetCards();
    },1000);
}
function resetCards(){
    firstCard= secondCard = null;
    hasFlippedCard=false;
}
function restartGame(){
    hasFlippedCard=false, lockBoard=false;
    firstCard=null, secondCard=null;
    numberOfMoves=0, correctFlip=0;
    document.querySelector('.finished-game-box').style.visibility="hidden";
    cards.forEach(card => {
        card.addEventListener('click',flipCard);
        card.classList.remove('flip');
    });
}
(function shuffle(){
    cards.forEach(card => {
        let randomNumber = Math.floor(Math.random()*12);
        card.style.order = randomNumber;
    });
})();
restartGame();
document.querySelector('.end-game-btn').addEventListener('click', ()=>{
    restartGame();
});