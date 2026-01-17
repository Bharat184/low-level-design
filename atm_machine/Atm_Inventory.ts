export class AtmInventory {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    public isSufficient(amount: number): boolean {
        return this.balance >= amount;
    }

    public withdraw(amount: number): void {
        if (this.isSufficient(amount)) {
            this.balance -= amount;
            console.log('Dispensing Money: ' + amount)
            return;
        }
        console.error('Amount Not Sufficient');
     
    }
}