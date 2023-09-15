import atlas from '../../../build/assets/sprites/actors/villager/atlas.json'
import { Vector2 } from '@package/utils'
import { Prop } from 'entities'
import { Task } from './abstract/Task'

export class Chicken extends Task {
    public override async complete() {
        const chicken = new Prop(atlas)
        chicken.sprite.position = new Vector2(5, 5)
        return chicken.sprite
    }
}
