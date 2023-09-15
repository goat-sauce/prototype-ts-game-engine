import { Client } from '@package/core'
import { Button, Stack, Picker } from '@package/gui'
import { FederatedPointerEvent } from 'pixi.js'
import { Task } from './abstract/Task'

export class GameOverlay extends Task {
    public override async complete() {
        const build = new Button({ text: 'Build' })

        build.sprite.interactive = true

        build.sprite.on('click', (event: FederatedPointerEvent) => {
            const picker = new Picker([
                {
                    id: 1,
                    name: 'Farm'
                }
            ])
            // const panel = new Panel();
            // panel.container.position.x = Client.Engine.renderer.screen.width / 2 - panel.container.width / 2
            // panel.container.position.y = Client.Engine.renderer.screen.height / 2 - panel.container.height / 2
            Client.Engine.stage.addChild(picker.container)
        })

        const stack = new Stack([build.sprite], Client.Engine.renderer)
        return stack.container
    }
}
