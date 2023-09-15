import { Debug } from '@shared/debug'
import { Channels } from '@shared/channels'
import { Engine } from '../Engine'
import { Errors } from '../Errors'
import { Loader } from './abstract/Loader'
import { Loaded } from 'preload/core/types'
import { Packer } from '../../index'

export class Conversations extends Loader<Packer.ConversationsJSON> {
    public data: Record<string, Packer.ConversationsJSON> = {}

    public async load(): Promise<Loaded> {
        try {
            this.data = await Engine.IPC.invoke<Record<string, Packer.ConversationsJSON>>(Channels.conversations.get)
            if (!Object.keys(this.data).length) throw Errors.NoConversations

            return {
                success: true
            }
        } catch (error) {
            Debug.logger.error(error)

            return {
                success: false
            }
        }
    }
}
