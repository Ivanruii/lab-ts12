import "./style.css";

interface Reservation {
    roomType: "standard" | "suite";
    guests: number;
    nights: number;
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

// CASE 1

class ReservationCalculator {
    private static STANDARD_PRICE = 100;
    private static SUITE_PRICE = 150;
    private static ADDITIONAL_GUEST_FEE = 40;

    static calculateReservation(reservations: Reservation[]): { subtotal: number; total: number } {
        let subtotal = 0;

        for (const reservation of reservations) {
            let basePrice = reservation.roomType === "standard" ? ReservationCalculator.STANDARD_PRICE : ReservationCalculator.SUITE_PRICE;
            let totalPrice = basePrice * reservation.nights;

            if (reservation.guests > 1) {
                totalPrice += (reservation.guests - 1) * ReservationCalculator.ADDITIONAL_GUEST_FEE * reservation.nights;
            }

            subtotal += totalPrice;
        }

        const vat = subtotal * 0.21;
        const total = subtotal + vat;

        return { subtotal, total };
    }
}

const { subtotal, total } = ReservationCalculator.calculateReservation(reservations);
console.log("%cCASO 1","color: red; font-size: 20px; text-decoration: underline");
console.log("Subtotal: €" + subtotal.toFixed(2));
console.log("Total (IVA): €" + total.toFixed(2));

// CASE 2

class TourOperatorCalculator extends ReservationCalculator {
    static calculateReservation(reservations: Reservation[]): { subtotal: number; total: number } {
        let subtotal = 0;

        for (const reservation of reservations) {
            const totalPrice = 100 * reservation.nights;

            const discountedPrice = totalPrice * 0.85;

            subtotal += discountedPrice;
        }

        const vat = subtotal * 0.21;
        const total = subtotal + vat;

        return { subtotal, total };
    }
}

const { subtotal: subtotalTO, total: totalTO } = TourOperatorCalculator.calculateReservation(reservations);
console.log("%cCASO 2","color: red; font-size: 20px; text-decoration: underline");
console.log("Subtotal (Tour Operator): €" + subtotalTO.toFixed(2));
console.log("Total (Tour Operator, IVA): €" + totalTO.toFixed(2));