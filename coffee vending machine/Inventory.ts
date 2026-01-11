import  type { CoffeeIngredientsQuantity } from "./Coffee";

class Ingredient {
    private unit: string;
    private name: string;
    private quantity: number;

    constructor(unit: string, name: string, quantity: number = 0) {
        this.unit = unit;
        this.name = name;
        this.quantity = quantity;
    }

    public getUnit(): string {
        return this.unit;
    }

    public getName(): string {
        return this.name;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public consume(quantity: number): void {
        if (!this.isQuantitySufficient(quantity)) {
            console.error('Less Quantity');
            return;
        }
        this.quantity -= quantity;
    }

    public refill(quantity: number): void {
        this.quantity += quantity;
    }

    public isQuantitySufficient(quantity: number): boolean {
        return this.quantity >= quantity;
    }
}

export class Inventory {
    stock: Map<string, Ingredient>;

    constructor() {
        this.stock = new Map();
        this.stock.set('milk', new Ingredient('milk', 'millilitre'));
        this.stock.set('coffee', new Ingredient('coffee', 'grams'));
        this.stock.set('sugar', new Ingredient('sugar', 'grams'));
        this.stock.set('water', new Ingredient('water', 'millilitre'));
        this.stock.set('vanilla', new Ingredient('vanilla', 'grams'));
    }

    refill(name: string, quantity: number): void {
        if (!this.isAvailable(name)) {
            console.error('Ingredient Not Available!');
            return;
        }
        this.stock.get(name)!.refill(quantity);
    }

    consume(name: string, quantity: number) {
        if (!this.isAvailable(name)) {
            console.error('Ingredient Not Available!');
            return;
        }
        this.stock.get(name)!.consume(quantity);
    }

    isStockSufficient(ingredients: CoffeeIngredientsQuantity): boolean {
        for (const key in ingredients) {
            if (ingredients.hasOwnProperty(key) && this.isAvailable(key) && this.stock.get(key)!.getQuantity() < ingredients[key]) {
                return false;
            }
        }
        return true;
    }

    isAvailable(name: string): boolean {
        return this.stock.has(name);
    }

}