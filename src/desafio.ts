interface Reservation {
    roomType: "standard" | "suite";
    guests: number;
    nights: number;
}

interface RoomPrices {
    standard: number;
    suite: number;
}

const reservations: Reservation[] = [
    {
        roomType: "standard",
        guests: 1,
        nights: 3,
    },
    {
        roomType: "standard",
        guests: 1,
        nights: 4,
    },
    {
        roomType: "suite",
        guests: 2,
        nights: 1,
    },
];

class BaseReservationCalculator {
    private static STANDARD_PRICE = 100;
    private static SUITE_PRICE = 150;
    private static ADDITIONAL_GUEST_FEE = 40;
    public static TOUR_OPERATOR_DISCOUNT = 0.15;

    roomPrices: RoomPrices;

    constructor() {
        this.roomPrices = {
            standard: BaseReservationCalculator.STANDARD_PRICE,
            suite: BaseReservationCalculator.SUITE_PRICE,
        };
    }

    calculateReservation(reservations: Reservation[]): { subtotal: number; total: number } {
        let subtotal = 0;

        for (const reservation of reservations) {
            const basePrice = this.roomPrices[reservation.roomType];
            const totalPrice = basePrice * reservation.nights;

            if (reservation.guests > 1) {
                const additionalGuestFee = BaseReservationCalculator.ADDITIONAL_GUEST_FEE * (reservation.guests - 1) * reservation.nights;
                subtotal += totalPrice + additionalGuestFee;
            } else {
                subtotal += totalPrice;
            }
        }

        return {
            subtotal,
            total: this.calculateTotal(subtotal),
        };
    }

    calculateTotal(subtotal: number): number {
        const vat = subtotal * 0.21;
        return subtotal + vat;
    }
}

class CustomerCalculator extends BaseReservationCalculator {
    constructor() {
        super();
    }
}

class TourOperatorCalculator extends BaseReservationCalculator {
    constructor() {
        super();
    }

    calculateReservation(reservations: Reservation[]): { subtotal: number; total: number } {
        let subtotal = 0;

        for (const reservation of reservations) {
            const totalPrice = this.roomPrices[reservation.roomType] * reservation.nights;
            const discountedPrice = totalPrice * (1 - BaseReservationCalculator.TOUR_OPERATOR_DISCOUNT);

            subtotal += discountedPrice;
        }

        return {
            subtotal,
            total: this.calculateTotal(subtotal),
        };
    }
}

const customerCalculator = new CustomerCalculator();
const { subtotal: customerSubtotal, total: customerTotal } = customerCalculator.calculateReservation(reservations);
console.log("%cDESAFIO: Customer","color: red; font-size: 20px; text-decoration: underline");
console.log(`Subtotal (Customer): € ${customerSubtotal.toFixed(2)}`);
console.log(`Total (Customer, IVA): € ${customerTotal.toFixed(2)}`);

const tourOperatorCalculator = new TourOperatorCalculator();
const { subtotal: tourOperatorSubtotal, total: tourOperatorTotal } = tourOperatorCalculator.calculateReservation(reservations);
console.log("%cDESAFIO: TourOperator","color: red; font-size: 20px; text-decoration: underline");
console.log(`Subtotal (Tour Operator): € ${tourOperatorSubtotal.toFixed(2)}`);
console.log(`Total (Tour Operator, IVA): € ${tourOperatorTotal.toFixed(2)}`);