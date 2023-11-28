const canvas = document.querySelector('canvas')
canvas.width = 1024
canvas.height = 576

const c = canvas.getContext('2d');

const image = new Image()
image.src = './img/Pellet Town.png'
c.fillStyle = 'white'
c.fillRect(0,0,canvas.width,canvas.height)


image.onload = ()=> {
    c.drawImage(image,-700,-550)
}