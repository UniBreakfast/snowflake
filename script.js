const snow = { size: 10, colour: "white", interval: 100, speed: 3 }
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

const snowFlakes = []

document.body.append(canvas)

updateSize()

startSnow()



onresize = updateSize

function updateSize() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function drawSnowFlake(x, y) {
    ctx.beginPath()
    ctx.fillStyle = snow.colour
    ctx.arc(x, y, snow.size / 2, 0, 7)
    ctx.fill()
}

function startSnow() {
    setInterval(addSnowFlake, snow.interval)

    requestAnimationFrame(updateSnow)
}

function addSnowFlake() {
    const snowFlake = { x: rnd(innerWidth), y: 0 }

    snowFlakes.push(snowFlake)
}

function rnd(limit) {
    return Math.floor(Math.random() * limit)
}

function updateSnow() {
    clearCanvas()

    for (const snowFlake of snowFlakes) {
        if (snowFlake.y < canvas.height) {
            snowFlake.y += snow.speed
        }
        drawSnowFlake(snowFlake.x, snowFlake.y)
    }
    requestAnimationFrame(updateSnow)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}