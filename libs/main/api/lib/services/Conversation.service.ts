import { config } from '@shared/config'
import { Debug } from '@shared/debug'
import { FileHelper } from '@shared/helpers'
import { readFile } from 'fs/promises'
import { join, parse } from 'path'
import { ConversationsJSON } from 'preload/core/types'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'

export class ConversationService extends Service {
    public async get(): Promise<{}> {
        try {
            const paths = await FileHelper.search(join(__dirname, config.dir.assets, 'conversations'), '.json', [])
            const conversations: Record<string, ConversationsJSON> = {}

            for (const path of paths) {
                const file = await readFile(path, 'utf-8')
                const json: ConversationsJSON = JSON.parse(file)
                const parsed = parse(path)
                const key = parsed.name
                conversations[key] = json
            }

            return conversations
        } catch (error) {
            Debug.logger.error(Errors.FailedConversationService, error)
            return {}
        }
    }
}
