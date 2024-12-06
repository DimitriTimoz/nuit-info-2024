import { Collidable } from "./collidable.js";
import { smokeTexture, Smoke } from "./boats.js";

var oilRigs = new Set();
var oilRigTexture;

function spawnOilRig(screen) {
    const oilRig = new PIXI.Sprite(oilRigTexture);
    oilRig.width *= 0.15;
    oilRig.height *= 0.15;
    oilRig.x = (30 + Math.random() * (heightmap.length - 30)) * 20;
    oilRig.y = -30;
    oilRig.anchor.set(0.5);
    oilRig.scale.x = Math.abs(oilRig.scale.x) * -1;

    const graphics = new PIXI.Graphics();
    graphics.rect(oilRig.x - 20, oilRig.y + 30, 3, 9999);
    graphics.rect(oilRig.x - 25, oilRig.y + 30, 3, 9999);
    graphics.rect(oilRig.x, oilRig.y + 30, 3, 9999);
    graphics.rect(oilRig.x + 5, oilRig.y + 30, 3, 9999);
    graphics.fill(0x1a0f00);

    new OilRig(oilRig, screen, graphics);
}

export async function initOilRigs(app, screen) {
    // Add movement updates to the ticker
    let lastSpawn = 0;
    app.ticker.add((delta) => {
        if (lastSpawn + 5000 < delta.lastTime) {
            spawnOilRig(screen);
            lastSpawn = delta.lastTime;
        }
        for (let oilRig of oilRigs) {
            oilRig.move(delta.deltaTime, delta.lastTime);
        }
    });

    oilRigTexture = await PIXI.Assets.load('/assets/oil-rig.png');

    for (let i = 0; i < 5; i++) {
        spawnOilRig(screen);
    }
}

export class OilRig extends Collidable {
    constructor(sprite, screen, graphics) {
        super(sprite, "oil-rig", ["bullets"]); 
        this.sprite = sprite;
        this.graphics = graphics;
        this.screen = screen;
        oilRigs.add(this);
        screen.addChild(this.sprite); // Add sprite to the screen
        screen.addChild(this.graphics);
    }

    move(delta, time) {
        if (this.lastSmoke == undefined || time - this.lastSmoke > 500) {
            this.lastSmoke = time + Math.random() * 250;
            const smoke = new PIXI.Sprite(smokeTexture);
            smoke.width *= 0.25;
            smoke.height *= 0.25;
            smoke.x = this.sprite.x;
            smoke.y = this.sprite.y - 30;
            smoke.anchor.set(0.5);
            new Smoke(smoke, this.sprite.parent, 0.5);
        } 
    }

    onCollision(object) {
        for (let enemy of this.enenemies) {
            if (object.me == enemy) {
                this.destroy();
            }
        }
    }

    destroy() {
        this.screen.removeChild(this.sprite);
        this.screen.removeChild(this.graphics);
        oilRigs.delete(this);
    }
}
