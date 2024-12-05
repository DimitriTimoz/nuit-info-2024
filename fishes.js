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
    constructor(sprite, screen, vx, vy) {
        this.sprite = sprite;
        this.vx = vx;
        this.vy = vy;
        fishes.push(this);
        screen.addChild(this.sprite);
    }

    move(delta) {
        let newX = this.sprite.x + this.vx * delta;
        let newY = this.sprite.y + this.vy * delta;
        let newXidx = Math.floor(newX/20);
        let newYidx = Math.floor(newY/20);

        if (heightmap[newXidx] == undefined || -heightmap[newXidx] <= newYidx) {
            let random01 = Math.random();
            this.vx = random01 - 0.5;
            this.vy = 1-random01 - 0.5;
            console.log(`${this.vx}, ${this.vy}`)
        } else {
            this.sprite.x = newX;
            this.sprite.y = newY;
        }
    }
}


