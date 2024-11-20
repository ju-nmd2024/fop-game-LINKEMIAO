let characterX = 300;
let characterY = 400;
let velocity = 0.5; 
let accelerate = 0.6;
let gravity = 0.5; 
let lift = -5; 
let ground = 570; 
let x = 300;
let y = 600;
let gameState = "start"; 
let restartButton; 
let landingSpeed=7;

function setup() {
  createCanvas(600, 800);
  RestartButton();
}

//flow
function draw() {
  background(255);

  if (gameState === "start") {
    startScreen();
  } else if (gameState === "playing") {
    Game();
  } else if (gameState === "end-success") {
    successScreen();
  } else if (gameState === "end-fail") {
    failScreen();
  }
}

function keyPressed() {
  if (gameState === "start" && key === ' ') {
    gameState = "playing"; 
  } else if (gameState === "playing" && key === ' ') {
    velocity += lift;
  }
}

function Game() {
  gameBackground(x, y);


  characterY = characterY +velocity;
  velocity = velocity+gravity;

  if (characterY > ground) {
    characterY = ground;

    if (velocity > landingSpeed) {
      gameState = "end-fail"; 
    } else {
      gameState = "end-success"; 
    }
    velocity = 0;
  } else if (characterY < 0) {
    characterY = 0;
    velocity = 0;
  }

  GraduationCap(characterX, characterY);
}

function startScreen() {
  textAlign(CENTER, CENTER);
  textSize(50);
  noStroke(); 
  fill(0);
  text("To be Graduate!", width/2, height/2 - 50);
  textSize(20);
  text("Press SPACE to start", width/2, height/2);

  GraduationCap(width/2, height/2 - 150);
  hideRestartButton(); 
}

function successScreen() {
  textAlign(CENTER, CENTER);
  textSize(50);
  noStroke(); 
  fill(0, 150, 0); 
  text("Congratulations!", width/2, height/2 - 50);
  

  push();
  translate(width/2, height/2 - 150);
  rotate(radians(30));
  GraduationCap(0, 0);
  pop();

  showRestartButton(); 
}

function failScreen() {
  textAlign(CENTER, CENTER);
  textSize(50);
  noStroke(); 
  fill(150, 0, 0); 
  text("Failed!", width/2, height/2 - 50);
  textSize(20);
  text("You landed too fast!", width/2, height/2);

  push();
  translate(width/2, height/2 - 150);
  rotate(radians(-30));
  GraduationCap(0, 0);
  pop();

  showRestartButton(); 
}

function RestartButton() {
  restartButton = createButton("Restart");
  restartButton.position(width/2 - 40, height/2 + 50);
  restartButton.mousePressed(resetGame);
  restartButton.hide(); 
}

function showRestartButton() {
  restartButton.show();
}

function hideRestartButton() {
  restartButton.hide();
}

function resetGame() {
  characterX = 300;
  characterY = 400;
  gameState = "start";
}

function GraduationCap(x, y) {
  // Hat rope 1
  stroke(160, 0, 0);
  noFill();
  strokeWeight(3);
  line(x + 50, y + 36, x + 50, y - 9);

  // Hat
  fill(40, 40, 40);
  strokeWeight(0);
  rect(x - 27, y + 0, 58, 35);
  ellipse(x + 2, y + 35, 58, 20);

  // Shadow
  fill(20, 20, 20);
  strokeWeight(0);
  ellipse(x + 2, y + 18, 58, 30);

  // Crown
  fill(40, 40, 40);
  strokeWeight(0);
  quad(x + 0, y + 27, x + 70, y + 0, x + 0, y - 25, x - 70, y - 0);

  // Hat rope 2
  push();
  translate(x, y);
  rotate(3);
  stroke(160, 0, 0);
  noFill();
  strokeWeight(3);
  line(-3, 0, -50, +2);
  pop();

  // Tassel
  stroke(160, 0, 0);
  noFill();
  strokeWeight(6);
  line(x + 50, y + 39, x + 50, y + 23);
}

function gameBackground(x, y) {
  x = x - 15;
  y = y - 5;

  noStroke();
  fill(90, 110, 160);
  rect(x - 60, y + 30, 118, 35);
  ellipse(x - 60, y + 47, 30, 35);

  noStroke();
  fill(245, 233, 200);
  quad(x + 99, y + 12, x + 59, y + 31, x + 59, y + 62, x + 98, y + 42);
  ellipse(x + 62, y + 47.5, 20, 32);

  noStroke();
  fill(122, 144, 186);
  quad(x + 60, y + 30, x - 60, y + 30, x - 15, y + 10, x + 101, y + 10);

  stroke(122, 144, 186);
  strokeWeight(3);
  line(x + 99, y + 12, x + 59, y + 31);
  line(x + 98, y + 42, x + 59, y + 62);
}
