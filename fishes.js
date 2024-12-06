import { Collidable } from "./collidable.js";
var fishes = new Set();

var baleineTexture;
var fishTexture;
var fishTexture2;
var fishTexture3;
var fishTexture4;
var fishTexture5;
var fishTexture6;
var fishTexture7;
var fishTexture8;

function spawnFish(screen) {
    let randomTexture;
    switch (Math.floor(Math.random() * 8)) {
        case 0:
            randomTexture = fishTexture;
            break;
        case 1:
            randomTexture = fishTexture2;
            break;
        case 2:
            randomTexture = fishTexture3;
            break;
        case 3:
            randomTexture = fishTexture4;
            break;
        case 4:
            randomTexture = fishTexture5;
            break;
        case 5:
            randomTexture = fishTexture6;
            break;
        case 6:
            randomTexture = fishTexture7;
            break;
        case 7:
            randomTexture = fishTexture8;
            break;
    }

    const miniFish = new PIXI.Sprite(randomTexture);
    miniFish.width *= 0.3;
    miniFish.height *= 0.3;
    let [x, y] = findRandomPositionInWater();
    miniFish.x = x;
    miniFish.y = y;
    miniFish.anchor.set(0.5);
    new Fish(miniFish, screen, 2);
}

export async function initFishes(app, screen) {
    let lastSpawn = 0;
    app.ticker.add((delta) => {
        if (lastSpawn + 5000 < delta.lastTime && fishes.size < 100) {
            spawnFish(screen);
            lastSpawn = delta.lastTime;
        }
        for (let fish of fishes) {
            fish.move(delta.deltaTime);
        }
    });

    baleineTexture = await PIXI.Assets.load('./assets/baleine.png');
    fishTexture = await PIXI.Assets.load('./assets/fish.png');
    fishTexture2 = await PIXI.Assets.load('./assets/fish2.png');
    fishTexture3 = await PIXI.Assets.load('./assets/fish3.png');
    fishTexture4 = await PIXI.Assets.load('./assets/fish4.png');
    fishTexture5 = await PIXI.Assets.load('./assets/fish5.png');
    fishTexture6 = await PIXI.Assets.load('./assets/fish6.png');
    fishTexture7 = await PIXI.Assets.load('./assets/fish7.png');
    fishTexture8 = await PIXI.Assets.load('./assets/fish8.png');

    const baleine = new PIXI.Sprite(baleineTexture);
    baleine.width *= 0.3;
    baleine.height *= 0.3;
    let [x, y] = findRandomPositionInWater();
    baleine.x = x;
    baleine.y = y;
    baleine.anchor.set(0.5);
    new Fish(baleine, screen, 3);

    for (let i = 0; i < 100; i++) {
        spawnFish(screen);
    }
}

export class Fish extends Collidable {
    constructor(sprite, screen, speed) {
        super(sprite, "fish",  ["trash"]);
        this.sprite = sprite;
        this.speed = speed;
        this.screen = screen;
        this.changeSteer();
        fishes.add(this);
        screen.addChild(this.sprite);
    }

    changeSteer() {
        this.vx = Math.random() - 0.5;
        this.vy = Math.random() - 0.5;
        let norm = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        let multiplier = this.speed / norm;
        this.vx *= multiplier;
        this.vy *= multiplier;

        if (this.vx < 0) {
            if (this.sprite.scale.x > 0) {
                this.sprite.scale.x = -this.sprite.scale.x;
            }
        } else {
            if (this.sprite.scale.x < 0) {
                this.sprite.scale.x = -this.sprite.scale.x;
            }
        }
    }

    move(delta) {
        let newX = this.sprite.x + this.vx * delta;
        let newY = this.sprite.y + this.vy * delta;

        if (!isInWater(newX, newY)) {
            this.changeSteer();
        } else {
            this.sprite.x = newX;
            this.sprite.y = newY;
        }
    }

    onCollision(object) {
       for (let enemy of this.enenemies) {
           if (object.me == enemy) {
               this.destroy();
               break;
           }
       }
    }

    destroy() {
        this.screen.removeChild(this.sprite);
        fishes.delete(this);
    }
}
