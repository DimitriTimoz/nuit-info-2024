import { Collidable } from "./collidable.js";
var boats = [];
var smokes = [];

function findRandomPositionOverWater() {
    let x = Math.random() * heightmap.length * 20;
    while (-heightmap[Math.floor(x / 20)] <= 0) {
        x = Math.random() * heightmap.length * 20;
    }
    return x;
}

var croisiereTexture;
var vacheTexture;
var smokeTexture;

export async function initBoats(app, screen) {
    // Add movement updates to the ticker
    app.ticker.add((delta) => {
        for (let boat of boats) {
            boat.move(delta.deltaTime, delta.lastTime);
        }
        for (let smoke of smokes) {
            smoke.move(delta.deltaTime);
        }
    });

    croisiereTexture = await PIXI.Assets.load('/assets/croisiere.png');
    vacheTexture = await PIXI.Assets.load('/assets/vache.png');
    smokeTexture = await PIXI.Assets.load('/assets/smoke.png');

    for (let i = 0; i < 5; i++) {
        // Create and initialize the croisiere boat
        const croisiere = new PIXI.Sprite(croisiereTexture);
        croisiere.width *= 0.5;
        croisiere.height *= 0.5;
        croisiere.x = (30 + Math.random() * (heightmap.length - 30)) * 20;
        croisiere.y = -30;
        croisiere.anchor.set(0.5);
        new Boat(croisiere, screen, 2, "croisiere");

        // Create and initialize the vache boat
        const vache = new PIXI.Sprite(vacheTexture);
        vache.width *= 0.05;
        vache.height *= 0.05;
        vache.x = (30 + Math.random() * (heightmap.length - 30)) * 20;
        vache.y = -15;
        vache.anchor.set(0.5);
        vache.scale.x = Math.abs(vache.scale.x) * -1; // Ensure proper flip for vache
        new Boat(vache, screen, 1, "vache");
    }
}

export class Boat extends Collidable {
    constructor(sprite, screen, speed, ty) {
        super(sprite);
        this.sprite = sprite;
        this.ty = ty;
        this.vx = speed; // Set horizontal speed
        boats.push(this); // Add to the global boats array
        screen.addChild(this.sprite); // Add sprite to the screen
    }

    move(delta, time) {
        if (this.ty == "croisiere" && (this.lastSmoke == undefined || time - this.lastSmoke > 100)) {
            this.lastSmoke = time;
            const smoke = new PIXI.Sprite(smokeTexture);
            smoke.width *= 0.5;
            smoke.height *= 0.5;
            smoke.x = this.sprite.x;
            smoke.y = this.sprite.y - 30;
            smoke.anchor.set(0.5);
            new Smoke(smoke, this.sprite.parent);
        }

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
        // Remove the boat from the screen and global array
        try {
            this.sprite.parent.removeChild(this.sprite);
            boats.splice(boats.indexOf(this), 1);    
        } catch (error) {
            console.error(error);
        }
    }
}

export class Smoke {
    constructor(sprite, screen) {
        this.sprite = sprite;
        smokes.push(this);
        screen.addChild(this.sprite);
    }

    move(delta) {
        this.sprite.y -= 1 * delta;
        this.sprite.alpha -= 0.01 * delta;
        if (this.sprite.alpha <= 0) {
            this.sprite.parent.removeChild(this.sprite);
            smokes.splice(smokes.indexOf(this), 1);
        }
    }
}
