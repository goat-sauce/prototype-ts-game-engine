import { replacer } from "@package/utils"
import { writeFile } from "fs/promises"
import { CRUDService } from "./abstract/CRUDService"
import { api } from '../api'

export class Game extends CRUDService {
    public override create: () => void = async () => {
        const chunks = api.chunks.create()
        await writeFile(`data/world.json`, JSON.stringify(chunks, replacer, 4))
    }
}