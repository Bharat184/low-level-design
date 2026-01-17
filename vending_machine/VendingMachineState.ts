import type { Product } from "./Inventory";
import type { VendingMachineAccount, UserAccount } from "./Account";
import type { Inventory } from "./Inventory";

export abstract class VendingMachineState {
    protected vendingMachineAccount: VendingMachineAccount;
    protected inventory: Inventory;
    protected userAccount: UserAccount;

    constructor(vendingMachineAccount: VendingMachineAccount, inventory: Inventory, userAccount: UserAccount) {
        this.vendingMachineAccount = vendingMachineAccount;
        this.inventory = inventory;
        this.userAccount = userAccount;
    }

    abstract addMoney(amount: number): void;
    abstract dispenseProduct(): void;
    abstract refund(): void;
    abstract selectProduct(product: Product, quantity: number): void;
    abstract next(): VendingMachineState;
    abstract cancel(): void;
}


class IdleState extends VendingMachineState {
    addMoney(amount: number): void {
        throw new Error('INVALID STATE');
    }
    dispenseProduct(): void {
        throw new Error('INVALID STATE');
    }
    refund(): void {
        throw new Error('INVALID STATE');
    }
    selectProduct(product: Product, quantity: number): void {
        throw new Error('INVALID STATE');
    }
    next(): VendingMachineState {
        return new AddMoneyState(this.vendingMachineAccount, this.inventory, this.userAccount);
    }
    cancel() {
        throw new Error('INVALID STATE');
    }
}

class AddMoneyState extends VendingMachineState {
    addMoney(amount: number): void {
        this.userAccount.addBalance(amount);
    }
    dispenseProduct(): void {
        throw new Error('INVALID STATE');
    }
    refund(): void {
        this.userAccount.refund();
    }
    selectProduct(product: Product, quantity: number): void {
        throw new Error('INVALID STATE');
    }
    next() {
        return new SelectProductState(this.vendingMachineAccount, this.inventory, this.userAccount);
    }
    cancel() {
        this.userAccount.refund();
        return new IdleState(this.vendingMachineAccount, this.inventory, this.userAccount);
    }
}

class SelectProductState extends VendingMachineState {
    addMoney(amount: number): void {
        throw new Error('INVALID STATE');
    }
    dispenseProduct(): void {
        throw new Error('INVALID STATE');
    }
    refund(): void {
        this.userAccount.refund();
    }
    selectProduct(product: Product, quantity: number): void {
        if (this.inventory.canSelectProduct(product, quantity)) {
            const totalAmount = this.inventory.getProductAmount(product, quantity);
            if (totalAmount > this.userAccount.getBalance()) {
                console.log('Insufficient Balance! Edit your options');
            }
            this.userAccount.addSelectedProducts(product, quantity);
        } else {
            console.log('Invalid Selection! Edit your options');
        }
    }

    next() {
        return new DispensingState(this.vendingMachineAccount, this.inventory, this.userAccount);
    }

    cancel() {
        this.userAccount.refund();
        this.userAccount.reset();
        return new IdleState(this.vendingMachineAccount, this.inventory, this.userAccount);
    }
}

class DispensingState extends VendingMachineState {
    addMoney(amount: number): void {
        throw new Error('INVALID STATE');
    }

    dispenseProduct(): void {
        const iterator = this.userAccount.getIterators();
        let obj = iterator.next();
        let amount = 0;
        while (!obj.done) {
            amount += this.inventory.dispenseProducts(obj.value[0], obj.value[1]);
            obj = iterator.next();
        }
        this.vendingMachineAccount.addBalance(this.userAccount.getBalance());
        if (this.userAccount.getBalance() - amount > 0) {
            this.userAccount.addBalance(-1 * this.vendingMachineAccount.dispenseChange(this.userAccount.getBalance() - amount));
            this.userAccount.refund();
        }
        this.userAccount.reset();
    }

    refund(): void {
        throw new Error('INVALID STATE');
    }

    selectProduct(product: Product, quantity: number): void {
        throw new Error('INVALID STATE');       
    }

    next() {
        this.dispenseProduct();
        return new IdleState(this.vendingMachineAccount, this.inventory, this.userAccount);
    }

    cancel() {
        throw new Error('INVALID STATE');       
    }
}

export {IdleState, AddMoneyState, SelectProductState, DispensingState};