const canvas = document.querySelector('canvas')
canvas.width = 1024
canvas.height = 576

const c = canvas.getContext('2d');

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

const backgroundImage = new Image()
backgroundImage.src = './img/Pellet Town.png'

const offset = {
    x: -735,
    y: -650
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerImage,
    frames: {
        max: 4
    }
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: backgroundImage
});

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false},
}
const boundaries = createObjectsFrom2D(collisions);

const movables = [background, ...boundaries]

function createObjectsFrom2D(data) {
    const objects = []

    data.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 1025) {
                objects.push(new Boundary({
                    position: {
                        x: x * Boundary.width + offset.x,
                        y: y * Boundary.height + offset.y
                    }
                }))
            }
        })
    })

    return objects
}

function rectangularCollision(rect1, rect2) {

    return rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height >= rect2.position.y

}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw();

    boundaries.forEach((boundary)=> {
        boundary.draw()
        if (rectangularCollision(player, boundary)) {
            console.log('asdasd')
        }
    })
    player.draw()


    if (keys.w.pressed && lastKey === 'w') {
        movables.forEach((movable) => movable.position.y += 3)
    } else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach((movable) => movable.position.x += 3)
    } else if (keys.s.pressed && lastKey === 's') {
        movables.forEach((movable) => movable.position.y -= 3)
    } else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach((movable) => movable.position.x -= 3)
    }

}

animate()

let lastKey;
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            lastKey = 'a'
            keys.a.pressed = true
            break
        case 's':
            lastKey = 's'
            keys.s.pressed = true
            break
        case 'd':
            lastKey = 'd'
            keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
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