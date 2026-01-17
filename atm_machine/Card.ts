import { Account } from "./Account";

export class Card {
    private account: Account;
    private pin: number;

    constructor(account: Account, pin: number) {
        this.account = account;
        this.pin = pin;
    }

    verifyPin(pin: number): boolean {
        return this.pin === pin;
    }

    withdraw(amount: number): number {
        return this.account.withdraw(amount);
    }

    deposit(amount: number): number {
        return this.account.deposit(amount);
    }

    getBalance(): number {
        return this.account.getBalance();
    }


}