const chai = require('chai');
const expect = chai.expect;

import Manager from '../src/Manager';
import rooms from '../test/rooms-testData';
import bookings from '../test/bookings-testData';

describe('Manager', () => {
  let manager;
  
  beforeEach(() => {
    manager = new Manager();
  });
  
  it("should have an id and username", () => {
    expect(manager.id).to.equal("manager")
    expect(manager.username).to.equal("Supreme Manager Fluffykins")
  });

  it("should be able to look up the total revenue for the current date", () => {
    let currentDate = "2019/11/02";
    expect(manager.findTotalRevenueForToday(bookings, rooms, currentDate)).to.equal(1451.93)
  })

  it("should be able to look up the percentage of rooms occupied by todays date", () => {
    let currentDate = "2019/11/02";
    expect(manager.findPercentageOfRoomsOccupiedForToday(bookings, rooms, currentDate)).to.equal(16)
  })
}) 