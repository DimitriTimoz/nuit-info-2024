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
        if (this.enenemies == undefined) {
            return;
        }

        for (let key of this.enenemies) {
            if (this.me == "boat" && key == "bullets") {
                console.log("boat");
            }
            if (key in collidable_objects) {
                list = list.union(collidable_objects[key]);
            }
        }
        
        for (let obj of list) {
            // Adjust bullet positions relative to the screen
            let bound = this.sprite.getBounds();
            if (this.me == "boat") {
                console.log("boat");
            }
            let bound2 = obj.sprite.getBounds();
            if (bound.x < bound2.x + bound2.width &&
                bound.x + bound.width > bound2.x &&
                bound.y < bound2.y + bound2.height &&
                bound.y + bound.height > bound2.y) {

                collidable_objects[this.me].delete(this);
                obj.onCollision(this); 
                this.onCollision(obj);
            }
        }
    }

    onCollision(object) {
        throw new Error("Method 'abstractMethod()' must be implemented.");
    }

    static checkCollisions() {
        for (let key in collidable_objects) {
            if (key == "boat") {
                console.log("boat");
            }
            for (let obj of collidable_objects[key]) {
                obj.checkCollision();
            }
        }
    }
}

