class Product {
    private name: string;
    private price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }
}

class ItemShelfSection {
    private product: Product;
    private quantity: number = 0;
    private limit: number;

    constructor(product: Product, limit: number) {
        this.limit = limit;
        this.product = product;
    }

    public addQuantity(quantity: number): number {
        if (this.quantity + quantity > this.limit) {
            throw new Error('Too many quantity!');
        }
        this.quantity += quantity;
        return this.quantity;
    }

    public deductQuantity(quantity: number): number {
        if (this.quantity < quantity) {
            throw new Error('Product Not Available!');
        }
        this.quantity -= quantity;
        return this.quantity;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getProduct(): Product {
        return this.product;
    }
}

class ItemShelf {
    private products: (ItemShelfSection | null)[] = [];
    private limit: number;
    private inventory: Inventory;
    
    constructor(inventory: Inventory, limit: number) {
        this.limit = limit;
        this.inventory = inventory;
        for (let i=1;i<=limit;i++) {
            this.products.push(null);
        }
    }

    public addProduct(column: number, itemShelfSection: ItemShelfSection): void {
        if (column > this.limit) {
            throw new Error('Invalid Column!');
        }
        if (this.products[column] !== null) {
            throw new Error('Already assigned a product! Try deleting and try again');
        }
        
        this.products[column] = itemShelfSection;
        this.inventory.addProductItemShelfSectionMap(itemShelfSection.getProduct(), itemShelfSection);
    }

    public deleteProduct(column: number): void {
        if (column > this.limit) {
            throw new Error('Invalid Column!');
        }
        this.products[column] = null;
    }

    public addQuantity(column: number, quantity: number): void {
        if (this.products[column] === null) {
            console.log('No product assigned for this shelf section...');
            return;
        }
        this.products[column]?.addQuantity(quantity);
        const productName = this.products[column]?.getProduct().getName();
        this.inventory.addProductMap(productName, this.products[column]?.getQuantity());
    }

    public getProducts(): (ItemShelfSection | null)[] {
        return this.products;
    }

}

class Inventory {
    private itemShelves: ItemShelf[] = [];
    private productsMap: Map<string, {product: Product; count: number}> = new Map();
    private productItemShelfSectionMap: Map<Product, ItemShelfSection[]> = new Map();
    private limit;

    constructor(limit: number) {
        this.limit = limit;
    }

    addItemShelves(itemShelf: ItemShelf): void {
        if (this.itemShelves.length >= this.limit) {
            throw new Error('Max Item Shelf Added');
        }
        this.itemShelves.push(itemShelf);
    }

    displayItems(): void {
        this.itemShelves.forEach(itemShelf => {
            let shelf = '';
            itemShelf.getProducts().forEach((section) => {
                if (section) {
                    shelf += `| ${section.getProduct().getName()}: ${section.getQuantity()} `;
                } else {
                    shelf += `|      EMPTY   `;
                }
            });
            console.log(shelf);
            console.log("\n");
        });
    }

    canSelectProduct(product: Product, quantity: number): boolean {
        if (this.productsMap.has(product.getName()) && this.productsMap.get(product.getName())!.count >= quantity) {
            return true;
        }
        return false;
    }

    getProductAmount(product: Product, quantity: number): number {
        if (this.canSelectProduct(product, quantity)) {
            return product.getPrice() * quantity;
        }
        throw new Error('Product Not Available!');
    }

    dispenseProducts(product: Product, quantity: number): number {
        let amount = 0;
        this.getProductAmount(product, quantity);
        console.log(`Dispensing ${quantity} ${product.getName()}...`);
        const obj: {product: Product; count: number; } = this.productsMap.get(product.getName())!;
        obj!.count -= quantity;
        this.productsMap.set(
            product.getName(),
            obj,
        );
        this.productItemShelfSectionMap.get(product)!.forEach((itemShelfSection) => {
            const validQuantity = Math.min(quantity, itemShelfSection.getQuantity());
            itemShelfSection.deductQuantity(validQuantity);
            amount += (itemShelfSection.getProduct().getPrice() * validQuantity);
            quantity -= validQuantity;
            if (quantity <= 0) {
                console.log('All products dispensed!');
                return amount;
            }
        });

        if (quantity) {
            console.log(`${quantity} Product not dispensed! Money will be refunded`);
        }
        return amount;
    }

    createProduct(name: string, price: number): Product {
        if (!this.productsMap.has(name)) {
            this.productsMap.set(name, {product: new Product(name, price), count: 0});
        }
        return this.productsMap.get(name)!.product;
    }

    getProduct(name: string): Product | null {
        return this.productsMap.has(name) ? this.productsMap.get(name)!.product : null;
    }

    addProductMap(name: string, quantity: number): void {
        const obj: {product: Product; count: number; } | undefined = this.productsMap.get(name);
        if (obj) {
            obj!.count += quantity;
            this.productsMap.set(
                name,
                obj,
            );
        }
    }

    addProductItemShelfSectionMap(product: Product, itemShelfSection: ItemShelfSection): void {
        let arr: ItemShelfSection[] = [];
        if (this.productItemShelfSectionMap.has(product)) {
            arr = this.productItemShelfSectionMap.get(product)!;
        }
        arr.push(itemShelfSection);
        this.productItemShelfSectionMap.set(product, arr);
    }

    iterateProductMap(): void {
        const iterator = this.productsMap.entries();
        let obj = iterator.next();
        while (!obj.done) {
            console.log(obj);
            obj = iterator.next();
        }
    }
}

export {Inventory, ItemShelf, ItemShelfSection, Product};