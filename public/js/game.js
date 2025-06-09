/* Começar vídeo em 2:33 */
let jogando = false;

const canvas = document.getElementById('jogo_canvas')
const banner = document.getElementById('banner')
const ctx = canvas.getContext('2d')

const game_div = document.getElementById('game_div')
canvas.width = 1024;
canvas.height = 576;

// Mapeamento das colisões do cenário
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

// Classe que representa barreiras do cenário
class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.001)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Lista de barreiras e ajuste de posição do cenário
const boundaries = []
const offset = {
    x: -735,
    y: -625
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x + 5,
                    y: i * Boundary.height + offset.y
                }
            }))
    })
})
console.log(boundaries)

// Carregamento das imagens do cenário e do jogador
const darkroom = new Image()
darkroom.src = './img/darkroom.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'  

// Classe que representa sprites animados (jogador, fundo, etc)
class Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1 },
        sprites,
    }
    ) {
        this.position = position
        this.image = image
        this.frames = frames
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max,
                this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );
        if (!this.moving) return;
        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }
        if (this.frames.elapsed % 10 === 0) {
            if(this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else this.frames.val = 0;
        }
    }
};

// Instância do jogador
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        down: playerImage,
        left: playerLeftImage,
        right: playerRightImage
    }
});

// Instância do fundo do cenário
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: darkroom
});

// Controle das teclas pressionadas
const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}
let animationId = null;

// Função para detectar colisão entre dois retângulos
function rectangleCollision({personagem, colisao}) {
    return (
        personagem.position.x + personagem.width >= colisao.position.x &&
        personagem.position.x <= colisao.position.x + colisao.width &&
        personagem.position.y + personagem.height >= colisao.position.y &&
        personagem.position.y <= colisao.position.y + colisao.height
    );
}

// Classe para áreas interativas do cenário
class InteractiveArea {
    constructor({ position, width, height, content }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.content = content;
    }

    draw() {
        ctx.fillStyle = 'rgba(0,255,0,0.2)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// Lista de áreas interativas do cenário
const interactiveAreas = [
    new InteractiveArea({
        position: { x: 300, y: 200 },
        width: 48,
        height: 48,
        content: "Este é um conteúdo especial do seu site!"
    }),
    // Adicione mais áreas conforme necessário
];

// Função para verificar se o jogador está em uma área interativa
function playerInInteractiveArea(player, area) {
    return (
        player.position.x + player.width >= area.position.x &&
        player.position.x <= area.position.x + area.width &&
        player.position.y + player.height >= area.position.y &&
        player.position.y <= area.position.y + area.height
    );
}

// Variável que armazena o texto da área interativa atual
let currentInteraction = null;

// Lista de todos os objetos móveis do cenário
const movables = [background, ...boundaries, ...interactiveAreas];

// Função principal de animação e lógica do jogo
function animate() {
    animationId = window.requestAnimationFrame(animate);
    if (!jogando) return;
    background.draw();

    boundaries.forEach((boundary) => boundary.draw());
    interactiveAreas.forEach((area) => area.draw());
    player.draw();

    let moving = true;
    player.moving = false;

    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangleCollision({ personagem: player, colisao: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + 3 } } })) {
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => movable.position.y += 3);
        }
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangleCollision({ personagem: player, colisao: { ...boundary, position: { x: boundary.position.x + 3, y: boundary.position.y  } } })) {
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => movable.position.x += 3);
        }
    }
    else if (keys.s.pressed && lastKey === 's') { 
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangleCollision({ personagem: player, colisao: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - 3 } } })) {
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => movable.position.y -= 3);
        }
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.image = player.sprites.right;
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangleCollision({ personagem: player, colisao: { ...boundary, position: { x: boundary.position.x - 3 , y: boundary.position.y } } })) {
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => movable.position.x -= 3);
        }
    }

    // Verifica se o jogador está em uma área interativa e exibe o texto correspondente
    currentInteraction = null;
    for (const area of interactiveAreas) {
        if (playerInInteractiveArea(player, area)) {
            currentInteraction = area.content;
            break;
        }
    }

    if (currentInteraction) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(50, 50, 400, 100);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(currentInteraction, 70, 110);
    }
}

// Função para iniciar o jogo
function jogar() {
    banner.style.transition = 'opacity 1.5s';
    banner.style.opacity = '0';
    jogando = true;

    setTimeout(() => {
        banner.style.display = 'none';
        game_div.style.display = 'flex';
        game_div.style.transition = 'opacity 3s';
        game_div.style.opacity = '1';

        if (animationId === null) {
            animate();
        }
    }, 2000);
}

// Função para parar o jogo e exibir o banner
function pararJogo() {
    jogando = false;
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    game_div.style.display = 'none';
    banner.style.display = 'flex';
    banner.style.transition = 'opacity 1.5s';
    banner.style.opacity = '1';
    banner.style.zIndex = '9999';
    game_div.style.opacity = '0';
    game_div.style.zIndex = '-1';
}

// Variável para armazenar a última tecla pressionada
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})