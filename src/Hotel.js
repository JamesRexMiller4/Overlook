  class Hotel {
  constructor(dateObj, users, rooms, bookings) {
    this.date = dateObj;
    this.users = users;
    this.rooms = rooms;
    this.bookings = bookings;
  }

  getTodaysDate() {
    let year = this.date.getFullYear()
    let month = this.date.getMonth() + 1
    let day = String(this.date.getDate()).padStart(2, '0')
    this.date = `${year}/${month}/${day}`
  }

  findCurrentUser(id) {
    return this.users.find(user => user.id === id)
  }

  findRoomsAvailableByDate(date = this.date, rooms = this.rooms, bookings = this.bookings) {
    let roomsBooked = bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber)
    let roomsAvailable = rooms.filter(room => {
      if (!roomsBooked.includes(room.number)) {
        return room
      }
    })
    return roomsAvailable
  }

  filterRoomsByFeatures(featuresObj, roomsAvailable) {
    let featureArr = Object.keys(featuresObj)
    let filtered = roomsAvailable;
    featureArr.forEach(feature => {
      filtered = filtered.filter(room => room[feature] === featuresObj[feature])
    })
    return filtered
  }

  filterRoomsByPrice(values, roomsAvailable) {
    return roomsAvailable.filter(room => room.costPerNight > values[0] && room.costPerNight < values[1])
  }
}

export default Hotel