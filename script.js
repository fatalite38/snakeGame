const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
const snake = [{ x: 8 * box, y: 8 * box }];
let isGameOver = false;
let isGameStarted = false;
 /* variavel da direção da cobra */
let direction = "right";
let gameInterval;

 /* criando a comida da cobra em lugares aleatorios da caixa */
const food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };

/* criando a caixa */
function createBox() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

/* criando a cobrinha */
function createSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
/* dando formato a comida da cobra */
function drawFood(){
    context.fillStyle = "white";
    context.fillRect(food.x, food.y, box, box);
}

/* atualizando as direções da cobra*/
function atualizarDirecao (event){
    if(event.keyCode === 37 && direction != "right") direction = "left";
    if(event.keyCode === 38 && direction != "down") direction = "up";
    if(event.keyCode === 39 && direction != "left") direction = "right";
    if(event.keyCode === 40 && direction != "up") direction = "down";
}
document.addEventListener('keydown', atualizarDirecao);

function mostrarLetsGo() {
    document.getElementById("lets-go").style.display = "flex";
    /*Adicione um evento de clique para iniciar o jogo quando o botão "Start" for clicado */
    document.getElementById("start-button").addEventListener("click", function () {
        document.getElementById("lets-go").style.display = "none";
        iniciarNovoJogo();
    });
}
mostrarLetsGo();


/* funções para fazer a cobra aparecer ao lado oposto quando atravessar a caixa */
function iniciarJogo(){
    if (!isGameStarted) {
        return;
    }
    if (isGameOver) {
        return;
    }

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;  
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    
    verificarColisao()
    createBox();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /* coordenadas de aumentar ou diminuir */
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;

    /* função pop retira o ultimo elemento do array */
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } 
    else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }


    /*criando um objeto que representa a nova posição da cabeça da cobra após ela se mover em uma direção*/
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);  /* criando uma nova cabeça com metodo UNSHIFT que acrescenta no primeiro elemento a frente */

}

function verificarColisao(){
    for(i = 1; i < snake.length; i++ ){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            clearInterval(gameInterval);
            mostrarGameOver();
        }
    }
}


function mostrarGameOver() {
    isGameOver = true;
    document.getElementById("game-over").style.display = "flex";
}

document.getElementById("start-button").addEventListener("click", function () {
    isGameStarted = true; // Iniciar o jogo quando o botão "Start" for clicado
});

document.getElementById("restart-button").addEventListener("click", iniciarNovoJogo);

function iniciarNovoJogo() {
    isGameOver = false; // Defina o estado do jogo como não encerrado
    document.getElementById("game-over").style.display = "none";
    snake.length = 1;
    snake[0] = { x: 8 * box, y: 8 * box };
    direction = "right";
    gameInterval = setInterval(iniciarJogo, 250);
}

    //Lógica para controlar o jogo com botões
    const upButton = document.getElementById("up-button");
    const downButton = document.getElementById("down-button");
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");

    upButton.addEventListener("click", "touchstart" () => {
        if (direction !== 'down') {
            direction="up"}
     })
    downButton.addEventListener("click", "touchstart" () => {
        if (direction !== 'up'){
            direction='down'}
    })

    leftButton.addEventListener("click", "touchstart" () => {
    if (direction !='right'){
            direction= 'left'}
    })

    rightButton.addEventListener("click", "touchstart" () => {
        if (direction!='left'){
            direction ='right'}
    });

iniciarNovoJogo();