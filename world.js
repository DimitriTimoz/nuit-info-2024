export function drawWorld(graphics, depthMap) {
    for (let x = 0; x < depthMap.length; x++) {
        // draw a blue rectangle from x*10 to x*10+10, height is depth_map[x]
        graphics.rect(x * 10, 0, 10, depthMap[x]*10);
        graphics.fill(0x0000ff);

        console.log(x * 10, 0, 10, depthMap[x]*10);
    }
}

