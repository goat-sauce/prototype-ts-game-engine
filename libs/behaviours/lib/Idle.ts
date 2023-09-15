import { Behaviour } from './abstract/Behaviour'

export class Idle extends Behaviour {
    public override perform() {
        return;
    }
}
