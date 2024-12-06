export async function initIndicators(app, screen) {
    let earTexture = await PIXI.Assets.load('assets/ear.png');
    let ear = new PIXI.Sprite(earTexture);
    ear.anchor.set(0.5);
    ear.x = app.screen.width / 2;
    ear.y = 110;
    ear.scale.x *= 0.05;
    ear.scale.y *= 0.05;
    app.stage.addChild(ear);

    app.ticker.add((delta) => {
        let croisiere_counts = 0;
        for (let boat of boats) {
            if (boat.ty === "croisiere") {
                croisiere_counts++;
            }
        }
        // ear.alpha = croisiere_counts > 3 ? 1 : 0;
    });
}


