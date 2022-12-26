const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //c for context it is an API, I can draw anything from this



canvas.width = 1024
canvas.height = 576
const collisionsMap = []
for(let i=0; i<collision.length; i+=60){
    collisionsMap.push(collision.slice(i,60+i))
}


const boundaries = []
const offset = {
    x:-70,
    y:-325
}
collisionsMap.forEach((row, i) =>{
    row.forEach((symbol, j) => {
        if(symbol === 1)
        boundaries.push(
            new Boundary( {
                position: {
                    x: j*Boundary.width + offset.x,
                    y: i*Boundary.height + offset.y
                }
            })
        )
    })
})
console.log(boundaries)
//1. Map Creation
const image = new Image()
const playerImage = new Image()
const playerUp = new Image()
const playerLeft = new Image()
const playerRight = new Image()
const foreground1 = new Image()
image.src = "./img/chkmap.png"
playerImage.src = "./img/playerDown.png"
playerUp.src = "./img/playerUp.png"
playerLeft.src = "./img/playerLeft.png"
playerRight.src = "./img/playerRight.png"
foreground1.src = './img/foreground.png'





const player = new Sprite ({
    position:{
        x:canvas.width/2 - (192/4) / 2,
        y:canvas.height/2 - 68/2
    },
    image: playerImage,
    frames: {
        max:4
    },
    sprites: {
        up: playerUp,
        down: playerImage,
        left: playerLeft,
        right: playerRight
    }
})
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foreground1
})

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },

    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}


const movables = [background, ...boundaries, foreground]

function rectangleCollision({ rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
function animate(){
    window.requestAnimationFrame(animate)   //recursion
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()
    let moving = true
    player.moving = false
    if (keys.w.pressed || keys.ArrowUp.pressed && (lastkey ==='w' || lastkey ==='ArrowUp' )) {
       player.moving =true
       player.image = player.sprites.up
        for (let i=0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position:{
                        x: boundary.position.x,
                        y: boundary.position.y +4
                    }}
                })
                ){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y += 4
        })
    }
    else if (keys.d.pressed || keys.ArrowRight.pressed && (lastkey ==='d' || lastkey ==='ArrowRight' )) {
        player.moving =true
        player.image = player.sprites.right
        for (let i=0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position:{
                        x: boundary.position.x-4,
                        y: boundary.position.y 
                    }}
                })
                ){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.x -= 4
        })
       
    }
    else if (keys.s.pressed || keys.ArrowDown.pressed && (lastkey ==='s' || lastkey ==='ArrowDown' )) {
        player.moving =true
        player.image = player.sprites.down
        for (let i=0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position:{
                        x: boundary.position.x,
                        y: boundary.position.y-4
                    }}
                })
                ){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y -= 4
        })
     
    }
    else if (keys.a.pressed || keys.ArrowLeft.pressed && (lastkey ==='a' || lastkey ==='ArrowLeft' )) {
        player.moving =true
        player.image = player.sprites.left
        for (let i=0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position:{
                        x: boundary.position.x+4,
                        y: boundary.position.y 
                    }}
                })
                ){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.x += 4
        })
       
    }
}

// if(keys.w.pressed) {
//     background.position.y = background.position.y - 3
// }
animate()
lastkey = ''
window.addEventListener('keydown', (e) =>{
    // console.log(e.key)
    switch(e.key) {
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            lastkey = 'ArrowUp'
            break;

        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastkey = 'ArrowLeft'
            break;

        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            lastkey = 'ArrowDown'
            break;

        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastkey = 'ArrowRight'
            break;
    }
})
window.addEventListener('keyup', (e) =>{
    // console.log(e.key)
    switch(e.key) {
        case 'w':
            keys.w.pressed = false
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break;

        case 'a':
            keys.a.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;

        case 's':
            keys.s.pressed = false
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break;

        case 'd':
            keys.d.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
    }
    // console.log(keys)
})