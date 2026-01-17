import type { Product } from "./Inventory";

abstract class Account {
    protected balance: number = 0;

    resetBalance(): void {
        this.balance = 0;
    }

     getBalance(): number {
        return this.balance;
    }

    addBalance(amount: number): void {
        this.balance += amount;
    }

    isAmountValid(amount: number): boolean {
        return (this.balance >= amount);
    }
}

class VendingMachineAccount extends Account {
    dispenseChange(amount: number) {
        const change = this.balance - amount;
        return change;
    }
}

class UserAccount extends Account {
    selectedProducts: Map<Product, number> = new Map();

    refund() {
        const change = this.balance;
        console.log(`REFUNDING ${change}...`);
        this.reset();
        return change;
    }

    reset() {
        this.resetBalance();
        this.selectedProducts.clear();
    }
    
    addSelectedProducts(product: Product, quantity: number): void {
        if (this.selectedProducts.has(product)) {
            this.selectedProducts.set(product, this.selectedProducts.get(product)! + quantity);
        } else {
            this.selectedProducts.set(product, quantity);
        }
    }

    getIterators() {
        return this.selectedProducts.entries();
    }
}

export {UserAccount, VendingMachineAccount};