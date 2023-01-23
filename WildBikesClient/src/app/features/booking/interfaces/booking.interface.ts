import { BookingCreateInterface } from "./booking-create.interface";

export interface BookingInterface extends BookingCreateInterface {
    readonly id: number,
    readonly uuid: string,
    readonly email: string | null,
    readonly signature: string | null
}