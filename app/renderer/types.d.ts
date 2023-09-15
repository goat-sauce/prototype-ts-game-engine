import { API } from '../preload/api'

declare global {
    export interface Window {
        api: API
    }
}
