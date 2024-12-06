
import { Collidable } from '/collidable.js';

let projectiles = new Set();

export async function initBullets(app) {
    app.ticker.add((delta) => {
        Bullet.updateProjectiles(delta.deltaTime);
    });
}

export class Bullet extends Collidable {
    constructor(screen, texture, x, y, angle) {
        const sprite = new PIXI.Sprite(texture);
        sprite.width *= 0.1;
        sprite.height *= 0.1;
        sprite.anchor.set(0.5);
        sprite.x = x;
        sprite.y = y;

        super(sprite, "bullets", ["trash", "boat"]);
        this.screen = screen;
        this.vx = Math.cos(angle) * 12;
        this.vy = Math.sin(angle) * 12;
        this.ttl = 500;

        screen.addChild(sprite);

        projectiles.add(this);
    }

    update(delta) {
        this.sprite.x += this.vx * delta;
        this.sprite.y += this.vy * delta;
        this.vy += 0.05;
        this.vx *= 0.99;
        this.sprite.rotation = Math.atan2(this.vy, this.vx);

        let x = this.sprite.x;
        let y = this.sprite.y;
        let indice = Math.floor(x / 20);
        if (heightmap[indice] == undefined || -heightmap[indice] * 20 < y) {
            this.destroy();
        }

        this.ttl -= delta;
        if (this.ttl <= 0) {
            this.destroy();
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
        projectiles.delete(this);
    }

    static updateProjectiles(delta) {
        for (let projectile of projectiles) {
            projectile.update(delta);
        }
    }
}
