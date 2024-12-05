
window.collidable_objects = [];

// Check collisions between all collidable objects


export async function initCollidable(app) {
    app.ticker.add((delta) => {
        Collidable.checkCollisions();
    });
}

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

    onCollision(object) {
        throw new Error("Method 'abstractMethod()' must be implemented.");
    }

    static checkCollisions() {
        for (let obj of collidable_objects) {
            obj.checkCollision();
        }
    }
}

