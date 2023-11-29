const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;

const c = canvas.getContext('2d');

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';

const backgroundImage = new Image();
backgroundImage.src = './img/Pellet Town.png';

const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png';

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png';

const offset = {
    x: -735,
    y: -650
};

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        playerDown: {
            image: playerDownImage
        },
        playerRight: {
            image: playerRightImage
        },
        playerUp: {
            image: playerUpImage
        },
        playerLeft: {
            image: playerLeftImage
        },
    }
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: backgroundImage
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false},
};
const boundaries = createBoundariesFrom2D(collisions);

const battleZones = createBattleZonesFrom2D(battleZonesMap)



function createBoundariesFrom2D(data) {
    const objects = [];

    data.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 1025) {
                objects.push(new Boundary({
                    position: {
                        x: x * Boundary.width + offset.x,
                        y: y * Boundary.height + offset.y
                    }
                }));
            }
        });
    });

    return objects;
}

function createBattleZonesFrom2D(data) {
    const objects = [];

    data.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 1025) {
                objects.push(new Boundary({
                    position: {
                        x: x * Boundary.width + offset.x,
                        y: y * Boundary.height + offset.y
                    }
                }));
            }
        });
    });

    return objects;
}

function rectangularCollision(rect1, rect2) {
    return rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height >= rect2.position.y;
}

const movables = [background, ...boundaries,foreground,...battleZones];

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    player.draw();
    foreground.draw();
    battleZones.forEach((zone)=> zone.draw())

    player.moving = false;


    if (keys.w.pressed && lastKey === 'w') {
        player.image = player.sprites.playerUp.image;

        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision(player, {
                ...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                }
            })) {
                player.moving = false
                break;
            }
        }

        if (player.moving) {
            movables.forEach((movable) => movable.position.y += 3);
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        player.image = player.sprites.playerLeft.image;
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision(player, {
                ...boundary, position: {
                    x: boundary.position.x +3,
                    y: boundary.position.y
                }
            })) {
                player.moving  = false
                break;
            }
        }

        if (player.moving ) {
            movables.forEach((movable) => movable.position.x += 3);
        }
    } else if (keys.s.pressed && lastKey === 's') {
        player.image = player.sprites.playerDown.image;
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision(player, {
                ...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 3
                }
            })) {
                player.moving  = false
                break;
            }
        }

        if (player.moving ) {
            movables.forEach((movable) => movable.position.y -= 3);
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        player.image = player.sprites.playerRight.image;
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision(player, {
                ...boundary, position: {
                    x: boundary.position.x -3,
                    y: boundary.position.y
                }
            })) {
                player.moving  = false
                break;
            }
        }

        if (player.moving ) {
            movables.forEach((movable) => movable.position.x -= 3);
        }

    }
    if (player.moving) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];
            const overlappingArea =  (Math.min(player.position.x +player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x)) *
                (Math.min(player.position.y +player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y));

            if (rectangularCollision(player, {
                ...battleZone, position: {
                    x: battleZone.position.x,
                    y: battleZone.position.y
                }
            }) && overlappingArea > player.width * player.height /2 && Math.random() < 0.01) {
                console.log('asdasd')
            }
        }
    }

}

animate();

let lastKey;
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            lastKey = 'a';
            keys.a.pressed = true;
            break;
        case 's':
            lastKey = 's';
            keys.s.pressed = true;
            break;
        case 'd':
            lastKey = 'd';
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});