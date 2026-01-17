
import { VendingMachine } from "./VendingMachine";
import { ItemShelf, ItemShelfSection } from "./Inventory";

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception: ' + err);
  process.exit(1);
});

const vendingMachine = VendingMachine.getInstance();
const vendingMachineInventory = vendingMachine.inventory;

const chips = vendingMachineInventory.createProduct('chips', 30);
const dietCoke = vendingMachineInventory.createProduct('diet coke', 70);
const water = vendingMachineInventory.createProduct('water', 20);
vendingMachineInventory.addProductMap(chips.getName(), 0);
vendingMachineInventory.addProductMap(dietCoke.getName(), 0);
vendingMachineInventory.addProductMap(water.getName(), 0);

const itemShelf1 = new ItemShelf(vendingMachineInventory, 2);
itemShelf1.addProduct(0, new ItemShelfSection(chips, 5));
itemShelf1.addProduct(1, new ItemShelfSection(chips, 5));
itemShelf1.addQuantity(0, 5);
itemShelf1.addQuantity(1, 5);

const itemShelf2 = new ItemShelf(vendingMachineInventory, 3);
itemShelf2.addProduct(0, new ItemShelfSection(dietCoke, 10));
itemShelf2.addQuantity(0, 10);

const itemShelf3 = new ItemShelf(vendingMachineInventory, 4);
itemShelf3.addProduct(3, new ItemShelfSection(water, 6));
itemShelf3.addQuantity(3, 6);

vendingMachineInventory.addItemShelves(itemShelf1);
vendingMachineInventory.addItemShelves(itemShelf2);
vendingMachineInventory.addItemShelves(itemShelf3);
// vendingMachineInventory.displayItems();

vendingMachine.vendingMachineState = vendingMachine.vendingMachineState.next();
vendingMachine.vendingMachineState.addMoney(300);
vendingMachine.vendingMachineState = vendingMachine.vendingMachineState.next();
vendingMachine.vendingMachineState.selectProduct(chips,8);
// vendingMachine.vendingMachineState.selectProduct(dietCoke, 10);
vendingMachine.vendingMachineState = vendingMachine.vendingMachineState.next();
// vendingMachine.vendingMachineState.cancel();
vendingMachine.vendingMachineState.dispenseProduct();
vendingMachine.vendingMachineState = vendingMachine.vendingMachineState.next().next();
vendingMachine.vendingMachineState.addMoney(60);
vendingMachine.vendingMachineState = vendingMachine.vendingMachineState.next();
vendingMachine.vendingMachineState.selectProduct(chips,2);
vendingMachine.vendingMachineState = vendingMachine.vendingMachineState.next();
vendingMachine.vendingMachineState.dispenseProduct();
vendingMachine.vendingMachineState = vendingMachine.vendingMachineState.next();





