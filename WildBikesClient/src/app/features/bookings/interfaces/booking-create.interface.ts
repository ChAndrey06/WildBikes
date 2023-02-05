export interface BookingCreateInterface {
  firstName: string,
  middleName: string,
  lastName: string,
  dateFrom: Date,
  dateTo: Date,
  price: number;
  passport: string,
  licenseNumber: string,
  address: string,
  nationality: string,
  helmet: string,
  bikeName: string,
  bikeNumber: string,
  bikeId: number,
  phone: string,
  signature: string | null
}
