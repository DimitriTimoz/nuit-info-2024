
window.collidable_objects = [];

export class Collidable {
    constructor(sprite) {
        this.sprite = sprite;
        collidable_objects.push(this);
    }

    checkCollision() {
        for (let bullet of window.projectiles) {
            if (this.sprite.getBounds().contains(bullet.sprite.x, bullet.sprite.y)) {
                this.onCollision(bullet);
                bullet.onCollision(this);
            }
        }
    }

    static checkCollisions() {
        for (let obj of collidable_objects) {
            obj.checkCollision();
        }
    }
}

