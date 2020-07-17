# IMDB

### Introduction

This application is a cloned **IMDBMovie** Simple Web app. Following are the some features of **IMDBMovie**
- User/AdminUser can login/register with the application
- User can see the movies list and search the movies
- Admin User can create the movie instance, update and Delete existing movie
- Normal User/AnyonomousUser won't allow for do the any create update and delete
- User/Admin can logout from application
- Retrieving  movies based on user interest if user scroll down then frontend server will call backend server api to get nextset of result.


### Tech Stack Used
1. Frontend Framework
    - Angular
    - HTTP Interceptor
    - JWT Authentication
    - AuthGuard
    - HTML, CSS, JS, TypeScript, Bootstap
    
2. Backend Frameowork
    - Django
    - DjangoRestFramework
    - Full Fledged REST API
    - Python
    - Heroku Postgred DB
 
 3. Deployment
    - Heroku - Frontend Angular (different server)
    - Heroku - Backend Django (different server)
    

# Steps to Configure the Project Locally

### Installing Requirements
- Python
- Angular CLI
- node

### Installing Libraries, Setup and Run the servers
- Open backend folder and run the below command to install required libraries for Python django and setup the virtual env
and start backend server
   - > cd IMDB_DJANGO_BACKEND 
   - > py -m pip install --user virtualenv 
   - > py -m venv env 
   - > .\env\Scripts\activate 
   - > pip install -r requirements.txt
   - > python manage.py runserver
- Open Frontend folder and run the below command to setup the Angular frontend and start frontend server
   - > cd IMDB-Frontend 
   - > npm install
   - > ng serve



## Url Used for Locally 

- > http://127.0.0.1:8000/api/movie/list  #backend
- > http://localhost:4200/ #Frontend                                       

Heroku url -

UI experience
- > https://imdbmovie.herokuapp.com/  

Accessing direct backend API
- > https://imdbdjangobackend.herokuapp.com/api/movie/list/


#### In below snippets, explained all the docs regarding calling of API



## Snippets

### FrontEnd-Backend Integrated Snippets
- Login
![Screenshot](Snippets/Login.PNG)
- SignUp
![Screenshot](Snippets/SignUp.PNG)
- Anonymous User Home Page View
![Screenshot](Snippets/AnonymousUserHome.PNG)
- Anonymous User Search Page View
![Screenshot](Snippets/AnonymousUserSearch.PNG)
- No Search Result Page
![Screenshot](Snippets/NoSearchResult.PNG)
- Normal User Login Home Page View
![Screenshot](Snippets/NormalUserLogin.PNG)
- Admin Home Page View
![Screenshot](Snippets/AdminHome.PNG)
- Admin Add Movie Page (Only Admin Access)
![Screenshot](Snippets/AddMovie.PNG)
- After Adding Movie SpiderMan
![Screenshot](Snippets/AfterAdd.PNG)
- Updating Movie (Only Admin Access)
![Screenshot](Snippets/MovieUpdate.PNG)
- After Movie  Updated
![Screenshot](Snippets/AdminAfterUpdate.PNG)
- Before Delete (Admin Access)
![Screenshot](Snippets/BeforeDelete.PNG)
- After Delete 
![Screenshot](Snippets/AfterDelete.PNG)


### Backend API POSTMAN Snippets (use Postman Tool for API testing)
1-  Register API (POST)
- > https://imdbdjangobackend.herokuapp.com/api/register/
```json
#Json Post data
{
   "username":"test2",
   "password":"test2",
   "email":"test2@gmail.com"
}
```
![Screenshot](Snippets/api_register.PNG)

2- Api Login with created user test2 return JWT token(access and refresh)
- > https://imdbdjangobackend.herokuapp.com/api/login/
```json
#Json Post data
{
   "username":"test2",
   "password":"test2"
}
```
![Screenshot](Snippets/api_login.PNG)

3- Api Refresh JWT token (if access token expired) send the refresh token with api which got during the login
- > https://imdbdjangobackend.herokuapp.com/api/token/refresh/
```json
#Json Post data
{
   "refresh":"XXXXXX.XXXXXXX.XXXXXXXX"
}
```
![Screenshot](Snippets/api_token_refresh.PNG)

4- Setting the access token in Header to do the Admin request with server like (Create, Update, Delete Movie). Make sure that Logged with Admin user, if Not logged with Admin User then you will get the error like "You do not have permission to perform this action"
```json
#Setting Header as shown in the image

"Authorization":"Bearer XXXXXX.XXXXXXX.XXXXXXXX"

```
![Screenshot](Snippets/api_set_access_tokenINHeader.PNG)

5- Get All Users (Admin access only), here I am trying to get the users list with test2 Normal User Logged token. Getting the msg shown in image
- > https://imdbdjangobackend.herokuapp.com/api/users/

![Screenshot](Snippets/api_getUsers_NormalUsrNotAllowed.PNG)

6- Admin Login (Store the JWT access token in Header as we did earlier in Header)
- > https://imdbdjangobackend.herokuapp.com/api/login/
```json
#Json Post data
{
   "username":"admin",
   "password":"admin"
}
```
![Screenshot](Snippets/api_admin_login.PNG)

7- Setting Logged Admin user access token in Header
```json
#Setting Header as shown in the image

"Authorization":"Bearer XXXXXX.XXXXXXX.XXXXXXXX"

```
![Screenshot](Snippets/api_admin_tokenheaderSet.PNG)

