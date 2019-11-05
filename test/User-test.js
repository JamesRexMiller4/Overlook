const chai = require('chai');
const expect = chai.expect;

import User from '../src/User';
import rooms from '../test/rooms-testData';
import bookings from '../test/bookings-testData';

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User(4, 'James Rex')
  })

  it('should have an id and username', () => {
    expect(user.id).to.equal(4)
    expect(user.username).to.equal('James Rex')
  });

  it('should be able find the booking history for a particular customer with/without id passed through', () => {
    expect(user.findCustomerBookingHistory(bookings)).to.eql([
      {
        id: 1572293130161,
        userID: 4,
        date: '2019/11/14',
        roomNumber: 13,
        roomServiceCharges: []
      },
      {
        id: 1572293130162,
        userID: 4,
        date: '2019/11/04',
        roomNumber: 5,
        roomServiceCharges: []
      }
    ])
    expect(user.findCustomerBookingHistory(bookings, 4)).to.eql([
      {
        id: 1572293130161,
        userID: 4,
        date: '2019/11/14',
        roomNumber: 13,
        roomServiceCharges: []
      },
      {
        id: 1572293130162,
        userID: 4,
        date: '2019/11/04',
        roomNumber: 5,
        roomServiceCharges: []
      }
    ])
  });

  it('should be able to find the total spending for a particular customer', () => {
    expect(user.findCustomerSpendingHistory(user.findCustomerBookingHistory(bookings, 4), rooms)).to.equal(764.09)
  })

})