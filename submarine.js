
export class Submarine {
    constructor(app, screen, sprite, projectileTexture) {
        this.sprite = sprite;
        this.screen = screen;
        this.speed = 5;
        this.app = app;
        this.projectileTexture = projectileTexture;
        this.projectiles = []; // tableau pour stocker les tirs
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        this.set_sprite_middle();

        this.app.ticker.add(delta => {
            this.updateProjectiles(delta.deltaTime);
        } );
    }

    set_sprite_middle() {
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.x = this.app.screen.width / 2;
        this.sprite.y = this.app.screen.height / 2;
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


        if (dx != 0 || dy != 0) {
            let norm = Math.sqrt(dx * dx + dy * dy);
            let multiplier = this.speed / norm;
            dx *= multiplier;
            dy *= multiplier;

            // Check collisions
            let x = this.sprite.x - this.screen.x  + dx;
            let y = this.sprite.y - this.screen.y + dy;
            console.log(x, y);
            
            // Draw a pixel 
            let indice = Math.floor(x/20);
            if (heightmap[indice] == undefined || -heightmap[indice]*20  < y) {
                return;
            }
            this.screen.x += dx;
            this.screen.y += dy;
            
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
        // Création d’un sprite projectile
        const projectile = new PIXI.Sprite(this.projectileTexture);
        projectile.width *= 0.1;
        projectile.height *= 0.1;
        //projectile.anchor.set(0.5);
        projectile.x = this.sprite.x;
        projectile.y = this.sprite.y;

        // Get the angle
        let rel_x = x - this.sprite.x;
        let rel_y = y - this.sprite.y;
        const angle = Math.atan2(rel_y, rel_x);

        projectile.vx = Math.cos(angle) * 10;
        projectile.vy = Math.sin(angle) * 10;
        this.app.stage.addChild(projectile);
        this.projectiles.push(projectile);
    }

    updateProjectiles(delta) {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.x += p.vx * delta
            p.y += p.vy * delta
            p.vy += 0.05;
            p.vx *= 0.99;
            p.rotation = Math.atan2(p.vy, p.vx);

            let indice = Math.floor(p.x/20);
            if  (heightmap[indice] == undefined || -heightmap[indice]*20  < p.y) {
                this.app.stage.removeChild(p);
                this.projectiles.splice(i, 1);
                return;
            }
        }
    }
}
