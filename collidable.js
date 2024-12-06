window.collidable_objects = {};

export async function initCollidable(app) {
    app.ticker.add((delta) => {
        Collidable.checkCollisions();
    });
}

export class Collidable {
    constructor(sprite, me, enenemies) {
        this.sprite = sprite;
        this.enenemies = enenemies;
        this.me = me;
        if (!(this.me in collidable_objects)) {
            collidable_objects[this.me] = new Set();
        }
        collidable_objects[this.me].add(this);

    }

    checkCollision() { 
        let list = new Set();
        for (let key of this.enenemies) {
            if (key in collidable_objects) {
                list = list.union(collidable_objects[key]);
            }
        }
        
        for (let obj of list) {
            // Adjust bullet positions relative to the screen
            let bound = this.sprite.getBounds();
            let bound2 = obj.sprite.getBounds();
            if (bound.x < bound2.x + bound2.width &&
                bound.x + bound.width > bound2.x &&
                bound.y < bound2.y + bound2.height &&
                bound.y + bound.height > bound2.y) {
                obj.onCollision(this); 
                this.onCollision(obj);
                collidable_objects[this.me].delete(this);
            }
        }
    }

    onCollision(object) {
        throw new Error("Method 'abstractMethod()' must be implemented.");
    }

    static checkCollisions() {
        for (let key in collidable_objects) {
            for (let obj of collidable_objects[key]) {
                obj.checkCollision();
            }
        }
    }
}

