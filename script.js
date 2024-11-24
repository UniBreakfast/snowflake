const snow = {
    size: 30,
    r: 15,
    colour: "white",
    interval: 100,
    speed: 3,
    minSpeed: 1,
    maxSpeed: 3,
    max: 100
}
const a60 = Math.PI / 3
const a120 = a60 * 2 
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

const snowFlakes = []

document.body.append(canvas)

updateSize()

startSnow()

// drawSnowFlake(canvas.width / 2, canvas.height / 2, 0)

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
function drawSnowFlake(x, y, angle) {
    const beamLength = snow.size / 2
    const width = beamLength / 14

    for (let i = 0; i < 6; i++) {
        const a = angle + i * Math.PI / 3;
        const splitX = x + (beamLength * 0.6) * Math.cos(a);
        const splitY = y + (beamLength * 0.6) * Math.sin(a);
        const hexX = x + (beamLength * 0.3) * Math.cos(a);
        const hexY = y + (beamLength * 0.3) * Math.sin(a);
        const starX = x + beamLength * 0.4 * Math.cos(a);
        const starY = y + beamLength * 0.4 * Math.sin(a);

        drawLine(x, y, a, beamLength, width, snow.colour)
        drawLine(splitX, splitY, a - 1, beamLength * 0.4, width, snow.colour)
        drawLine(splitX, splitY, a + 1, beamLength * 0.4, width, snow.colour)
        drawLine(hexX, hexY, a + Math.PI * 2 / 3, beamLength * 0.3, width, snow.colour)
        drawLine(starX, starY, a - Math.PI / 3, beamLength * 0.4, width, snow.colour)
        drawLine(starX, starY, a + Math.PI / 3, beamLength * 0.4, width, snow.colour)
    }
}
function drawSnowFlake(x, y, rotation) {
    const l = snow.r;
    const l1 = l * 0.3;
    const l2 = l * 0.4;
    const l3 = l * 0.6;

    ctx.beginPath();
    ctx.strokeStyle = snow.colour;
    ctx.lineWidth = l / 12;

    for (let i = 0; i < 6; i++) {
        const a = rotation + i * a60;
        const cos = Math.cos(a);   
        const sin = Math.sin(a);
        const x1 = x + l1 * cos;
        const y1 = y + l1 * sin;
        const x2 = x + l2 * cos;
        const y2 = y + l2 * sin;
        const x3 = x + l3 * cos;
        const y3 = y + l3 * sin;

        line(x, y, a, l);
        line(x1, y1, a + a120, l1);
        line(x2, y2, a + a60, l2);
        line(x2, y2, a - a60, l2);
        line(x3, y3, a - 1, l2);
        line(x3, y3, a + 1, l2);
    }

    ctx.stroke();
}

function line(x, y, angle, length) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));
}

function drawLine(x, y, angle, length, width, color) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle))
    ctx.stroke()
}

function startSnow() {
    setInterval(addSnowFlake, snow.interval)

    requestAnimationFrame(updateSnow)
}

function addSnowFlake() {
    const speed = snow.minSpeed + (snow.maxSpeed - snow.minSpeed) * Math.random()
    const snowFlake = { x: rnd(innerWidth), y: 0,rotation: rnd(2), speed }

    snowFlakes.push(snowFlake)
    if  (snowFlakes.length > snow.max) snowFlakes.shift()
}

function rnd(limit) {
    return Math.floor(Math.random() * limit)
}

function updateSnow() {
    clearCanvas()

    for (const snowFlake of snowFlakes) {
        if (snowFlake.y < canvas.height) {
            snowFlake.y += snowFlake.speed
            snowFlake.rotation += snowFlake.speed / 300
        }
        drawSnowFlake(snowFlake.x, snowFlake.y, snowFlake.rotation)
    }
    requestAnimationFrame(updateSnow)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}