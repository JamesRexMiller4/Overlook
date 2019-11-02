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

  bookARoom(date, id = this.id, roomNumber) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: parseInt(id),
        date: date,
        roomNumber: parseInt(roomNumber)
      })
    })
  }
  addRoomServiceCharge() {
    
  }
  
  
}

export default User;