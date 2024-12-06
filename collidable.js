
window.collidable_objects = [];

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
            let bound = this.sprite.getBounds();
            if (bound.x < bullet.x + bullet.width && 
                bound.x + bound.width > bullet.x &&
                bound.y < bullet.y + bullet.height &&
                bound.y + bound.height > bullet.y) {

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

