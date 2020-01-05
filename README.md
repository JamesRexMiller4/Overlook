# Deathstar Hotel 
<img width="1384" alt="Screen Shot 2020-01-05 at 10 54 25 AM" src="https://user-images.githubusercontent.com/27719824/71783837-c2a82780-2fa9-11ea-870d-9f16dab4ba17.png">



# Overview 

The Overlook solo project implements webpack, fetch api, Sass for css stylings, as well as build upon the 
fundamentals of OOP through the use of classical inheritance. In addition, the project sought to test our skills in TDD as well create a fully accessible site for people with any disadvantages. 

The details of the project requirements was to design a hotel booking website that allowed either a customer or manager to log in, see all the rooms available for today, book a hotel room, and to be able to delete a booking (GET/POST/DELETE).


Technologies Used:

**Webpack**

**Sass**

**Mocha and Chai testing library**

Fundamentals Trained:

**OOP Inheritance**

**TDD**

**SRP and DRY code**


## CUSTOMER PORTAL 
Upon logging in a customer will be presented with a dashboard that allows them to search available rooms by date, room type, and other amenities. On the far right side of the dashboard they are able to see their past bookings and total amount spent at the hotel. 

Once they have found a room that they would like to book they can hit the book button, and the room will be added to their reservations.

![2020-01-05 10 44 59](https://user-images.githubusercontent.com/27719824/71783792-ff275380-2fa8-11ea-87e3-08365b4725ec.gif)

---

If in their search queries they are unable to find a listing that meets their search criteria, they will be prompted by an alert message that they need to refine their search. 

![2020-01-05 10 43 56](https://user-images.githubusercontent.com/27719824/71783762-a5bf2480-2fa8-11ea-92dd-fa59e3b53cfe.gif)



## MANAGER PORTAL 

<img width="1384" alt="Screen Shot 2020-01-05 at 10 58 00 AM" src="https://user-images.githubusercontent.com/27719824/71783893-5974e400-2faa-11ea-97fc-296c62a155f2.png">

Upon logging in as a manager, the user will be presented with the hotel's KPIs. At the time of this screenshot business is not doing so well at 'ye old Deathstar Hotel. Below the KPI dashboard is a scrollable list of the customer's with login credentials. By selecting a customer their information will populate below in the Customer Details section, where a profile image displays, as well as their name, total money spent, and history of future and past bookings. 

![2020-01-05 10 58 22](https://user-images.githubusercontent.com/27719824/71783929-c5574c80-2faa-11ea-8bdc-82d7a3946d96.gif)


Once a customer has been selected, the manager can continue down and can either book a hotel room for this guest, or delete a prior booking. 

![2020-01-05 11 03 26](https://user-images.githubusercontent.com/27719824/71783952-2da62e00-2fab-11ea-9cf9-d0d4a5b8d275.gif)

---

![2020-01-05 11 41 56](https://user-images.githubusercontent.com/27719824/71784408-77ddde00-2fb0-11ea-9bfd-5af92db94fb7.gif)

Future iterations: Will be to write out the functionality for creating room service orders for guests


## Want to see the working version? 

Visit https://deathstar-hotel.herokuapp.com/index.html or feel free to clone down this repository

Login Credentials: 

UsernameL customer(1-50) - ex: customer42
Password: overlook2019

Username: manager
Password: overlook2019

----
