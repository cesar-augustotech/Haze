/* Começar vídeo em 2:33*/
let jogando = false;

const canvas = document.getElementById('jogo_canvas')
const banner = document.getElementById('banner')
const ctx = canvas.getContext('2d')

const game_div = document.getElementById('game_div')
canvas.width = 1024;
canvas.height = 576;


const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

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
        if (!this.moving) return; // Se não estiver se movendo, não atualiza os frames
        
        // Atualiza os frames
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

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: darkroom
});

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}
let animationId = null; // Adicione esta variável global


const movables = [background, ...boundaries];

function rectangleCollision({personagem, colisao}) {
    return (
        personagem.position.x + personagem.width >= colisao.position.x &&
        personagem.position.x <= colisao.position.x + colisao.width &&
        personagem.position.y + personagem.height >= colisao.position.y &&
        personagem.position.y <= colisao.position.y + colisao.height
    );
}

function animate() {
    animationId = window.requestAnimationFrame(animate); // Salve o ID
    if (!jogando) return; // Pare de animar se não estiver jogando
    background.draw();

    boundaries.forEach((boundary) => {
        boundary.draw();


    });


    player.draw();



let moving = true; // Variável para verificar se o personagem está se movendo
player.moving = false; // Reseta o estado de movimento do personagem


    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true; // Define que o personagem está se movendo
        player.image = player.sprites.up; // Muda a imagem do personagem para cima
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangleCollision({ personagem: player, colisao: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + 3 } } })) {
                console.log('Colidiu com o teste de limite');
                moving = false; // Se colidir, não se move
                break

            }
        }
        if (moving) {
        movables.forEach((movable) => movable.position.y += 3);
        }

    }
    else if (keys.a.pressed && lastKey === 'a') {
              player.moving = true; // Define que o personagem está se movendo
              player.image = player.sprites.left; // Muda a imagem do personagem para esquerda
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangleCollision({ personagem: player, colisao: { ...boundary, position: { x: boundary.position.x + 3, y: boundary.position.y  } } })) {
                console.log('Colidiu com o teste de limite');
                moving = false; // Se colidir, não se move
                break

            }
        }
        if (moving) {
        movables.forEach((movable) => movable.position.x += 3);
        }}
    else if (keys.s.pressed && lastKey === 's') { 
              player.moving = true; // Define que o personagem está se movendo
              player.image = player.sprites.down; // Muda a imagem do personagem para baixo
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangleCollision({ personagem: player, colisao: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - 3 } } })) {
                console.log('Colidiu com o teste de limite');
                moving = false; // Se colidir, não se move
                break

            }
        }
        if (moving) {
        movables.forEach((movable) => movable.position.y -= 3);
        }}
    else if (keys.d.pressed && lastKey === 'd') {
            player.image = player.sprites.right; // Muda a imagem do personagem para direita
              player.moving = true; // Define que o personagem está se movendo
              
              for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangleCollision({ personagem: player, colisao: { ...boundary, position: { x: boundary.position.x - 3 , y: boundary.position.y } } })) {
                console.log('Colidiu com o teste de limite');
                moving = false; // Se colidir, não se move
                break

            }
        }
        if (moving) {
        movables.forEach((movable) => movable.position.x -= 3);
        }};
}

function jogar() {
    banner.style.transition = 'opacity 1.5s';
    banner.style.opacity = '0';
    jogando = true;

    setTimeout(() => {
        banner.style.display = 'none';
        game_div.style.display = 'flex';
        game_div.style.transition = 'opacity 3s';
        game_div.style.opacity = '1';

        if (animationId === null) { // Só inicia se não estiver rodando
            animate();
        }
    }, 2000);
}

function pararJogo() {
    jogando = false;
    if (animationId !== null) {
        cancelAnimationFrame(animationId); // Cancela o loop
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