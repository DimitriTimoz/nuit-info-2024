import { Bullet } from '/bullet.js';

window.projectiles = []; // tableau pour stocker les tirs

export class Submarine {
    constructor(app, screen, sprite, projectileTexture) {
        this.sprite = sprite;
        this.screen = screen;
        this.speed = 5;
        this.app = app;
        this.projectileTexture = projectileTexture;
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        this.sprite.x = -this.screen.x + this.app.screen.width / 2;
        this.sprite.y = -this.screen.y + this.app.screen.height / 2;
        this.sprite.anchor.set(0.5);

        this.app.ticker.add(delta => {
            this.updateProjectiles(delta.deltaTime);
        } );
    }

    move(keys) {
        let dx = 0;
        let dy = 0;
        if (keys.has('ArrowUp')) {
            dy = 1;
        }
        if (keys.has('ArrowDown')) {
            dy = -1;
        }
        if (keys.has('ArrowLeft')) {
            dx = 1;
        }
        if (keys.has('ArrowRight')) {
            dx = -1;
        }
        // if (keys.has(' ')) {
        //     let x = this.sprite.x - this.screen.x - dx * 10;
        //     let y = this.sprite.y - this.screen.y - dy * 10;
        //     this.fire(x, y);
        //     console.log('fire');
        //     return;
        // }

        if (dx != 0 || dy != 0) {
            let norm = Math.sqrt(dx * dx + dy * dy);
            let multiplier = this.speed / norm;
            dx *= multiplier;
            dy *= multiplier;

            // Check collisions
            let x = this.sprite.x - dx;
            let y = this.sprite.y - dy;
            let indice = Math.floor(x/20);
            if (heightmap[indice] == undefined || -heightmap[indice]*20 <= y) {
                return;
            }

            // Water
            if (y < 0 && dy > 0) {
                dy = 0;
            }
           
            this.screen.x += dx;
            this.screen.y += dy;
            this.sprite.x -= dx;
            this.sprite.y -= dy;

            if (dx < 0) {
                this.sprite.scale.x = Math.abs(this.sprite.scale.x);
                this.sprite.rotation = Math.atan2(dy, dx) + Math.PI;

            } else {
                this.sprite.scale.x = -Math.abs(this.sprite.scale.x);
                this.sprite.rotation = Math.atan2(dy, dx);
            }
        }
    }

    fire(x, y) {
        let angle = Math.atan2(y, x);
        new Bullet(this.screen, this.projectileTexture, this.sprite.x, this.sprite.y,  angle);
    }   

    updateProjectiles(delta) {
        for (let i = window.projectiles.length - 1; i >= 0; i--) {
            window.projectiles[i].update(delta);
        }
    }
}
