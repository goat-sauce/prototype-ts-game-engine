import { Assets } from "pixi.js"

export class AssetLoader {
    private static assets = [
        'assets/sprites/props/Chicken.png',
        'assets/sprites/actors/Idle1.png',
        'assets/sprites/actors/Idle2.png',
        'assets/sprites/tiles/Grass.png'
    ]

    public static async load() {
        for (const asset of AssetLoader.assets) {
            await Assets.load(asset);
        }
    }
}