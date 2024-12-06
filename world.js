export function drawWorld(screen, heightmap) {
    // Sky gradient
    const skyGradient = new PIXI.Graphics();
    skyGradient.beginFill(0x87CEEB)
        .drawRect(0, -1000, heightmap.length * 20, 2000)
        .endFill();
    screen.addChild(skyGradient);

    // Sea with gradient
    const seaGraphics = new PIXI.Graphics();
    const gradient = new PIXI.Graphics();
    gradient.beginFill(0x006994, 0.6)
        .drawRect(0, 0, heightmap.length * 20, 2000)
        .endFill();
    
    for (let x = 0; x < heightmap.length; x++) {
        if (heightmap[x] <= 0) {
            seaGraphics.beginFill(0x0066cc, 0.4)
                .drawRect(x * 20, 0, 20, -heightmap[x]*20)
                .endFill();
        }
    }
    
    screen.addChild(seaGraphics);
    screen.addChild(gradient);

    // Ground with gradient
    const groundGraphics = new PIXI.Graphics();
    for (let x = 0; x < heightmap.length; x++) {
        const groundColor = heightmap[x] <= 0 ? 0x3d2b1f : 0x3d2b1f;
        const alpha = heightmap[x] <= 0 ? 1 : 0.9;
        groundGraphics.beginFill(groundColor, alpha)
            .drawRect(x * 20, -heightmap[x]*20, 20, 1000000)
            .endFill();
    }
    screen.addChild(groundGraphics);
}
