import { ArcRotateCamera, AssetsManager, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, PointLight, Scene, SpriteMap, Texture, Vector2, Vector3 } from 'babylonjs';

class Game {
    private canvas: HTMLCanvasElement;
    public engine: Engine;
    public scene: Scene;
    private camera: ArcRotateCamera;
    private light: PointLight;
    private sphere: Mesh;

    constructor() {
        this.canvas = document.querySelector<HTMLCanvasElement>('canvas');
        this.engine = new Engine(this.canvas);
    }

    public load() {
        this.scene = new Scene(this.engine);
        this.camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 8, Vector3.Zero());
        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(this.canvas, true);
        this.light = new PointLight("Point", new Vector3(5, 10, 5), this.scene);
        // this.sphere = MeshBuilder.CreateSphere('sphere');
        this.something()
    }

    something() {
        const spritesheet = new Texture("prototype.png", this.scene,
            false, //NoMipMaps
            false, //InvertY usually false if exported from TexturePacker
            Texture.NEAREST_NEAREST, //Sampling Mode
            null, //Onload, you could spin up the sprite map in a function nested here
            null, //OnError
            null, //CustomBuffer
            false, //DeleteBuffer
            Engine.TEXTURETYPE_BYTE //ImageFormageType RGBA
        );

        const assetsManager = new AssetsManager(this.scene);
        const textTask = assetsManager.addTextFileTask("text task", "prototype.json");

        textTask.onSuccess = (task) => {
            const atlasJSON = JSON.parse(task.text)
            const size = new Vector2(6, 3);

            const background = new SpriteMap('background', atlasJSON, spritesheet, {
                stageSize: size,
                flipU: true
            }, this.scene)

            background.changeTiles(0, new Vector2(0, 0), 0)
        };

        assetsManager.load();
    }
}

const game = new Game();

game.load();

game.engine.runRenderLoop(function () {
    game.scene.render();
});

window.addEventListener('resize', function () {
    game.engine.resize();
});