8- get Logged User details (Accessible for only logged user Admin/NormalUser) here I logged with Admin
- > https://imdbdjangobackend.herokuapp.com/api/logged_user/

![Screenshot](Snippets/api_loggeduser_details.PNG)

9- Create Movie (Only Admin Access)
- > https://imdbdjangobackend.herokuapp.com/api/movie/create/
```json
#Post Json data
{
   "popularity": 83.0,
   "director": "Victor Fleming",
   "genre": [
   "Adventure",
   " Family",
   " Fantasy",
   " Musical"
   ],
   "imdb_score": 8.3,
   "name": "The Wizard of Oz"
}
```
You can create Multiple Movie as well with pass data like below
```json
#Post Json data
[
   {
      "popularity": 83.0,
      "director": "Victor Fleming",
      "genre": [
      "Adventure",
      " Family",
      " Fantasy",
      " Musical"
      ],
      "imdb_score": 8.3,
      "name": "The Wizard of Oz"
   },
   {
      "popularity": 83.0,
      "director": "Victor Fleming",
      "genre": [
      "Adventure",
      " Family",
      " Fantasy",
      " Musical"
      ],
      "imdb_score": 8.3,
      "name": "The Wizard of Oz"
   },

]
```

![Screenshot](Snippets/api_admin_movie_creation.PNG)

10- Get the Movies list (can be Accessible by anyone LoggedUser/AdminUser/Anonymous  User)
- > https://imdbdjangobackend.herokuapp.com/api/movie/list/

As we can see in the response this the paginated one server is not delivering the whole list it sent the first 15 records if user want more list then request using the **next url**
- > https://imdbdjangobackend.herokuapp.com/api/movie/list/?limit=15&offset=15

we can change here limit value at frontend server according to requirement. I used here Angular for frontend. so when user scroll down then this next url automatically calls the next 15 sets of the result and so on.

![Screenshot](Snippets/api_admin_movie_list.PNG)

11- Anonymous User accessing the list (Just Unchecked the Authorization checkbox so token won't pass with request)
- > https://imdbdjangobackend.herokuapp.com/api/movie/list/

![Screenshot](Snippets/api_ananyomous_movie_list.PNG)

12- Following are the search api to access the list in paginated way (Accessible to anyone)
- > https://imdbdjangobackend.herokuapp.com//api/movie/list/?search=Cha
- > https://imdbdjangobackend.herokuapp.com/api/movie/list/?name=Baywatch
- > https://imdbdjangobackend.herokuapp.com/api/movie/list/?orderning=name

13- Get Single Movie Detail (Admin Access only)
Make sure that you checked again the Authorization in under section
- > https://imdbdjangobackend.herokuapp.com/api/get_movie/246/

![Screenshot](Snippets/api_get_single_movie_adminaccess.PNG)

14- Movie Update (Only Admin Access)
- > https://imdbdjangobackend.herokuapp.com/api/movies/246/
```json
#Put Json data
{
   "name":"Test",
   "genre":[
         "Fun",
         "Drama"
   ]
}
```

![Screenshot](Snippets/api_movie_admin_update.PNG)

15- Delete Movie (Only admin access) (Change the request type DELETE)
- > https://imdbdjangobackend.herokuapp.com/api/movies/246/

![Screenshot](Snippets/api_admin_delete.PNG)

16- Api Normal User login
- > https://imdbdjangobackend.herokuapp.com/api/login/
```json
#Json Post data
{
   "username":"test",
   "password":"test"
}
```
Store the access token in header as we did earlier


![Screenshot](Snippets/api_normal_user_login.PNG)

17- Normal Logged user trying to create the Movie (Received Error) Only Admin access given
- > https://imdbdjangobackend.herokuapp.com/api/movie/create/
```json
#Post Json data
{
   "popularity": 83.0,
   "director": "Victor Fleming",
   "genre": [
   "Adventure",
   " Family",
   " Fantasy",
   " Musical"
   ],
   "imdb_score": 8.3,
   "name": "The Wizard of Oz"
}
```
![Screenshot](Snippets/api_normal_user_trying_to_create_movie.PNG)

18- If let's user accessing with incorrect token
try to edit something in aceess token in header section

![Screenshot](Snippets/api_incorrect_token.PNG)

19- Normal User can also retrieve the movie list
- > https://imdbdjangobackend.herokuapp.com//api/movie/list/

![Screenshot](Snippets/api_normal_user_getmovie.PNG)

20- Normal Logged User/ Anyonoumous User do not ahve permission for Update
- > https://imdbdjangobackend.herokuapp.com/api/movies/236/
```json
#Put Json data
{
   "name":"Test",
   "genre":[
         "Fun",
         "Drama"
   ]
}
```

![Screenshot](Snippets/api_normal_user_update_notallowed.PNG)

21- Normal LoggedUser/Anyonoumous User do not have permission for Update
Request type - DELETE
- > https://imdbdjangobackend.herokuapp.com/api/movies/236/

![Screenshot](Snippets/api_normal_user_delete_movie_notallowed.PNG)

22- Remove the token from Header and try to Update and Delete the movie - Api don't allow you

Request type - DELETE

- > https://imdbdjangobackend.herokuapp.com/api/movies/236/

![Screenshot](Snippets/api_ananoymouse_usernot_allowed_to_deleteupdate.PNG)

