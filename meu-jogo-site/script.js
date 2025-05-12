
/* Começar vídeo em 2:33*/

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;


const collisionsMap = []
for (let i =0; i < collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(new Boundary({position: {
            x: j * Boundary.width,
            y: i * Boundary.height
        }}))

})})
console.log(boundaries)
const darkroom = new Image()
darkroom.src = './img/darkroom.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'


class Sprite {
    constructor({
        position,
        velocity,
        image
    }
    ) {
        this.position = position
        this.image = image
    }
    draw() {
        /*darkroom*/ctx.drawImage(this.image, this.position.x, this.position.y)
    }
};

const background = new Sprite({
    position: {
        x: -735,
        y: -600
    },
    image: darkroom
});

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false}
}

function animate() {
    window.requestAnimationFrame(animate);
    console.log('animate');
    background.draw()


    /*player*/ctx.drawImage(
        playerImage,
        0, 0, playerImage.width / 4, playerImage.height,
        canvas.width / 2 - (playerImage.width / 4) / 2, canvas.height / 2 - playerImage.height / 4,
        playerImage.width / 4, playerImage.height)
    /* proximo */

    if (keys.w.pressed && lastKey === 'w') background.position.y += 3
    else if (keys.a.pressed  && lastKey === 'a') background.position.x += 3
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3
}

function jogar(){
    animate()
}


let lastKey =''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey ='w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey ='a'
            break
        case 's':
            keys.s.pressed = true
            lastKey ='s'
            break
        case 'd':
            keys.d.pressed = true
            lastKey ='d'
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


