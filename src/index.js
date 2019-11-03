import $ from 'jquery';
import User from './User';
import Customer from './Customer';
import Manager from './Manager';
import Hotel from './Hotel';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import './css/customer.scss';

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

  hotel = new Hotel(new Date(), data[0], data[1], data[2])
}).then(() => {
  // updateDOM();
  // updateCharts();
})


// EVENT LISTENERS
$('.submit-login-btn').on('click', function(e) {
  event.preventDefault();
  console.log('HELLO WORLD')
  if ($('#username').val() === 'manager' && $('#password').val() === 'overlook2019') {
    window.location = "./manager.html";
  } else if ($('#username').val().includes('customer') && $('#password').val() === 'overlook2019') {
    window.location = "./customer.html";
  }
});


// DOM Manipulation 

$('#filter-submit-btn').on('click', function(e) {
  
})

function grabFilterMenuValues() {
  let range = [];
  let min = $('#min-price').val()
  let max = $('#max-price').val()
  range.push(min)
  range.push(max)

  


}