import { Debug } from "@package/debug";
import { uuid } from "uuidv4";
import { Warning } from "../enum/Warning";

export abstract class CRUDService {
    public ref: string = uuid()
    public create?: () => void = () => { Debug.Logger.warning(Warning.NoServiceOverride) };
    public get?: () => void = () => { Debug.Logger.warning(Warning.NoServiceOverride) };
    public delete?: () => void = () => { Debug.Logger.warning(Warning.NoServiceOverride) };
    public update?: () => void = () => { Debug.Logger.warning(Warning.NoServiceOverride) };
}