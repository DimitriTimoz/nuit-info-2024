import { Collidable } from "./collidable.js";
var boats = [];

export async function initBoats(app, screen) {
    // Add movement updates to the ticker
    app.ticker.add((delta) => {
        for (let boat of boats) {
            boat.move(delta.deltaTime);
        }
    });

    const croisiereTexture = await PIXI.Assets.load('/assets/croisiere.png');
    const vacheTexture = await PIXI.Assets.load('/assets/vache.png');

    for (let i = 0; i < 2; i++) {
        // Create and initialize the croisiere boat
        const croisiere = new PIXI.Sprite(croisiereTexture);
        croisiere.width *= 0.5;
        croisiere.height *= 0.5;
        croisiere.x = 20 + Math.random() * (heightmap.length - 2) * 20;
        croisiere.y = -30;
        croisiere.anchor.set(0.5);
        new Boat(croisiere, screen, 2);

        // Create and initialize the vache boat
        const vache = new PIXI.Sprite(vacheTexture);
        vache.width *= 0.05;
        vache.height *= 0.05;
        vache.x = 20 + Math.random() * (heightmap.length - 2) * 20;
        vache.y = -15;
        vache.anchor.set(0.5);
        vache.scale.x = Math.abs(vache.scale.x) * -1; // Ensure proper flip for vache
        new Boat(vache, screen, 1);
    }
}

export class Boat extends Collidable {
    constructor(sprite, screen, speed) {
        super(sprite);
        this.sprite = sprite;
        this.vx = speed; // Set horizontal speed
        boats.push(this); // Add to the global boats array
        screen.addChild(this.sprite); // Add sprite to the screen
    }

    move(delta) {
        // Calculate new position
        const newX = this.sprite.x + this.vx * delta;
        const newXidx = Math.floor(newX / 20);

        // Check heightmap boundaries
        if (heightmap[newXidx] === undefined || -heightmap[newXidx] <= 0) {
            // Reverse direction and flip the boat
            this.vx *= -1;
            this.sprite.scale.x *= -1;
        } else {
            // Update position if within bounds
            this.sprite.x = newX;
        }
    }

    onCollision(object) {
    }
}
