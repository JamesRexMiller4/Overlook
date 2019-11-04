import $ from 'jquery';
import Customer from './Customer';
import Manager from './Manager';
import Hotel from './Hotel';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// import './css/customer.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/residential-suite.jpg';
import './images/suite.jpg';
import './images/single-room-twin.jpg';
import './images/junior-suite.jpg';
import './images/fluffykins.jpg';
import './images/deathstar.gif';

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
  if(document.location.pathname ===  "/customer.html") {
    welcomeLoyalCustomer();
    generateBookingHistory(customer.findCustomerBookingHistory(hotel.bookings))
    generateSpendingHistory(hotel.bookings, hotel.rooms)
  } else if (document.location.pathname ===  "/manager.html") {
    welcomeSupremeManagerFluffykins();
    displayKPIs();
  }
}).then(() => {

})

// EVENT LISTENERS
$('.submit-login-btn').on('click', function() {
  event.preventDefault();
  storeIDLocalStorage();
  $('body').css('background-image', 'none');
  if ($('#username').val() === 'manager' && $('#password').val() === 'overlook2019') {
    window.location = "./manager.html";
  } else if ($('#username').val().includes('customer') && $('#password').val() === 'overlook2019') {
    window.location = "./customer.html";
  }
});

$('#filter-submit-btn').on('click', function() {
  event.preventDefault()
  let date = grabDate()
  let price = grabFilterMenuValues()
  let features = grabFeatures()
  generateResults(hotel.filterRoomsByFeatures(features, hotel.filterRoomsByPrice(price, hotel.findRoomsAvailableByDate(date))));
})

$('#display-results-parent').on('click', function(e) {
  event.preventDefault()
  console.log($('event.target').closest('.search-results-card'))
})


// Customer DOM Manipulation 
function grabFilterMenuValues() {
  let range = [];
  let min = parseInt($('#min-price').val());
  let max = parseInt($('#max-price').val());
  range.push(min);
  range.push(max);
  return range
}

function grabDate() {
  let date = $('#date-picker').val();
  date = date.split('-').join('/');
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


function generateResults(arrayOfRooms) {
  $('.display-results-section').html('')
  if (arrayOfRooms.length < 1) {
    alert('So sorry we have no available rooms that meet that search criteria, please try again')
  }
  arrayOfRooms.forEach(obj => {
    $('.display-results-section').append(`
    <div class="search-results-card">
    <div class='card-header-div'>
        <h3 class="roomnum-card-h3">Room Num: ${obj.number}</h3>
        <h3 class="roomtype-card-h3">Room Type: ${obj.roomType}</h3>
    </div>
    <div class="room-image-div">
        <img class="room-image-pic" src="">
    </div>
    <div class='details-card-div'>
        <ul class='details-ul'>
            <li class='details-li'>
                    <label class="details-label">Bed Type</label>
                    <p id="bedType-details-p" class='details-li-p'>${obj.bedSize}</p>
            </li>
            <li class='details-li'>
                    <label class="details-label">Number of Beds</label>
                    <p id="numBeds-details-p" class='details-li-p'>${obj.numBeds}</p>
            </li>
            <li class='details-li'>
                    <label class="details-label">Bidet</label>
                    <p id="bidet-details-p" class='details-li-p'>${obj.bidet}</p>
            </li>
        </ul>
    </div>
    <div class='details-cost-per-night-div'>
        <h3 class='card-cost-h3'>Cost Per Night</h3>
        <p class='details-cost-per-night-p'>${obj.costPerNight}</p>
    </div>
    <div class='details-btn-div'>
        <label for='customer-book-btn' class='details-label book-label'>BOOK</label>
        <input type="submit" value='SUBMIT' id='customer-book-btn' class='book-btn'>
    </div>
</div>`)

    if (obj.roomType === 'single room') {
      $('.room-image-pic').attr("src", "./images/single-room-twin.jpg")
    } else if (obj.roomType === 'suite') {
      $('.room-image-pic').attr("src", "./images/suite.jpg");
    } else if (obj.roomType === 'junior suite') {
      $('.room-image-pic').attr('src', './images/junior-suite.jpg')
    } else if (obj.roomType === 'residential suite') {
      $('.room-image-pic').attr('src', './images/residential-suite.jpg')
    } 
  });
}

function makeABooking() {
  customer
}



function generateBookingHistory(arrayOfBookings) {
  arrayOfBookings.sort((a, b) => b.date - a.date)
  arrayOfBookings.forEach(obj => {
    $('.customer-booking-history-div').append(`
  <div class="history-results-card">
  <div class='history-room-card-div'>
      <h3 class="history-roomnum-card-h3">Room Num: ${obj.roomNumber}</h3>
  </div>
  <div class='history-date-card-div'>
      <h3 class='history-date-card-h3'>${obj.date}</h3>
  </div>
  `
    )})
}

function generateSpendingHistory(bookings, rooms) {
  let total = customer.findCustomerSpendingHistory(bookings, rooms)
  $('#customer-spending-history-p').text(total.toFixed(2))
}


function welcomeLoyalCustomer() {
  let customerID = parseInt(window.localStorage.getItem('id'));
  customer = new Customer(customerID)
  let customerProfile = hotel.findCurrentUser(customerID)
  $('.customer-greeting-message-h2').text(`Welcome Back ${customerProfile.name}!`)

}

function storeIDLocalStorage() {
  let arr =  $('#username').val().split('r')
  let customerID = arr[1]
  window.localStorage.setItem('id', customerID)
}


// MANAGER DOM 

function welcomeSupremeManagerFluffykins() {
  manager = new Manager()
}


function displayKPIs() {
  generateTodaysRevenue()
  generateOccupancyPercent()
  generateTotalRooms()
}

function generateTodaysRevenue() {
  let revenue = manager.findTotalRevenueForToday(hotel.bookings, hotel.rooms, hotel.date)
  $('#manager-revenue-p').text('$' + revenue)
}

function generateOccupancyPercent() {
  let percentOccupied = manager.findPercentageOfRoomsOccupiedForToday(hotel.bookings, hotel.rooms, hotel.date)
  $('#manager-capacity-p').text(percentOccupied + '%')
}

function generateTotalRooms() {
  let totalOpenRooms = hotel.findRoomsAvailableByDate().length
  $('#manager-total-open-rooms-p').text(totalOpenRooms)
}

