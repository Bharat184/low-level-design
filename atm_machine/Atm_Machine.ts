import { AtmInventory } from "./Atm_Inventory";
import { AtmState, atmStates, IdleState } from "./Atm_State";
import { Card } from "./Card";

export class AtmMachine {
    private atmInventory: AtmInventory;
    private atmState: AtmState;
    private card: Card | null = null;

    constructor(atmInventory: AtmInventory) {
        this.atmInventory = atmInventory;
        this.atmState = new IdleState();;
    }

    insertCard(card: Card): void {
        if (this.atmState.getState() !== atmStates["IDLE"]) {
            console.error('Invalid State');
            return;
        }
        this.card = card;
        this.atmState = this.atmState.next();
    }

    verifyPin(pin: number): boolean {
        if (this.atmState.getState() !== atmStates["CARD INSERTED"] || !this.card) {
            console.error('Invalid State');
            return false;
        }
        
        if (this.card!.verifyPin(pin)) {
            this.atmState = this.atmState.next();
            return true;
        }
        console.error('Invalid Pin! Reinsert your card and try again');
        this.atmState = new IdleState();
        return false;
    }

    withdrawMoney(amount: number) {
        if (this.atmState.getState() !== atmStates['SELECT OPTIONS']) {
            console.error('Invalid State');
            return;
        }
        this.card!.withdraw(amount);
        this.card = null;
        this.atmState = this.atmState.next();
    }

    getBalance() {
         if (this.atmState.getState() !== atmStates['SELECT OPTIONS'] || !this.card) {
            console.error('Invalid State');
            return;
        }
        const balance = this.card!.getBalance();
        console.log(`Balance: ` + balance);
        this.atmState = this.atmState.next();
        this.card = null;
    }

    cancel() {
        if (this.atmState.getState() !== atmStates["IDLE"]) {
            this.atmState = new IdleState();
            this.card = null;
            console.error('Cancelling transaction');
        }
    }



    
}