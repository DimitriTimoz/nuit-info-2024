export class Submarine {
    constructor(app, screen, sprite) {
        this.sprite = sprite;
        this.screen = screen;
        this.speed = 5;
        this.app = app;
        this.set_sprite_middle();
    }
    set_sprite_middle() {
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.x = this.app.screen.width / 2;
        this.sprite.y = this.app.screen.height / 2;
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

