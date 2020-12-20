export class Customer {
  public firstName: string;
  public lastName: string;
  public id: number;
  public gender: string;
  public city: string;
  public state: string;
  public address: string;
  public latitude: number;
  public longitude: number;


  constructor(
    firstName: string,
    lastName: string,
    id: number,
    gender: string,
    city: string,
    state: string,
    address: string,
    latitude: number,
    longitude: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.gender = gender;
    this.city = city;
    this.state = state;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
