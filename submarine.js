export class Submarine {
    constructor(sprite, screen) {
        this.sprite = sprite;
        this.screen = screen;
        this.speed = 5;
    }

    move(direction) {
        switch (direction) {
            case 'up':
                this.screen.y += this.speed;
                break;
            case 'down':
                this.screen.y -= this.speed;
                break;
            case 'left':
                this.screen.x += this.speed;
                break;
            case 'right':
                this.screen.x -= this.speed;
                break;
        }
    }
}

