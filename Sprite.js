class Sprite {
    constructor({position, image, frames = {max: 1}}) {
        this.position = position
        this.image = image
        this.frames = frames;
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
    }

    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

    }
}