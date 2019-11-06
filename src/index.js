import $ from 'jquery';
import Customer from './Customer';
import Manager from './Manager';
import Hotel from './Hotel';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/residential-suite.jpg';
import './images/suite.jpg';
import './images/single-room-twin.jpg';
import './images/junior-suite.jpg';
import './images/fluffykins.jpg';
import './images/deathstar.gif';
import './images/nightsky.jpg';
import './images/stormtrooper.jpg';


let customer, manager, hotel;

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
  hotel = new Hotel(new Date(), data[0].users, data[1].rooms, data[2].bookings);
  hotel.getTodaysDate();
  setDatePicker();
  if (document.location.pathname ===  "/customer.html") {
    welcomeLoyalCustomer();
    generateBookingHistory(customer.findCustomerBookingHistory(hotel.bookings));
    generateSpendingHistory(customer.findCustomerBookingHistory(hotel.bookings), hotel.rooms);
    generateResults(hotel.findRoomsAvailableByDate());
  } else if (document.location.pathname ===  "/manager.html") {
    welcomeSupremeManagerFluffykins();
    displayKPIs();
    displayCustomers(hotel.users);
  }
})

// EVENT LISTENERS
$('.submit-login-btn').on('click', function() {
  event.preventDefault();
  storeIDLocalStorage();
  if ($('#username').val() === 'manager' && $('#password').val() === 'overlook2019') {
    $('body').css('background-image', 'none');
    window.location = "./manager.html";
  } else if ($('#username').val().includes('customer') && $('#password').val() === 'overlook2019') {
    $('body').css('background-image', 'none');
    window.location = "./customer.html";
  } else if (($('#username').val() !== 'manager' || $('#password').val() === 'overlook2019') || !$('#username').val().includes('customer')) {
    $('#username').val('');
    $('#password').val('');
    alert('Invalid credentials submitted, please try again')
  }
});

$('.log-out-link').on('click', function() {
  window.location = "./index.html";
})

$('#filter-submit-btn').on('click', function() {
  event.preventDefault();
  let date = grabDate();
  let price = grabFilterMenuValues();
  let features = grabFeatures();
  generateResults(hotel.filterRoomsByFeatures(features, hotel.filterRoomsByPrice(price, hotel.findRoomsAvailableByDate(date))));
})

$('#display-results-parent').on('click', function(event) {
  // let jQueryObj = $(event.target.closest('.search-results-card')
  console.log($(event.target.closest('.search-results-card'))[0].dataset.num)
  if (event.target === $('#customer-book-btn')[0]) {
    let date = grabDate();
    let room = $(event.target.closest('.search-results-card'))[0].dataset.num
    customer.bookARoom(date, room)
  }
  if (event.target === $('#customer-delete-btn')[0]) {
    let id = event.target.closest('.delete-booking-card').dataset.num;
    manager.deleteBooking(id);
  }
});

$('#make-booking-link').on('click', function() {
  generateResults(hotel.findRoomsAvailableByDate());
});

$('#delete-booking-link').on('click', function() {
  let id = parseInt($('.active').children()[1].innerText.split(' ')[1]);
  displayDeleteBookings(id, hotel.rooms);
});

