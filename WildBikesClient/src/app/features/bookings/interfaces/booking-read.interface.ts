export interface BookingReadInterface {
  readonly id: number,
  readonly uuid: string,
  readonly firstName: string,
  readonly middleName: string,
  readonly lastName: string,
  readonly price: number;
  readonly passport: string,
  readonly licenseNumber: string,
  readonly address: string,
  readonly nationality: string,
  readonly helmet: string,
  readonly bikeName: string,
  readonly bikeNumber: string,
  readonly bikeId: number,
  readonly phone: string
}
