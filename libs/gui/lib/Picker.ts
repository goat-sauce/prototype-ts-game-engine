import { Client } from '@package/core'
import { Task } from '@package/tasks'
import { Vector2 } from '@package/utils'
import { Container, Graphics, Text } from 'pixi.js'
import { Farm } from 'tasks/lib/Farm'
import { Panel } from './Panel'

type Resource = {
    id: number
    name: string
}

export class Picker {
    private panel: Panel = new Panel()
    public container: Container = new Container()

    constructor(resources: Resource[]) {
        this.panel.container.position.x = Client.Engine.renderer.screen.width / 2 - this.panel.container.width / 2
        this.panel.container.position.y = Client.Engine.renderer.screen.height / 2 - this.panel.container.height / 2
        this.table(resources)
        this.container.addChild(this.panel.container)
    }

    table(resources: Resource[]) {
        const table = {
            container: new Container(),
            columns: 8,
            border: 1,
            row: {
                size: this.panel.container.width
            },
            cell: {
                offset: 50
            }
        }

        let rows = 0
        let cols = 0

        for (const [index, resource] of resources.entries()) {
            const size = (table.row.size - table.border) / table.columns
            const cell = this.cell(new Vector2(size, size), table.border)
            const eol = (index + 1) % table.columns === 0
            const text = new Text(resource.name, {
                fontSize: '16'
            })

            text.position.x = 8
            text.position.y = 8
            cell.position.y = table.cell.offset + size * rows
            cell.position.x = size * cols++
            cell.addChild(text)
            cell.interactive = true
            cell.on('click', () => {
                this.container.destroy()
                this.container = new Container()
                Client.Engine.mode = Client.Mode.Placement;
                // const tasks = Client.Engine.state.get<Task[]>('tasks')
                // tasks.push(new Farm())
            })
            table.container.addChild(cell)
            if (eol) {
                rows++
                cols = 0
            }
        }

        this.panel.container.addChild(table.container)
    }

    row() { }

    cell(position: Vector2, border: number) {
        const graphics = new Graphics()
        graphics.beginFill(0xffff00)
        graphics.lineStyle(border, 0xff0000)
        graphics.drawRect(0, 0, position.x, position.y)
        return graphics
    }
}
