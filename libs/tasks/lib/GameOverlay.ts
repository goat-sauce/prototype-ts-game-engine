// import { Client } from '@package/core'
// import { Button, Stack, Picker } from '@package/gui'
// import { FederatedPointerEvent } from 'pixi.js'
// import { Task } from './abstract/Task'

// export class GameOverlay extends Task {
//     public override async render() {
//         const build = new Button({ text: 'Build' })

//         build.sprite.interactive = true

//         build.sprite.on('click', (event: FederatedPointerEvent) => {
//             const picker = new Picker([
//                 {
//                     id: 1,
//                     name: 'Farm'
//                 }
//             ])

//             Client.Engine.stage.container.addChild(picker.container)
//         })

//         const stack = new Stack([build.sprite], Client.Engine.renderer)
//         return stack.container
//     }
// }
