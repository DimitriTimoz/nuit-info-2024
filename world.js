export function drawWorld(graphics, heightmap) {
    for (let x = 0; x < heightmap.length; x++) {
        // draw a blue rectangle from x*10 to x*10+10, height is depth_map[x]

        if (heightmap[x] <= 0) {
            graphics.rect(x * 20, 0, 20, -heightmap[x]*20);
            graphics.fill(0x0000ff);
        }


        console.log(x * 20, 0, 20, heightmap[x]*20);
    }
}
