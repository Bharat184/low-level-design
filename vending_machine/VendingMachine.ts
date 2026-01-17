import { Inventory } from "./Inventory";
import { VendingMachineAccount, UserAccount } from "./Account";
import type { VendingMachineState } from "./VendingMachineState";
import { IdleState } from "./VendingMachineState";

export class VendingMachine {
    static instance: VendingMachine | null = null;
    public inventory: Inventory;
    public vendingMachineAccount: VendingMachineAccount;
    public userAccount: UserAccount;
    public vendingMachineState: VendingMachineState;

   
    private constructor() {
        this.inventory = new Inventory(3);
        this.vendingMachineAccount = new VendingMachineAccount();
        this.userAccount = new UserAccount();
        this.vendingMachineState = new IdleState(this.vendingMachineAccount, this.inventory, this.userAccount);
    }

    static getInstance() {
        if (VendingMachine.instance) {
            return VendingMachine.instance;
        }
        return VendingMachine.instance = new VendingMachine();
    }
}