import { Customer } from 'src/app/customers/customer.model';

/** return fresh array of test customers */
export function getTestCustomers(): Customer[] {
  return [
      {
          'id': '1',
          'firstName': 'ted',
          'lastName': 'james',
          'gender': 'male',
          'address': '1234 Anywhere St.',
          'city': ' Phoenix ',
          'state': 'Arizona',
          'latitude': 33.299,
          'longitude': -111.963
      },
      {
          'id': '2',
          'firstName': 'Michelle',
          'lastName': 'Thompson',
          'gender': 'female',
          'address': '345 Cedar Point Ave.',
          'city': 'Encinitas ',
          'state':  'California',
          'latitude': 33.037,
          'longitude': -117.291
      },
      {
          'id': '3',
          'firstName': 'Zed',
          'lastName': 'Bishop',
          'gender': 'male',
          'address': '1822 Long Bay Dr.',
          'city': ' Seattle ',
          'state': 'Washington',
          'latitude': 47.596,
          'longitude': -122.331
      },
      {
          'id': '4',
          'firstName': 'Tina',
          'lastName': 'Adams',
          'gender': 'female',
          'address': '79455 Pinetop Way',
          'city': 'Chandler',
          'state': ' Arizona',
          'latitude': 33.299,
          'longitude': -111.963
      },
      {
          'id': '5',
          'firstName': 'Igor',
          'lastName': 'Minar',
          'gender': 'male',
          'address': '576 Crescent Blvd.',
          'city': ' Dallas',
          'state': 'Texas',
          'latitude': 32.782927,
          'longitude': -96.806191
      },
      {
          'id': '6',
          'firstName': 'Brad',
          'lastName': 'Green',
          'gender': 'male',
          'address': '9874 Center St.',
          'city': 'Orlando ',
          'state': 'Florida',
          'latitude': 28.384238,
          'longitude': -81.564103
      },
      {
          'id': '7',
          'firstName': 'Misko',
          'lastName': 'Hevery',
          'gender': 'male',
          'address': '9812 Builtway Appt #1',
          'city': 'Carey ',
          'state': 'North Carolina',
          'latitude': 35.727985,
          'longitude': -78.797594
      },
      {
          'id': '8',
          'firstName': 'Heedy',
          'lastName': 'Wahlin',
          'gender': 'female',
          'address': '4651 Tuvo St.',
          'city': 'Anaheim',
          'state': 'California',
          'latitude': 33.809898,
          'longitude': -117.918757
      },
      {
          'id': '9',
          'firstName': 'John',
          'lastName': 'Papa',
          'gender': 'male',
          'address': '66 Ray St.',
          'city': ' Orlando',
          'state': 'Florida',
          'latitude': 28.384238,
          'longitude': -81.564103
      },
      {
          'id': '10',
          'firstName': 'Tonya',
          'lastName': 'Smith',
          'gender': 'female',
          'address': '1455 Chandler Blvd.',
          'city': ' Atlanta',
          'state': 'Georgia',
          'latitude': 33.762297,
          'longitude': -84.392953
      }
  ];
}
