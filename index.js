const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //c for context it is an API, I can draw anything from this
// console.log(door)


canvas.width = 1024
canvas.height = 576
const doorMap = []
for(let i=0; i<door.length; i+=60){
    doorMap.push(door.slice(i,60+i))
}
 
console.log(doorMap)
const boundaries = []
const offset = {
    x:-70,
    y:-325
}
const collisionsMap = []
for(let i=0; i<collision.length; i+=60){
    collisionsMap.push(collision.slice(i,60+i))
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
const doorr = []

doorMap.forEach((row, i) =>{
    row.forEach((symbol, j) => {
        if(symbol === 1)
        doorr.push(
            new Boundary( {
                position: {
                    x: j*Boundary.width + offset.x,
                    y: i*Boundary.height + offset.y
                }
            })
        )
    })
})
console.log(doorr)
// console.log(boundaries)
//1. Map Creation
const image = new Image()
const playerImage = new Image()
const playerUp = new Image()
const playerLeft = new Image()
const playerRight = new Image()
const foreground1 = new Image()
// const up = new Image()
// const down = new Image()
// const left = new Image()
// const right = new Image()
image.src = "./img/chkmap.png"
playerImage.src = "./img/playerDown.png"
playerUp.src = "./img/playerUp.png"
playerLeft.src = "./img/playerLeft.png"
playerRight.src = "./img/playerRight.png"
foreground1.src = './img/foreground.png'
// up.src = "./img/Up.png"
// down.src = "./img/down.png"
// left.src = "./img/left.png"
// right.src = "./img/right.png"





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
// const up1 = new direction({
//     position1: {
//         x: offset.x,
//         y: offset.y
//     },
//     image: up
// })
// const down1 = new direction({
//     position: {
//         x: offset.x,
//         y: offset.y
//     },
//     image: down
// })
// const left1 = new direction({
//     position: {
//         x: offset.x,
//         y: offset.y
//     },
//     image: left
// })
// const right1 = new direction({
//     position: {
//         x: offset.x,
//         y: offset.y
//     },
//     image: right
// })
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
    },
    Shift: {
        pressed: false
    },
    Enter: {
        pressed: false
    }

}


const movables = [background, ...boundaries, foreground,...doorr]

function rectangleCollision({ rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
const indoor = {
    initiated: false
}
function animate(){
    window.requestAnimationFrame(animate)   //recursion
    background.draw();
    // up1.drawup()
    // down1.drawdown()
    // left1.drawleft()
    // right1.drawright()
    
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    doorr.forEach((doorr) => {
        doorr.draw()
    })
    player.draw()
    foreground.draw()

    if(indoor.initiated) return
    let moving = true
    player.moving = false
    if(keys.Enter.pressed){
        for (let i=0; i < boundaries.length; i++) {
            const dor = doorr[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: dor
                })
                 ){
                console.log('Door')
                indoor.initiated = true
                break
            }
        }
    }
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
                        y: boundary.position.y +5
                    }}
                })
                ){
                console.log('colliding')
                moving = false
                break
            }
        }
    if(moving){
        if(keys.Shift.pressed){
            movables.forEach((movable) => {
                movable.position.y += 5
            })  
        }
        
        movables.forEach((movable) => {
            movable.position.y += 4
        })
    }
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
                        x: boundary.position.x-5,
                        y: boundary.position.y 
                    }}
                })
                ){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving){
            if(keys.Shift.pressed){
                movables.forEach((movable) => {
                    movable.position.x -= 5
                })  
            }
        movables.forEach((movable) => {
            movable.position.x -= 4
        })
    }
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
                        y: boundary.position.y-5
                    }}
                })
                ){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving){
            if(keys.Shift.pressed){
                movables.forEach((movable) => {
                    movable.position.y -= 5
                })  
            }
        movables.forEach((movable) => {
            movable.position.y -= 4
        })
    }
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
                        x: boundary.position.x+5,
                        y: boundary.position.y 
                    }}
                })
                ){
                console.log('colliding')
                moving = false
                break
            }
        }
        if(moving){
            if(keys.Shift.pressed){
                movables.forEach((movable) => {
                    movable.position.x += 5
                })  
            }
        movables.forEach((movable) => {
            movable.position.x += 4
        })
    }
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
        case 'Shift':
            keys.Shift.pressed = true
            // lastkey = 'Shift'
            break
        case 'Enter':
            keys.Enter.pressed = true
            break
    }
    // console.log(e.key)
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
        case 'ArrowRight' || 'Shift':
            keys.ArrowRight.pressed = false
            keys.Shift.pressed = false
            break;
        case 'Shift':
            keys.Shift.pressed = false
            break
            case 'Enter':
                keys.Enter.pressed = false
                break
    }
    // console.log(keys)
})

const UP = document.getElementById('u')
const DOWN = document.getElementById('d')
const LEFT = document.getElementById('l')
const RIGHT = document.getElementById('r')



    UP.addEventListener('mousedown',function(){
        keys.w.pressed = true
})
    DOWN.addEventListener('mousedown',function(){
        keys.s.pressed = true
})
    LEFT.addEventListener('mousedown',function(){
        keys.a.pressed = true
})
    RIGHT.addEventListener('mousedown',function(){
        keys.d.pressed = true
})


UP.addEventListener('mouseup',function(){
    keys.w.pressed = false
})
DOWN.addEventListener('mouseup',function(){
    keys.s.pressed = false
})
LEFT.addEventListener('mouseup',function(){
    keys.a.pressed = false
})
RIGHT.addEventListener('mouseup',function(){
    keys.d.pressed = false
})
