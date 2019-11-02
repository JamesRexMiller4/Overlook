class User {
  constructor(id, username) {
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
  
  
}

export default User;