import { join } from "path"
import { AssetService } from "../services/asset.service"
import { CRUDService } from "./abstract/CRUDService"

export class Assets extends CRUDService {
    public override get: () => void = async () => {
        try {
            const root = join(__dirname, 'assets')
            return await AssetService.search(root, '.png', [])
        } catch (error) {
            console.error(error)
        }
    }
}