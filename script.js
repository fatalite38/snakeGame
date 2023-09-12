const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
const snake = [{ x: 8 * box, y: 8 * box }];

 /* variavel da direção da cobra */
let direction = "right";

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

/* funções para fazer a cobra aparecer ao lado oposto quando atravessar a caixa */
function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;  
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    
    function verificarColisao(){
        for(i = 1; i < snake.length; i++ ){
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                clearInterval(game);
                document.getElementById("game-over").style.display = "flex"; // Exibir a tela de "Game Over"
            }
        }
    }

    function reiniciarJogo() {
        clearInterval(game); // Limpar o intervalo anterior
        snake.length = 1; // Redefinir o tamanho da cobra
        snake[0] = { x: 8 * box, y: 8 * box }; // Redefinir a posição inicial da cobra
        direction = "right"; // Redefinir a direção
        document.getElementById("game-over").style.display = "none"; // Ocultar a tela de "Game Over"
        game = setInterval(iniciarJogo, 100); // Iniciar o jogo novamente
    }
    document.getElementById("restart-button").addEventListener("click", reiniciarJogo);
    
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
/* função que determina a parada do jogo quando completo */
let game = setInterval(iniciarJogo, 100);