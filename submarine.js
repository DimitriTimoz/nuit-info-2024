import { Bullet } from './bullet.js';

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
        this.dark = new PIXI.Graphics();
        this.dark.beginFill(0x000000);
        this.dark.alpha = 0.0;
        this.dark.drawRect(0, 0, this.app.screen.width*2, this.app.screen.height);
        this.dark.endFill();
        this.dark.x = 0;
        this.dark.y = 0;
        this.lightMask = new PIXI.Graphics();
        this.lightMask.beginFill(0xFFFFFF);
        this.lightMask.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.lightMask.endFill();
        this.lightMask.beginFill(0);

        this.lightMask.drawCircle(this.app.screen.width / 2, this.app.screen.height / 2, 200);
        this.lightMask.cut();
        this.lightMask.endFill();

        // Apply the mask to the dark overlay
        this.dark.mask = this.lightMask;

        this.screen.addChild(this.dark);  
        app.ticker.add((delta) => {
            this.screen.removeChild(this.dark);

            this.screen.removeC
            let s = new Set();
            s.add("ArrowDown");
            this.move(s, 1*delta.deltaTime, false);
            this.screen.addChild(this.dark);  
        });
    }

    move(keys, magnitude=undefined, or=true) {
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
            if (magnitude == undefined) {
                magnitude = this.speed;
            }
            let multiplier = magnitude / norm;
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
            this.dark.x -= dx;
            this.dark.y -= dy;
            this.lightMask.x -= dx;
            this.lightMask.y -= dy;
            this.dark.alpha = Math.min(0.8, this.dark.y / 600); 

            if (!or) {
                return;
            }

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
        if (this.lastFire == undefined || Date.now() - this.lastFire > 500) {
            let angle = Math.atan2(y, x);
            new Bullet(this.screen, this.projectileTexture, this.sprite.x, this.sprite.y,  angle);
            this.lastFire = Date.now();    
        }
    }
}
