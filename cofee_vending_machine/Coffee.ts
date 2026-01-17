
export type CoffeeIngredientsQuantity = {
    milk?: number;
    coffee?: number;
    sugar?: number;
    vanilla?: number;
}

export interface Coffee {
    getPrice(): number;
    getTotalPrice(): number;
    getDescription(): string;
    getIngredients(): CoffeeIngredientsQuantity;
}

export class BasicCoffee implements Coffee {
    getPrice(): number {
        return 10;
    }
    getTotalPrice(): number {
        return 10;
    }
    getDescription(): string {
        return "Basic Coffee: ";
    }
    getIngredients(): CoffeeIngredientsQuantity {
        return {milk: 80, coffee: 20};
    }
}

export class BasicCofeeDecorator implements Coffee {
    coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getPrice(): number {
        return this.coffee.getPrice()
    }

    getTotalPrice(): number {
        return this.coffee.getTotalPrice();
    }

    getDescription(): string {
        return this.coffee.getDescription();
    }

    getIngredients(): CoffeeIngredientsQuantity {
        return this.coffee.getIngredients();
    }
}

export class CoffeeWithSugar implements Coffee {
    coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getPrice(): number {
        return 5;
    }

    getTotalPrice(): number {
        return this.coffee.getTotalPrice() + this.getPrice();
    }

    getDescription(): string {
        return this.coffee.getDescription() + ' Sugar';
    }

    getIngredients(): CoffeeIngredientsQuantity {
        const obj = this.coffee.getIngredients();
        return {...obj, sugar: (obj.sugar ?? 0) + 20};
    }
}

export class CoffeeWithVanilla implements Coffee {
    coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getPrice(): number {
        return 30;
    }

    getTotalPrice(): number {
        return this.coffee.getTotalPrice() + this.getPrice();
    }

    getDescription(): string {
        return this.coffee.getDescription() + ' Vanilla';
    }

    getIngredients(): CoffeeIngredientsQuantity {
        const obj = this.coffee.getIngredients();
        return {...obj, vanilla: (obj.vanilla ?? 0) + 30};
    }
}