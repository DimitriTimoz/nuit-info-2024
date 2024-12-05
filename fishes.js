var fishes = [];
var heightmap = [];

export async function initFishes(app, screen, heightmap2) {
    heightmap = heightmap2;
    app.ticker.add((delta) => {
        for (let fish of fishes) {
            fish.move(delta.deltaTime);
        }
    });

    const baleineTexture = await PIXI.Assets.load('/assets/baleine.png');
    const fishTexture = await PIXI.Assets.load('/assets/fish.png');

    const baleine = new PIXI.Sprite(baleineTexture);
    baleine.width *= 0.3;
    baleine.height *= 0.3;
    baleine.x = 500;
    baleine.y = 400;
    baleine.anchor.set(0.5);
    new Fish(baleine, screen, 3);

    for (let i = 0; i < 10; i++) {
        const miniFish = new PIXI.Sprite(fishTexture);
        miniFish.width *= 0.1;
        miniFish.height *= 0.1;
        miniFish.x = 500;
        miniFish.y = 400;
        miniFish.anchor.set(0.5);
        new Fish(miniFish, screen, 2);
    }
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


