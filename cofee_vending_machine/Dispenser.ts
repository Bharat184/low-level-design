import type { Coffee } from "./Coffee";
import type { Inventory } from "./Inventory";

export class Dispenser {
    dispense(coffee: Coffee, inventory: Inventory): void {
        const ingredients = coffee.getIngredients();
        for (const key in ingredients) {
            if (ingredients.hasOwnProperty(key)) {
                // console.log(`${key}: ${ingredients[key]}`);
                inventory.consume(key, ingredients[key]);
            }
        }
    }
}