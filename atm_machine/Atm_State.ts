export interface AtmState {
    getState(): string;
    next(): AtmState;
}
export enum  atmStates {
    'IDLE' = 'idle',
    'CARD INSERTED' = 'ci',
    'SELECT OPTIONS' = 'so',

}
export class IdleState implements AtmState {
    public getState(): string {
        return atmStates["IDLE"];
    }

    next(): AtmState {
        return new CardInsertedState();
    }
}

export class CardInsertedState implements AtmState {
    getState(): string {
        return atmStates["CARD INSERTED"];
    }

    next(): AtmState {
        return new SelectOptiosState();
    }
}

export class SelectOptiosState implements AtmState {
    getState(): string {
        return atmStates["SELECT OPTIONS"];
    }

    next(): AtmState {
        return new IdleState();
    }
}