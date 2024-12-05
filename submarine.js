
export class Submarine {
    constructor(app, screen, sprite, projectileTexture) {
        this.sprite = sprite;
        this.screen = screen;
        this.speed = 5;
        this.app = app;
        this.projectileTexture = projectileTexture; // texture du projectile
        this.projectiles = []; // tableau pour stocker les tirs

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

    move(direction) {
        switch (direction) {
            case 'up':
                this.screen.y += this.speed;
                // Rotation du sprite
                this.sprite.rotation = -0.5;
                break;
            case 'down':
                this.screen.y -= this.speed;
                this.sprite.rotation = 0.5;
                break;
            case 'left':
                this.screen.x += this.speed;
                this.sprite.scale.x = -1;
                break;
            case 'right':
                this.screen.x -= this.speed;
                this.sprite.scale.x = 1;   
                // On déclenche un tir
                break;
        }
    }

    fire(x, y) {
        // Création d’un sprite projectile
        const projectile = new PIXI.Graphics().rect(0, 0, 40, 20)
            .fill(0xff0000);
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

            if (Math.abs(p.vx) < 0.01) {
                this.app.stage.removeChild(p);
                this.projectiles.splice(i, 1);
            }
            
        }
    }
}
