//FACTORY PATTERN TO GET FLOOR WISE PARKING LOT OBJECT
// AN ORCHESTRATOR CLASS TO MANAGE PARKING AND UNPARKING OF VEHICLES WHICH FLOOR TO ALLOT FOR PARKING

class Manager {
    floor0 = floorPakingFactory(0);
    floor1 = floorPakingFactory(1);

    
}

function floorPakingFactory(floor: number): ParkingLot {
    let parkingLot: ParkingLot = new ParkingLot();
    let standardParking: ParkingType = new StandardParking('standard');
    let premiumParking: ParkingType = new PremiumParking('premium');

    if (floor === 0) {
        parkingLot.addParkingSlots(new ParkingSlot(1, 'bike', standardParking));
        parkingLot.addParkingSlots(new ParkingSlot(2, 'bike', premiumParking));
        return parkingLot;
    } else if (floor === 1) {
        parkingLot.addParkingSlots(new ParkingSlot(1, 'car', standardParking));
        parkingLot.addParkingSlots(new ParkingSlot(2, 'car', premiumParking));
        return parkingLot;
    }

    throw new Error('Unknown Floor');
}

class ParkingLot {
    private parkingSlots: ParkingSlot[] = [];

    addParkingSlots(parkingSlot: ParkingSlot) {
        this.parkingSlots.push(parkingSlot);
    }

    getFreeSlots(): ParkingSlot | null {
        this.parkingSlots.forEach((parkingSlot) => {
            if (!parkingSlot.isBooked()) {
                return parkingSlot;
            }
        });
        return null;
    }
}

class FloorParking {
    private floorParkings: Record<number, ParkingLot> = {};

    addFloorParkings(floorNumber: number, parkingLot: ParkingLot): void {
        if (Object.hasOwn(this.floorParkings, floorNumber)) {
            throw new Error('This floor already has parking lot initialised');
        }
        this.floorParkings[floorNumber] = parkingLot;
    }
}

interface Vehicle {
    vehicleNumber: string;
    vehicleType: string;
}

class Car implements Vehicle {
    vehicleNumber: string;
    vehicleType: string;

    constructor(vehicleNumber: string, vehicleType: string) {
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
    }
}

class Bike implements Vehicle {
    vehicleNumber: string;
    vehicleType: string;

    constructor(vehicleNumber: string, vehicleType: string) {
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
    }
}

class Truck implements Vehicle {
    vehicleNumber: string;
    vehicleType: string;

    constructor(vehicleNumber: string, vehicleType: string) {
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
    }
}

class ParkingSlot {
    parkingLotId: number;
    vehicleType: string;
    parkingType: ParkingType;
    private parkedVehicle: null | Vehicle = null;

    constructor(parkingLotId: number, vehicleType: string, parkingType: ParkingType) {
        this.parkingLotId = parkingLotId;
        this.vehicleType = vehicleType;
        this.parkingType = parkingType;
    }

    bookSlot(vehicle: Vehicle): boolean {
        if (this.parkedVehicle) {
            throw new Error('A Vehicle already parked');
        }
        this.parkedVehicle = vehicle;
        return true;
    }

    freeSlot(payment: Payment): boolean {
        if (!this.parkedVehicle) {
            throw new Error('No Vehicle is parked');
        }
        if (!payment.processPayment(this)) {
            throw new Error('Payment Fails');
        }
        this.parkedVehicle = null;
        return true;
    }

    getParkedVehicle(): Vehicle {
        if (!this.parkedVehicle) {
            throw new Error('No parked vehicle exists');
        }
        return this.parkedVehicle;
    }

    isBooked(): boolean {
        return this.parkedVehicle ? true : false;
    }

}

abstract class ParkingType {
    type: string;
    abstract calculateFee(vehicle: Vehicle): number;
    constructor(type: string) {
        this.type = type;
    }
}

class StandardParking extends ParkingType {
     calculateFee(vehicle: Vehicle): number {
        if (vehicle.vehicleType === 'car') {
            return 100;
        }
        return 10;
    }
}

class PremiumParking extends ParkingType {
     calculateFee(vehicle: Vehicle): number {
         if (vehicle.vehicleType === 'car') {
            return 1000;
        }
        return 100;
    }
}


interface Payment {
    processPayment(parkingSlot: ParkingSlot): boolean;
}

class cashPayment implements Payment {
    processPayment(parkingSlot: ParkingSlot): boolean {
        const vehicle = parkingSlot.getParkedVehicle();
        const amount = parkingSlot.parkingType.calculateFee(vehicle);
        console.log(`Payment done for ${amount}. 
            Vehicle is ${vehicle.vehicleType} and number is ${vehicle.vehicleNumber}`);
        return true;
    }
}

