let groundStuff = [];

export async function initKelp(screen) {
    const kelpTexture = await PIXI.Assets.load('/assets/kelp.png');
    const kelpTexture2 = await PIXI.Assets.load('/assets/kelp2.png');
    const coralTexture = await PIXI.Assets.load('/assets/corail1.png');
    const coralTexture2 = await PIXI.Assets.load('/assets/corail2.png');
    const treesTexture = await PIXI.Assets.load('/assets/trees.png');
    const hutTexture = await PIXI.Assets.load('/assets/hut.png');

    // const rockTexture = await PIXI.Assets.load('/assets/rock1.png');
    // const rockTexture2 = await PIXI.Assets.load('/assets/rock2.png');

    // for (let i = 0; i < heightmap.length; i++) {
    //     if (Math.random() < 0.9) {
    //         continue;
    //     }
        
    //     let randomTexture = Math.random() > 0.5 ? rockTexture : rockTexture2;
    //     const rock = new PIXI.Sprite(randomTexture);
    //     rock.width = 120;
    //     rock.height = 120;
    //     rock.x = i * 20 - 60;
    //     rock.y = -heightmap[i] * 20 - 120;
    //     rock.alpha = 0.9;
    //     screen.addChild(rock);
    // }

    for (let i = 0; i < heightmap.length; i++) {
        let randomTexture;
        if (0 <= heightmap[i]) {
            randomTexture = Math.random() > 0.1 ? treesTexture : hutTexture;
        } else if (-20 <= heightmap[i] && heightmap[i] <= -10) {
            randomTexture = Math.random() > 0.5 ? coralTexture : coralTexture2;
        } else {
            randomTexture = Math.random() > 0.5 ? kelpTexture : kelpTexture2;
        }
        const stuff = new PIXI.Sprite(randomTexture);
        stuff.width = 40;
        stuff.height = 40;
        stuff.x = i * 20 - 10;
        stuff.y = -heightmap[i] * 20 - 30;

        if (randomTexture === treesTexture) {
            stuff.width = 80;
            stuff.height = 80;
            stuff.y -= 30;
            stuff.x -= 20;
        } else if (randomTexture === hutTexture) {
            stuff.width = 50;
            stuff.height = 50;
            stuff.y -= 5;
            stuff.x -= 5;
        }
        
        screen.addChild(stuff);
    }
}
