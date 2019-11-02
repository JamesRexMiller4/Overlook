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

}

export default Hotel