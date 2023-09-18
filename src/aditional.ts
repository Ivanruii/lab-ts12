import "./style.css";

interface Reservation {
    roomType: "standard" | "suite";
    breakfast: boolean;
    guests: number;
    nights: number;
}

const reservations: Reservation[] = [
    {
        roomType: "standard",
        breakfast: false,
        guests: 1,
        nights: 3,
    },
    {
        roomType: "standard",
        breakfast: false,
        guests: 1,
        nights: 4,
    },
    {
        roomType: "suite",
        breakfast: true,
        guests: 2,
        nights: 1,
    },
];

// CASE 3

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

            totalPrice += this.calculateBreakfastCharge(reservation);

            subtotal += totalPrice;
        }

        const vat = subtotal * 0.21;
        const total = subtotal + vat;

        return { subtotal, total };
    }

    static calculateBreakfastCharge(reservation: Reservation): number {
        return reservation.breakfast ? 15 * reservation.guests * reservation.nights : 0;
    }
}

const { subtotal: newCaseSubtotal, total: newCaseTotal } = ReservationCalculator.calculateReservation(reservations);
console.log("%cEJERCICIO ADICIONAL","color: red; font-size: 20px; text-decoration: underline");
console.log("Subtotal (New Case): €" + newCaseSubtotal.toFixed(2));
console.log("Total (New Case, IVA): €" + newCaseTotal.toFixed(2));