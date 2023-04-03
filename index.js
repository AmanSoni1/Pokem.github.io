const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //c for context it is an API, I can draw anything from this
// console.log(door)


canvas.width = 1024
canvas.height = 576
const doorMap = []
for(let i=0; i<door.length; i+=60){
    doorMap.push(door.slice(i,60+i))
}
// const doorMap1 = []
// for(let i=0; i<door1.length; i+=60){
//     doorMap1.push(door1.slice(i,60+i))
// }


 
// console.log(doorMap1)
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
const doorr1 = []
const doorr2 = []
const doorr3 = []
const doorr4 = []

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
        if(symbol === 2)
        doorr1.push(
            new Boundary( {
                position: {
                    x: j*Boundary.width + offset.x,
                    y: i*Boundary.height + offset.y
                }
            })
        )
        if(symbol === 3)
        doorr2.push(
            new Boundary( {
                position: {
                    x: j*Boundary.width + offset.x,
                    y: i*Boundary.height + offset.y
                }
            })
        )
        if(symbol === 4)
        doorr3.push(
            new Boundary( {
                position: {
                    x: j*Boundary.width + offset.x,
                    y: i*Boundary.height + offset.y
                }
            })
        )
        if(symbol === 5)
        doorr4.push(
            new Boundary( {
                position: {
                    x: j*Boundary.width + offset.x,
                    y: i*Boundary.height + offset.y
                }
            })
        )
    })
})



// console.log(boundaries)
//1. Map Creation
const image = new Image()
const playerImage = new Image()
const playerUp = new Image()
const playerLeft = new Image()
const playerRight = new Image()
const foreground1 = new Image()
const form = new Image()
const form1 = new Image()
const form2 = new Image()
const form3 = new Image()
const form4 = new Image()
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
form.src = './img/980.png'
form1.src = './img/970.png'
form2.src = './img/960.png'
form3.src = './img/950.png'
form4.src = './img/940.png'
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
const forum = new Sprite({
    position: {
        x: 30,
        y: 50
    },
    image: form
})
const forum1 = new Sprite({
    position: {
        x: 30,
        y: 50
    },
    image: form1
})
const forum2 = new Sprite({
    position: {
        x: 30,
        y: 50
    },
    image: form2
})
const forum3 = new Sprite({
    position: {
        x: 30,
        y: 50
    },
    image: form3
})
const forum4 = new Sprite({
    position: {
        x: 30,
        y: 50
    },
    image: form4
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


const movables = [background, ...boundaries, foreground,...doorr,...doorr1,...doorr2,...doorr3,...doorr4]

function rectangleCollision({ rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

const indoor1 = {
    initiated: false
}
const indoor2 = {
    initiated: false
}
const indoor3 = {
    initiated: false
}
const indoor4 = {
    initiated: false
}
const indoor5 = {
    initiated: false
}
let flag = false

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
    
    let moving = true

    if(indoor1.initiated){
        if(enkey%2 === 0){
       
            indoor1.initiated = false;
            flag=true;
            moving = true
        }
        forum.draw1()
            moving = false
        
    }
    if(indoor2.initiated){
        if(enkey%2 === 0){
       
            indoor2.initiated = false;
            flag=true;
            moving = true
        }
        forum1.draw1()
            moving = false
        
    }
    if(indoor3.initiated){
        if(enkey%2 === 0){
       
            indoor3.initiated = false;
            flag=true;
            moving = true
        }
        forum2.draw1()
            moving = false
        
    }
    if(indoor4.initiated){
        if(enkey%2 === 0){
       
            indoor4.initiated = false;
            flag=true;
            moving = true
        }
        forum3.draw1()
                    moving = false
        
    }
    if(indoor5.initiated){
        if(enkey%2 === 0){
       
            indoor5.initiated = false;
            flag=true;
            moving = true
        }
        forum4.draw1()
            moving = false
        
    }

    player.moving = false
    if(keys.Enter.pressed){
        for (let i=0; i < boundaries.length; i++) {
            try {
            const dor = doorr[i]
            const dor1 = doorr1[i]  
            const dor2 = doorr2[i]  
            const dor3 = doorr3[i]  
            const dor4 = doorr4[i]  
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: dor
                })
                 ){
                console.log('Door1')
                if(!flag)
                indoor1.initiated = true
                flag = false
                console.log(dor)
                break
            }
            else if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: dor1
                })
                 ){
                console.log('Door2')
                if(!flag)
                indoor2.initiated = true
                flag = false
                console.log(dor1)
                break
            }
            else if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: dor2
                })
                 ){
                console.log('Door2')
                if(!flag)
                indoor3.initiated = true
                flag = false
                console.log(dor1)
                break
            }
            else if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: dor3
                })
                 ){
                console.log('Door2')
                if(!flag)
                indoor4.initiated = true
                flag = false
                console.log(dor1)
                break
            }
            else if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: dor4
                })
                 ){
                console.log('Door2')
                if(!flag)
                indoor5.initiated = true
                flag = false
                console.log(dor1)
                break
            }
            
            
            } catch (error) {
                return
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

animate()
lastkey = ''
let enkey = 0
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
            enkey = enkey + 1
            break
    }
    console.log(enkey)
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
const ENTER = document.getElementById('f')
const SHIFT = document.getElementById('s')



    UP.addEventListener('touchstart',function(){
        keys.w.pressed = true
})
    DOWN.addEventListener('touchstart',function(){
        keys.s.pressed = true
})
    LEFT.addEventListener('touchstart',function(){
        keys.a.pressed = true
})
    RIGHT.addEventListener('touchstart',function(){
        keys.d.pressed = true
})
    ENTER.addEventListener('touchstart',function(){
        keys.Enter.pressed = true
        enkey = enkey + 1
})
    SHIFT.addEventListener('touchstart',function(){
        keys.Shift.pressed = true
        
})


UP.addEventListener('touchend',function(){
    keys.w.pressed = false
})
DOWN.addEventListener('touchend',function(){
    keys.s.pressed = false
})
LEFT.addEventListener('touchend',function(){
    keys.a.pressed = false
})
RIGHT.addEventListener('touchend',function(){
    keys.d.pressed = false
})
ENTER.addEventListener('touchend',function(){
    keys.Enter.pressed = false
})
SHIFT.addEventListener('touchend',function(){
    keys.Shift.pressed = false
    
})
