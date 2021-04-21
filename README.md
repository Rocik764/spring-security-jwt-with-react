#Spring Boot with React - JWT Authentication

##About project
My fullstack project in which I've used Spring Security using JWT based, stateless authentication.
Users can register, login, check their profile and check all users list. All users are stored in mysql 
database, in User table.
As a frontend, I've used React with react router and Bootstrap for responsiveness.
Check application.properties file for database connection.

##Used dependencies
* spring-boot-starter-web
* spring-boot-starter-security
* jjwt
* mysql-connector-java

##Endpoints
####User registration and login flow
These two endpoints are permitted for all users.
* **POST:** api/register - for user registration
* **POST:** api/login - for user login

####Home page view
This endpoint is permitted for all users.
* **GET:** api/index - returns "Home page"

####User profile and users list
These two endpoints need to be authorized with not expired, valid token.
* **GET:** api/users - returns list of all users
* **GET:** api/profile - returns logged in user's profile info

##Database structure
| id  | Email | Password | Roles |
| --- |:-----:| --------:|------:|
| 1   |test@mail.com|#hashed|USER|

[home]: ./readme_images/home.JPG "Home page screenshot"
[login_register]: ./readme_images/login.JPG "Login/Register page screenshot"
[profile]: readme_images/profile.JPG "Profile page screenshot"
[users_list]: readme_images/users_list.JPG "Home page screenshot"

##Example screenshots in case anyone wants to see it without downloading
###Before logging in
#####Home page
![alt text][home]
#####Login/register page (both are similar)
![alt text][login_register]
***
###After logging in
#####Profile page
![alt text][profile]
#####Users list page
![alt text][users_list]