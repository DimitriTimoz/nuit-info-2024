var boats = [];

export async function initBoats(app, screen) {
    app.ticker.add((delta) => {
        for (let boat of boats) {
            boat.move(delta.deltaTime);
        }
    });

    const croisiereTexture = await PIXI.Assets.load('/assets/croisiere.png');

    for (let i = 0; i < 2; i++) {
        const croisiere = new PIXI.Sprite(croisiereTexture);
        croisiere.width *= 0.5;
        croisiere.height *= 0.5;
        // x is random between 0 and heightmap.length * 20
        croisiere.x = 20 + Math.random() * (heightmap.length-2) * 20;
        croisiere.y = -30;
        croisiere.anchor.set(0.5);
        new Boat(croisiere, screen, 2);
    }
}

export class Boat {
    constructor(sprite, screen, speed) {
        this.sprite = sprite;
        this.vx = speed;
        boats.push(this);
        screen.addChild(this.sprite);
    }

    move(delta) {
        let newX = this.sprite.x + this.vx * delta;
        let newXidx = Math.floor(newX/20);

        if (heightmap[newXidx] == undefined || -heightmap[newXidx] <= 0) {
            this.vx *= -1;
        } else {
            this.sprite.x = newX;
        }
    }
}


