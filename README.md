# Deathstar Hotel 
<img width="1384" alt="Screen Shot 2020-01-05 at 10 54 25 AM" src="https://user-images.githubusercontent.com/27719824/71783837-c2a82780-2fa9-11ea-870d-9f16dab4ba17.png">



# Overview 

The Overlook solo project implements webpack, fetch api and network requests, Sass for css stylings, as well as build upon the 
fundamentals of OOP through the use of inheritance. In addition, the project sought to test our skills in TDD as well create a fully accessible sight for people with any disadvantages. The details of the project requirements was to design a hotel booking website that allowed either a customer or manager to log in, see all the rooms available for today, book a hotel room, and to be able to delete a booking (GET/POST/DELETE).


Technologies Used:

Webpack
Sass 
Mocha and Chai testing library

Fundamentals Trained:

OOP Inheritance
TDD
SRP and Dry code


## CUSTOMER PORTAL 
Upon logging in a customer will be presented with a dashboard that allows them to search available rooms by date, room type, and other amenities. On the far right side of the dashboard they are able to see their past bookings and total amount spent at the hotel. 

Once they have found a room that they would like to book they can hit the book button, and the room will be added to their reservations.

![2020-01-05 10 44 59](https://user-images.githubusercontent.com/27719824/71783792-ff275380-2fa8-11ea-87e3-08365b4725ec.gif)

If in their search queries they are unable to find a listing that meets their search criteria, they will be prompted by an alert message that they need to refine their search. 

![2020-01-05 10 43 56](https://user-images.githubusercontent.com/27719824/71783762-a5bf2480-2fa8-11ea-92dd-fa59e3b53cfe.gif)


## Want to see the working version? 

Visit https://deathstar-hotel.herokuapp.com/index.html or feel free to clone down this repository

Login Credentials: 

UsernameL customer(1-50) - ex: customer42
Password: overlook2019

Username: manager
Password: overlook2019

----


## Webpack?

If you look in the `package.json` file, you'll see one of the library dependencies called `webpack`. If you're interested in learning more about what Webpack is and how it works behind the scenes, take a look through the [Webpack configuration documentation](https://webpack.js.org/concepts/).

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
