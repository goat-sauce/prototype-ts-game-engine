import { Debug } from '@shared/debug'
import { Channels } from '@shared/channels'
import { Engine } from '../Engine'
import { Errors } from '../Errors'
import { Loader } from './abstract/Loader'
import { Loaded, ConversationsJSON } from 'preload/core/types'

export class Conversations extends Loader<ConversationsJSON> {
    public data: Record<string, ConversationsJSON> = {}

    public async load(): Promise<Loaded> {
        try {
            this.data = await Engine.IPC.invoke<Record<string, ConversationsJSON>>(Channels.conversations.get)
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
