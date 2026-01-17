import { Account } from "./Account";
import { AtmInventory } from "./Atm_Inventory";
import { AtmMachine } from "./Atm_Machine";
import { Card } from "./Card";
import { User } from "./User";

let atmInventory = new AtmInventory(10000);
let atm = new AtmMachine(atmInventory);

let user = new User('Bharat Chimariya');
let userAccount = new Account(user, 5000);
let card = new Card(userAccount, 1234);

atm.insertCard(card);
if (atm.verifyPin(1234)) {
    atm.withdrawMoney(40900);
}

atm.insertCard(card);
if(atm.verifyPin(1234)) {
    atm.getBalance();
}