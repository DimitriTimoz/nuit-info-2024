var clouds = [];

export async function initClouds(app, screen) {
    app.ticker.add((delta) => {
        for (let cloud of clouds) {
            cloud.move(delta.deltaTime);
        }
    });

    const cloudTexture1 = await PIXI.Assets.load('./assets/cloud1.png');
    const cloudTexture2 = await PIXI.Assets.load('./assets/cloud2.png');
    const cloudTexture3 = await PIXI.Assets.load('./assets/cloud3.png');
    const cloudTexture4 = await PIXI.Assets.load('./assets/cloud4.png');
    const cloudTexture5 = await PIXI.Assets.load('./assets/cloud5.png');
    const cloudTexture6 = await PIXI.Assets.load('./assets/cloud6.png');

    for (let i = 0; i < 100; i++) {
        let randomTexture;
        switch (Math.floor(Math.random() * 6)) {
            case 0:
                randomTexture = cloudTexture1;
                break;
            case 1:
                randomTexture = cloudTexture2;
                break;
            case 2:
                randomTexture = cloudTexture3;
                break;
            case 3:
                randomTexture = cloudTexture4;
                break;
            case 4:
                randomTexture = cloudTexture5;
                break;
            case 5:
                randomTexture = cloudTexture6;
                break;
        }
        const cloud = new PIXI.Sprite(randomTexture);
        cloud.width *= 0.5;
        cloud.height *= 0.5;
        cloud.x = Math.random() * heightmap.length * 20;
        cloud.y = Math.random()*-120 - 180;
        new Cloud(cloud, screen, Math.random() * 0.5 + 1.0);
    }
}

export class Cloud {
    constructor(sprite, screen, speed) {
        this.sprite = sprite;
        this.vx = speed;
        clouds.push(this);
        screen.addChild(this.sprite);
    }

    move(delta) {
        this.sprite.x += this.vx * delta;
        if (this.sprite.x > heightmap.length * 20) {
            this.sprite.x = -100;
        }
    }
}
