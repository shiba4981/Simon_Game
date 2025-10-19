const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

const buttonStart = document.getElementById('start-btn')

buttonStart.addEventListener('click', (e)=>{

  // e.preventDefault();
  if (!started) {
    console.log('started', started)
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
    buttonStart.style.visibility = "hidden";
  }
})
// document.addEventListener("keydown", function() {
//   if (!started) {
//     document.getElementById("level-title").textContent = "Level " + level;
//     nextSequence();
//     started = true;
//   }
// });

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function() {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over, Press Play again to Restart";
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  const randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  const btn = document.getElementById(randomChosenColor);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 200);
}

function animatePress(currentColor) {
  const btn = document.getElementById(currentColor);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  buttonStart.style.visibility = "visible";
}
