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

let user
let customer
let manager
let hotel

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(data => data.json())
    .then(data => data)
    .catch(error => console.error('NO DATA')),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(data => data.json())
    .then(data => data)
    .catch(error => console.error('NO DATA')),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(data => data.json())
    .then(data => data)
    .catch(error => console.error('NO DATA')),
]).then(data => {
  hotel = new Hotel(new Date(), data[0].users, data[1].rooms, data[2].bookings)
  hotel.getTodaysDate()
  setDatePicker()
}).then(() => {
  // updateDOM();
  // updateCharts();
})

function loadHotel() {
  setTimeout(function() {
    console.log(hotel)
    console.log(hotel.findRoomsAvailableByDate())
  }, 5000)
}

loadHotel()

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
  event.preventDefault()
  let date = grabDate()
  let price = grabFilterMenuValues()
  let features = grabFeatures()
  console.log(hotel.findRoomsAvailableByDate(date))
  console.log(hotel.filterRoomsByPrice(price, hotel.findRoomsAvailableByDate(date)))
  console.log(hotel.filterRoomsByFeatures(features, hotel.findRoomsAvailableByDate(date)))
})

function grabFilterMenuValues() {
  let range = [];
  let min = $('#min-price').val()
  let max = $('#max-price').val()
  range.push(min)
  range.push(max)
  return range
}

function grabDate() {
  let date = $('#date-picker').val()
  date = date.split('-').join('/')
  return date
}

function grabFeatures() {
  let searchQueryObj = {};
  let arr = []
  let bidet = {bidet: $("input[type='checkbox']").prop('checked')};
  arr.push(bidet)
  let numBeds = {}
  if ($('#num-beds').val() > 0) {
    numBeds = {numBeds: parseInt($('#num-beds').val())};
  }
  arr.push(numBeds)
  let bedSize = {}
  if ($('#beds').val().length > 0) {
    bedSize = {bedSize: $('#beds').val()};
  }
  arr.push(bedSize)
  let roomType = {}
  if ($('#roomtype').val().length > 0) {
    roomType = {roomType: $('#roomtype').val()}
  }
  arr.push(roomType)

  arr.forEach(obj => {
    if (obj !== {}) {
      Object.assign(searchQueryObj, obj)
    }
  })
  
  return searchQueryObj
}

function setDatePicker() {
  $('#date-picker').val(hotel.date.split('/').join('-'))
}