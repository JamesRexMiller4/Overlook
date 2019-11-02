class User {
  constructor(id = 'manager', username = "Supreme Manager Fluffykins") {
    this.id = id
    this.username = username
  }

  findCustomerBookingHistory(bookings) {
    return bookings.filter(bookings => bookings.userID === this.id)
  }

  findCustomerSpendingHistory(bookings, rooms) {
    return this.findCustomerBookingHistory(bookings).reduce((acc, booking) => {
      rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          acc += room.costPerNight
        }
      })
      return acc
    }, 0)
  }

  addRoomServiceCharge() {
    
  }
  
  
}

export default User;