class Hotel {
  constructor(dateObj, rooms, bookings) {
    this.date = dateObj;
    this.rooms = rooms;
    this.bookings = bookings;
  }

  getTodaysDate() {
    let year = this.date.getFullYear()
    let month = this.date.getMonth() + 1
    let day = String(this.date.getDate()).padStart(2, '0')
    this.date = `${year}/${month}/${day}`
  }

}