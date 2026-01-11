import {Inventory} from './Inventory';
import {Dispenser} from './Dispenser';
import { Coffee, CoffeeWithSugar, CoffeeWithVanilla, BasicCoffee, BasicCofeeDecorator } from './Coffee';
import { Payment, PaymentProcessor } from './Payment';

class CoffeeVendingMachine {
    inventory: Inventory;
    dispenser: Dispenser;

    constructor() {
        this.inventory = new Inventory();
        this.dispenser = new Dispenser();
    }

    displayItems() {
        const basicCoffee = new BasicCoffee();
        const coffeeWithSugar: CoffeeWithSugar = new CoffeeWithSugar(basicCoffee);
        const coffeeWithVanilla: CoffeeWithVanilla = new CoffeeWithVanilla(basicCoffee);
        console.log('Basic Coffee: ', basicCoffee.getPrice());
        console.log('Sugar: ', coffeeWithSugar.getPrice());
        console.log('Vanilla: ', coffeeWithVanilla.getPrice());
    }
}

let cvm = new CoffeeVendingMachine();
cvm.inventory.refill('milk', 4000);
cvm.inventory.refill('coffee', 500);
cvm.inventory.refill('sugar', 500);
cvm.inventory.refill('vanilla', 100);
cvm.inventory.refill('water', 5000);
// cvm.displayItems();

let coffee = new BasicCoffee();
coffee = new BasicCofeeDecorator(coffee);
coffee = new CoffeeWithSugar(coffee);
coffee = new CoffeeWithVanilla(coffee);
// console.log(coffee.getTotalPrice());
// console.log(coffee.getDescription());
// console.log(coffee.getIngredients());

if (cvm.inventory.isStockSufficient(coffee.getIngredients())) {
    let paymentProcessor = new PaymentProcessor();
    if (paymentProcessor.pay(new Payment(coffee, 46))) {
        cvm.dispenser.dispense(coffee, cvm.inventory);
    }
} else {
    console.error('Low Stock');
}



