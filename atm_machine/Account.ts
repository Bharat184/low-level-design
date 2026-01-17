import type { User } from "./User";

export class Account {
    private user: User;
    private balance: number;

    constructor(user: User, balance: number) {
        this.user = user;
        this.balance = balance;
    }

    public deposit(amount: number): number {
        this.balance += amount;
        return this.balance;
    }

    public isSufficient(amount: number): boolean {
        return this.balance >= amount;
    }

    public withdraw(amount:number): number {
        if (this.isSufficient(amount)) {
            console.log('Dispatching Money: ', amount);
            this.balance -= amount;
            return this.balance;
        }
        console.error('Amount Not Sufficient');
        return this.balance;
        
    }

    public getBalance(): number {
        return this.balance;
    }
}