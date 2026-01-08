class VendingMachine {
    static instance: VendingMachine | null = null;
    private inventory: Inventory;

    private constructor() {
        this.inventory = new Inventory(3);
    }

    static getInstance() {
        if (VendingMachine.instance) {
            return VendingMachine.instance;
        }
        return VendingMachine.instance = new VendingMachine();
    }

    getInventory(): Inventory {
        return this.inventory;
    }
}

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

    public addQuantity(quantity: number): void {
        if (this.quantity + quantity > this.limit) {
            throw new Error('Too many quantity!');
        }
        this.quantity += quantity;
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
    
    constructor(limit: number) {
        this.limit = limit;
        for (let i=1;i<=limit;i++) {
            this.products.push(null);
        }
    }

    public addProduct(column: number, itemShelfSection: ItemShelfSection): void {
        if (column > this.limit) {
            throw new Error('Invalid Column!');
        }
        
        this.products[column] = itemShelfSection;
    }

    public getProducts(): (ItemShelfSection | null)[] {
        return this.products;
    }

}

class Inventory {
    private itemShelves: ItemShelf[] = [];
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
}

const vendingMachine = VendingMachine.getInstance();
const vendingMachineInventory = vendingMachine.getInventory();
vendingMachineInventory.addItemShelves(new ItemShelf(5));
vendingMachineInventory.addItemShelves(new ItemShelf(8));
vendingMachineInventory.addItemShelves(new ItemShelf(10));
vendingMachineInventory.displayItems();






