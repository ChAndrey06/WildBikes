export interface BookingCreateInterface {
  readonly firstName: string,
  readonly middleName: string,
  readonly lastName: string,
  readonly dateFrom: Date,
  readonly dateTo: Date,
  readonly price: number;
  readonly passport: string,
  readonly licenseNumber: string,
  readonly address: string,
  readonly nationality: string,
  readonly helmet: string,
  readonly bikeName: string,
  readonly bikeNumber: string,
  readonly bikeID: number,
  readonly phone: string
}
