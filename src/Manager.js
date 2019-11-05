import User from './User'
class Manager extends User {
  constructor(id, username) {
    super(id, username)
  }

  findTotalRevenueForToday(bookings, rooms, currentDate) {
    let revenues = bookings.filter(booking => booking.date === currentDate)
      .reduce((acc, roomBooked) => {
        rooms.forEach(room => {
          if (room.number ===  roomBooked.roomNumber) {
            acc += room.costPerNight
          }
        })
        return acc
      }, 0)
    return revenues
  }

  findPercentageOfRoomsOccupiedForToday(bookings, rooms, currentDate) {
    return bookings.filter(booking => booking.date === currentDate).length / rooms.length * 100
  }

  deleteBooking(id) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({id: parseInt(id)})
    })
  }
    
  


}

export default Manager