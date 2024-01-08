var game = document.getElementById("gameID");
var context = game.getContext("2d");
var boxSize = 32;
var score = 0;
// Перемещение змейки
var gameSpeed = 250;
var snakeX = [];
var snakeY = [];
generateSnake();
var snakeDirection = "";
var food = [];
generateFood();
//Фон
var backgroundImage = new Image();
backgroundImage.src = "background.png";
//Яблоко
var foodImage = new Image();
foodImage.src = "apple.png";
//Отрисовка всех объектов
function draw() {
  context.drawImage(backgroundImage, 0, 0);
  context.drawImage(foodImage, food[0], food[1]);
  drawSnake();
  context.fillStyle = "White";
  context.font = "50px Russo One";
  context.fillText("Очки: " + score, 2 * boxSize, 1.5 * boxSize);
}
//Перемещение змейки с помощью нажатия стрелок
document.addEventListener("keydown", moveSnake);
function moveSnake(event) {
  if (event.keyCode == 37 && snakeDirection != "право") {
    snakeDirection = "лево";
  } else if (event.keyCode == 38 && snakeDirection != "вниз") {
    snakeDirection = "верх";
  } else if (event.keyCode == 39 && snakeDirection != "лево") {
    snakeDirection = "право";
  } else if (event.keyCode == 40 && snakeDirection != "верх") {
    snakeDirection = "вниз";
  }
}
//Перемещение змейки - координаты
function moveSnakeStep2() {
  //Координаты начала
  snakeXTemp = snakeX[0];
  snakeYTemp = snakeY[0];
  //Столкновение с яблоком
  if (snakeXTemp == food[0] && snakeYTemp == food[1]) {
    score++;
    generateFood();
  } else {
    //Удаление последнего символа хвоста
    snakeX.pop();
    snakeY.pop();
  }
  //Новую ячейка для отрисовки змейки
  if (snakeDirection == "лево") {
    snakeXTemp -= boxSize;
  } else if (snakeDirection == "право") {
    snakeXTemp += boxSize;
  } else if (snakeDirection == "верх") {
    snakeYTemp -= boxSize;
  } else if (snakeDirection == "вниз") {
    snakeYTemp += boxSize;
  }
  //Столкновение с границей игрового поля
  if (
    snakeXTemp < boxSize ||
    snakeXTemp > 17 * boxSize ||
    snakeYTemp < 3 * boxSize ||
    snakeYTemp > 17 * boxSize
  ) {
    finishGame();
    return;
  }
  //Столкновение змейки с собой
  for (pos = 0; pos < snakeX.length; pos++) {
    if (snakeXTemp == snakeX[pos] && snakeYTemp == snakeY[pos]) {
      finishGame();
      return;
    }
  }
  //Добавление нового элемента к змейке
  snakeX.unshift(snakeXTemp);
  snakeY.unshift(snakeYTemp);
}

//Запуск новой игры
function newGame() {
  score = 0;
  snakeX = [];
  snakeY = [];
  generateSnake();
  snakeDirection = "";
  food = [];
  generateFood();
}

//Результаты игры
function finishGame() {
  if (confirm("Вы набрали " + score + " очков!\nНачать новую игру?")) {
    newGame();
  } else {
    clearInterval(gameMainInterval);
  }
}

//Основная логика игры
function main() {
  moveSnakeStep2();
  draw();
}
var gameMainInterval = setInterval(main, gameSpeed);

//Генерация змейки
function generateSnake() {
  snakeX[0] = 9 * boxSize;
  snakeY[0] = 10 * boxSize;
}
//Отрисовка змейки
function drawSnake() {
  for (pos = 0; pos < snakeX.length; pos++) {
    context.fillStyle = "green";
    context.fillRect(snakeX[pos], snakeY[pos], boxSize, boxSize);
  }
}

//Генерация яблока
function generateFood() {
  food[0] = Math.floor(Math.random() * 17 + 1) * boxSize;
  food[1] = Math.floor(Math.random() * 15 + 3) * boxSize;

  //Проверка ячейки на наличие змеи
  var isSnakeCollision = false;
  for (pos = 0; pos < snakeX.length; pos++) {
    if (snakeX[pos] == food[0] && snakeY[pos] == food[1]) {
      isSnakeCollision = true;
    }
  }
  if (isSnakeCollision) {
    generateFood();
  }
}
