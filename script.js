import Ball from './Ball.js'
import Paddle from './Paddle.js'


const ball = new Ball(document.getElementById("ball"))
const leftPaddle = new Paddle(document.getElementById("left_paddle"))
const rightPaddle = new Paddle(document.getElementById("right_paddle"))
const playerScore = document.getElementById("player_right_score")
const computerScore = document.getElementById("player_left_score")

let  lastTime

function update(time){
    if(lastTime != null){
        const delta = time -lastTime
        ball.update(delta, [rightPaddle.rect(), leftPaddle.rect()])
        leftPaddle.update(delta, ball.y) //for computer player

        //these two lines changes the color as time progresses
   /*     const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        document.documentElement.style.setProperty("--hue", hue + delta * .01)
    */

        if(isLose()){
            handleLose()
            console.log("lose")
        }
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose(){
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose(){
    const rect = ball.rect()

    if(rect.right >= window.innerWidth){
        computerScore.textContent = parseInt(computerScore.textContent) + 1
    }
    else{
        playerScore.textContent = parseInt(playerScore.textContent) + 1
    }

    ball.reset()
    leftPaddle.reset()
}

document.addEventListener("mousemove", e => {
    rightPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)