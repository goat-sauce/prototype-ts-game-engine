import { Assets } from 'pixi.js'

export class AssetLoader {
    private static assets = [
        'assets/sprites/props/farm/base.png',
        'assets/sprites/actors/villager/base.png',
        'assets/sprites/tiles/base/Grass.png'
    ]

    public static async load() {
        for (const asset of AssetLoader.assets) {
            await Assets.load(asset)
        }
    }
}
