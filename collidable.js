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
            // Adjust bullet positions relative to the screen
            let bulletGlobal = bullet.getGlobalPosition();
            let bound = this.sprite.getBounds();

            if (bound.x < bulletGlobal.x + bullet.width && 
                bound.x + bound.width > bulletGlobal.x &&
                bound.y < bulletGlobal.y + bullet.height &&
                bound.y + bound.height > bulletGlobal.y) {
                console.log("collision");
                console.log(bound.x, bulletGlobal.x);
                this.onCollision(bullet);
                bullet.onCollision(this); // Call the bullet's onCollision method
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

