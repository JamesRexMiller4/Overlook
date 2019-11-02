import $ from 'jquery';
import User from './User';
import Customer from './Customer';
import Manager from './Manager';
import Hotel from './Hotel';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

let user,
  customer, 
  manager, 
  hotel;

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(data => data.json())
    .then(data => data.userData)
    .catch(error => console.error('NO DATA')),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(data => data.json())
    .then(data => data.roomsData)
    .catch(error => console.error('NO DATA')),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(data => data.json())
    .then(data => data.bookingsData)
    .catch(error => console.error('NO DATA')),
]).then(data => {
  hotel = new Hotel(new Date(), userData, roomsData, bookingsData)
}).then(() => {
  updateDOM();
  updateCharts();
})


// EVENT LISTENERS
$('.submit').on('click', function() {
  if ($('#username').val() === 'manager' && $('#password').val() === 'overlook2019') {
    window.location = "./manager-deck.html";
  } else if ($('#username').val().contains('customer') && $('#password').val() === 'overlook2019') {
    window.location = "./user-deck.html";
  }
});