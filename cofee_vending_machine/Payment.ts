import type { Coffee } from "./Coffee";

export class Payment {
    private amountPaid: number;
    private coffee: Coffee;

    constructor(coffee: Coffee, amountPaid: number) {
        this.amountPaid = amountPaid;
        this.coffee = coffee;
    }

    public getPrice() {
        return this.coffee.getTotalPrice();
    }

    public getDescription() {
        return this.coffee.getDescription();
    }

    public isAmountPaidValid() {
        return this.coffee.getTotalPrice() <= this.amountPaid;
    }

    public getChange() {
        return this.amountPaid - this.coffee.getTotalPrice();
    }

}

export class PaymentProcessor {
    pay(payment: Payment): boolean {
        if (!payment.isAmountPaidValid()) {
            console.error('Amount is not sufficient');
            return false;
        }
        console.log(`${payment.getPrice()} paid for ${payment.getDescription()}`);
        if (payment.getChange()) {
            console.log(`Dispensed change:  ${payment.getChange()}`)
        }
        return true;
    }
}

