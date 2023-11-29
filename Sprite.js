class Sprite {
    constructor({position, image, frames = {max: 1,}, sprites}) {
        this.position = position;
        this.image = image;
        this.frames = {...frames,current: 0, elapsed: 0};
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        };
        this.sprites = sprites;
        this.moving = false;
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.current * this.width,
            0,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        this.updateFrames();
    }

    updateFrames() {
        if (!this.moving) {
            return
        }
        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.current < this.frames.max - 1) {
                this.frames.current++;
            } else {
                this.frames.current = 0;
            }
        }

    }
}