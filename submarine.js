export class Submarine {
    constructor(sprite, screen) {
        this.sprite = sprite;
        this.screen = screen;
        this.speed = 5;
        this.set_sprite_middle();
    }
    set_sprite_middle() {
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.x = this.screen.x;
        this.sprite.y = this.screen.y;
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
                this.sprite.scale.x = -1;
                break;
            case 'right':
                this.screen.x -= this.speed;
                this.sprite.scale.x = 1;
                break;
        }
    }
}

