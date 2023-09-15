// import { Container, FederatedPointerEvent, MIPMAP_MODES, Sprite, Texture } from "pixi.js";
// import { Tilemap } from "./Tilemap";
// import { Vector2 } from "./Vector2";

// export class Tile {
//     public key: string;
//     private sprite: Sprite;
//     private texture: Texture;

//     constructor(container: Container, position: Vector2, size: 16 | 32 | 64 | 128) {
//         this.key = Tilemap.key(position)
//         this.texture = Texture.from('Grass.png', {
//             width: 32,
//             height: 32,
//             mipmap: MIPMAP_MODES.POW2,
//         });

//         this.sprite = new Sprite(this.texture);
//         this.sprite.position.x = size * position.x;
//         this.sprite.position.y = size * position.y;
//         this.sprite.height = size;
//         this.sprite.width = size;
//         this.sprite.interactive = true;
//         this.sprite.on('mouseenter', (event: FederatedPointerEvent) => {
//             const sprite = event.path.pop() as Sprite;
//             console.log(sprite.position);
//         })
//         container.addChild(this.sprite)
//     }
// }