var fishes = [];
var heightmap = [];

export function initFishes(app, heightmap2) {
    heightmap = heightmap2;
    app.ticker.add((delta) => {
        for (let fish of fishes) {
            fish.move(delta.deltaTime);
        }
    });
}

export class Fish {
    constructor(sprite, screen, speed) {
        this.sprite = sprite;
        this.speed = speed;
        this.changeSteer();
        fishes.push(this);
        screen.addChild(this.sprite);
    }

    changeSteer() {
        this.vx = Math.random() - 0.5;
        this.vy = Math.random() - 0.5;
        let norm = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        let multiplier = this.speed / norm;
        this.vx *= multiplier;
        this.vy *= multiplier;
    }

    move(delta) {
        let newX = this.sprite.x + this.vx * delta;
        let newY = this.sprite.y + this.vy * delta;
        let newXidx = Math.floor(newX/20);
        let newYidx = Math.floor(newY/20);

        if (heightmap[newXidx] == undefined || -heightmap[newXidx] <= newYidx || newYidx < 0) {
            this.changeSteer();
        } else {
            this.sprite.x = newX;
            this.sprite.y = newY;
        }
    }
}


