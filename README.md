# movie-booking-system
CS 699 Software Lab Project

This is project based on MERN Stack created from scratch which implements a Movie Booking System for a specfic movie hall. Implemented NodeJS and Express in the Backend, MongoDB as the database and ReactJS in the frontend. This must be noted that no attention has been paid to the UI of the webpage and more concentration has been put into implementing the functionalities in the frontend as well as Backend.

The main functionalities implemented in this project are:

1. Authentication of users and admin by password based method and also using JWT authorisation token for accessing resources specific to an user. Moreover, there are two types of users: user and admin, and both have different authorization to different resources. The technologies used to implement this in our project are JWT token, Password Hashing for security, Cookies for logged in state, Middleware etc.

2. There are mainly two Middlewares used.
   a. For authenticating valid users
   b. For authorising certain routes to admins only such that users cannot access those.
  
3. The project implements ticket booking from the view of an user such that properly authorised users can add reviews, look at showtimes of different movies, create an order to book the Tickets and atlast book the ticket on the basis of a Dummy Payment Method.We used conecpt of stripe payment api(secret key, public key) in this.
  
4. This project also implements an admin side where the admin can view and create new shows, new showtimes for specified shows.
   
5. There 6 main routes connecting client to the server are:
   a. Authentication Route(for uthenticating an user)
   b. User Route
   c. Product Route(To access the movies)
   d. Showtime Route(To access the showtimes od different movies)
   e. Review Routes(To access the reviews of a specific movie)
   f. Order Rooutes(To handle all the Booking from the users.
   To handle this routes there are handler function implemented inside Controllers.
   
6. There are total 5 MongoDB collections:
   a. User Collection (Informaation regarding specific user)
   b. Movie/Product (Information about a Particular Movie i.e title, genre etc.)
   c. Review Collection (Information of all the reviews)
   d. Showtime Collection (Information of shpwtimes of all the movies.
   e. Order Collection (Information of booking made by a user)

   
8. We have also used Pyplot to generate two graphs one for the top rated movies and another for the top reviewed movies. This fetches data in realtime and renders such that the changes are shown in the graphs automatically.
9. Future Work:
    a.we can add variuos security features in the server side to prevent different kinds of attacks
   (e.g. use xss-clean to prevent xss attacks based on cookies, express-mongo-sanitize to sanitize the input parameters given by the user,can use Helmet which is a collection of middleware functions for securing Express applications by setting various HTTP headers to protect against common web vulnerabilities)
   b.We can use Rate limiting which is a technique used to prevent abuse, such as denial-of-service attacks or brute-force attacks, by limiting the number of requests a user or IP address can make in a given time period.
   c.We also see applications of Machine Leraning,Deep Learning Techniques in this project.Based on user reviews we can decide if admins want to keep a movie for longer days in the hall or not.We can implement sentiment analysis based on user reviews based on RNN, Transformer etc.Also based we can predict the number of tickets that can be sold for a particular movie.
