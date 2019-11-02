class Manager extends User {
  constructor() {
    super(id)
  }

  deleteBooking(customerID, bookings, date) {
    let history = findCustomerBookingHistory(bookings)
    history.find(booking => {
      if (booking.date > date) {
        fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
          method: 'DELETE',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({id: parseInt(booking.id)})
        })
      }
    })
  }


}