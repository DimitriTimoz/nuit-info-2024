export function drawWorld(screen, heightmap) {
    // Sea
    const graphics = new PIXI.Graphics();
    for (let x = 0; x < heightmap.length; x++) {
        if (heightmap[x] <= 0) {
            graphics.rect(x * 20, 0, 20, -heightmap[x]*20);
        }
    }
    graphics.fill(0x0000ff);
    screen.addChild(graphics);

    // Ground
    const graphics2 = new PIXI.Graphics();
    for (let x = 0; x < heightmap.length; x++) {
        graphics2.rect(x * 20, -heightmap[x]*20, 20, 1000000);
    }
    graphics2.fill(0x1a0f00);
    screen.addChild(graphics2);
}
