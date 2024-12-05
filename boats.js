var boats = [];

export async function initBoats(app, screen) {
    app.ticker.add((delta) => {
        for (let boat of boats) {
            boat.move(delta.deltaTime);
        }
    });

    const croisiereTexture = await PIXI.Assets.load('/assets/croisiere.png');
    const vacheTexture = await PIXI.Assets.load('/assets/vache.png');
    // flip the texture
    for (let i = 0; i < 2; i++) {
        const croisiere = new PIXI.Sprite(croisiereTexture);
        croisiere.width *= 0.5;
        croisiere.height *= 0.5;
        // x is random between 0 and heightmap.length * 20
        croisiere.x = 20 + Math.random() * (heightmap.length-2) * 20;
        croisiere.y = -30;
        croisiere.anchor.set(0.5);

        new Boat(croisiere, screen, 2);

        const vache = new PIXI.Sprite(vacheTexture);
        vache.width *= 0.05;
        vache.height *= 0.05;
        vache.scale.x = -vache.scale.x;
        vache.x = 20 + Math.random() * (heightmap.length-2) * 20;
        vache.y = -10;
        vache.anchor.set(0.5);
        new Boat(vache, screen, 1);
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
            this.sprite.scale.x *= -1;
        } else {
            let dx = this.vx;
            this.sprite.x = newX;
        }
    }
}