$('.customer-container-div').on('click', function(event) {
  $(event.target).closest('.customer-card-div').siblings().removeClass('active');
  $(event.target).closest('.customer-card-div').toggleClass('active');
  let details = ($(event.target).closest('.customer-card-div').children());
  let id = parseInt(details[1].innerText.split(' ')[1]);
  let name = details[0].innerText;
  displayCustomerBookingHistory(id, name);
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
  let arr = [];
  let bidet = {};
  if ($("input[type='checkbox']").prop('checked')) {
    bidet = {bidet: $("input[type='checkbox']").prop('checked')};
  } 
  arr.push(bidet);
  let numBeds = {};
  if ($('#num-beds').val() > 0) {
    numBeds = {numBeds: parseInt($('#num-beds').val())};
  }
  arr.push(numBeds);
  let bedSize = {};
  if ($('#beds').val().length > 0) {
    bedSize = {bedSize: $('#beds').val()};
  }
  arr.push(bedSize);
  let roomType = {};
  if ($('#roomtype').val().length > 0) {
    roomType = {roomType: $('#roomtype').val()};
  }
  arr.push(roomType);

  arr.forEach(obj => {
    if (obj !== {}) {
      Object.assign(searchQueryObj, obj);
    }
  });
  
  return searchQueryObj
}

function setDatePicker() {
  $('#date-picker').val(hotel.date.split('/').join('-'));
}


function generateResults(arrayOfRooms) {
  $('#display-results-parent').html('');
  arrayOfRooms.forEach((obj, index) => {
    let roomImg;

    if (obj.roomType === 'single room') {
      roomImg = "./images/single-room-twin.jpg";
    } else if (obj.roomType === 'suite') {
      roomImg = "./images/suite.jpg";
    } else if (obj.roomType === 'junior suite') {
      roomImg = './images/junior-suite.jpg';
    } else if (obj.roomType === 'residential suite') {
      roomImg = './images/residential-suite.jpg';
    } 

    $('#display-results-parent').append(
      `<div class="search-results-card" data-num='${obj.number}' tabindex='${index}'>
        <div class='card-header-div'>
          <h3 class="roomnum-card-h3">Room Num: ${obj.number}</h3>
          <h3 class="roomtype-card-h3">Room Type: ${obj.roomType}</h3>
        </div>
        <div class="room-image-div">
        <img class="room-image-pic" src="${roomImg}">
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
          <input type="submit" value='BOOK' id='customer-book-btn' class='book-btn'>
        </div>
      </div>`
    );
  });
}

function generateBookingHistory(arrayOfBookings) {
  arrayOfBookings.sort((a, b) => {
    if (b.date < a.date) {
      return -1
    } else if (b.date > a.date) {
      return 1
    }
  });

  arrayOfBookings.forEach((obj, index) => {
    $('.customer-booking-history-div').append(`
  <div class="history-results-card" tabindex='${index}'>
  <div class='history-room-card-div'>
      <h3 class="history-roomnum-card-h3">Room Num: ${obj.roomNumber}</h3>
  </div>
  <div class='history-date-card-div'>
      <h3 class='history-date-card-h3'>${obj.date}</h3>
  </div>
  `)
  });
}

function generateSpendingHistory(bookings, rooms) {
  let total = customer.findCustomerSpendingHistory(bookings, rooms);
  $('#customer-spending-history-p').text(total.toFixed(2));
}


function welcomeLoyalCustomer() {
  let customerID = parseInt(window.localStorage.getItem('id'));
  customer = new Customer(customerID);
  let customerProfile = hotel.findCurrentUser(customerID);
  $('.customer-greeting-message-h2').text(`Welcome Back ${customerProfile.name}!`);

}

function storeIDLocalStorage() {
  let arr =  $('#username').val().split('r');
  let customerID = arr[1];
  window.localStorage.setItem('id', customerID);
}


// MANAGER DOM 

function welcomeSupremeManagerFluffykins() {
  manager = new Manager();
}

function displayKPIs() {
  generateTodaysRevenue();
  generateOccupancyPercent();
  generateTotalRooms();
}

function generateTodaysRevenue() {
  let revenue = manager.findTotalRevenueForToday(hotel.bookings, hotel.rooms, hotel.date).toFixed(2);
  $('#manager-revenue-p').text('$' + revenue);
}

function generateOccupancyPercent() {
  let percentOccupied = manager.findPercentageOfRoomsOccupiedForToday(hotel.bookings, hotel.rooms, hotel.date).toFixed(0);
  $('#manager-capacity-p').text(percentOccupied + '%');
}

function generateTotalRooms() {
  let totalOpenRooms = hotel.findRoomsAvailableByDate().length;
  $('#manager-total-open-rooms-p').text(totalOpenRooms);
}

function displayCustomers(customers) {
  customers.forEach((customer, index) => {
    $('.customer-container-div').append(`
      <div class='customer-card-div' tabindex='${index}'>
        <h3>${customer.name}</h3>
        <h3>ID: ${customer.id}</h3>
      </div>`
    )
  });
}

function displayCustomerBookingHistory(id, name) {
  let bookings = manager.findCustomerBookingHistory(hotel.bookings, id).sort((a, b) => {
    if (b.date < a.date) {
      return -1
    } else if (b.date > a.date) {
      return 1
    }
  })
  let spending = manager.findCustomerSpendingHistory(bookings, hotel.rooms).toFixed(2);
  
  $('.customer-details-div').html('')
  $('.customer-details-div').append(`
  <h2 class='customer-details-name-h2'>${name}</h2>
  <h3 class='customer-details-spending-h3'>Total Money Spent: ${spending}</h3>
  <img src='./images/stormtrooper.jpg' class='customer-profile-pic' alt='A profile picture of a stormtrooper, features indescriminate, for behind that mask lies a mystery yet to be told.'>
  <div class='customer-details-history-div'>
    <h3>Booking History</h3>
    <div class='customer-history-results'></div>
  </div>
  `)
  bookings.forEach((booking, index) => {
    $('.customer-history-results').append(`
      <div class='customer-history-card' tabindex='${index}'>
        <div class='customer-card-div'>
          <h3>Room Number ${booking.roomNumber}</h3>
          <h3>${booking.date}</h3>
        </div>
      </div>`
    )
  })
}

function displayDeleteBookings(id, rooms) {
  let bookings = manager.findCustomerBookingHistory(hotel.bookings, id).sort((a, b) => {
    if (b.date < a.date) {
      return -1
    } else if (b.date > a.date) {
      return 1
    }
  }).filter(booking => booking.date > hotel.date);

  appendDeletableBookings(bookings);
}

function appendDeletableBookings(bookings) {
  $('#display-results-parent').html('');
  bookings.forEach(booking => {
    $('#display-results-parent').append(`
    <div class="delete-booking-card" data-num='${booking.id}'>
      <h3 class='booking-id-h3'>Booking Order #: ${booking.id}</h3>
      <div class='delete-booking-details-div'>
        <h3 class=''>Date of Booking: ${booking.date}</h3>
        <h3 class="">Room Num: ${booking.roomNumber}</h3>
      </div>
      <div class='details-btn-div'>
        <input type="submit" value='DELETE' id='customer-delete-btn' class='book-btn'>
      </div>
    </div>`);
  });
}