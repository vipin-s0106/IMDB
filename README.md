# IMDB

### Introduction

This application is a cloned **IMDBMovie** Simple Web app. Following are the some features of **IMDBMovie**
- User/AdminUser can login/register with the application
- User can see the movies list and search the movies
- Admin User can create the movie instance, update and Delete existing movie
- Normal User/AnyonomousUser won't allow for do the any create update and delete
- User/Admin can logout from application
- Retriving movies based on user interest if he scroll down then frontend server will call backend server api to get nextset of result.


### Tech Stack
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
 
 3. Deployment
    - Heroku - Frontend Angular (different server)
    - Heroku - Backend Django (different server)
    

# Steps to Configure the Project

### Installing Requirements
- Python
- Angular CLI
- node

### Installing Libreries
- Open backend folder and run the below command to install required libreries for Python django and setup the virtual env
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
                                                   

# Snipptes

### FrontEnd-Backend Integrated Snniptes
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
- After Delete (Admin Access)
![Screenshot](Snippets/AfterDelete.PNG)


### Backend API POSTMAN Snniptes
1-  Register API (POST)
- > https://imdbdjangobackend.herokuapp.com/api/login/
```json
{
   "username":"tset2",
   "password":"test2",
   "email":"test2@gmail.com"
}
```
![Screenshot](Snippets/api_register.PNG)

2- Edit Profile
![Screenshot](Snippets/api_login.PNG)
- Story Detail
![Screenshot](Snippets/api_token_refresh.PNG)
- Other User Profile
![Screenshot](Snippets/api_set_access_tokenINHeader.PNG)
- Edit Profile
![Screenshot](Snippets/api_getUsers_NormalUsrNotAllowed.PNG)
- Story Detail
![Screenshot](Snippets/api_admin_login.PNG)
- Other User Profile
![Screenshot](Snippets/api_admin_tokenheaderSet.PNG)
- Edit Profile
![Screenshot](Snippets/api_loggeduser_details.PNG)
- Story Detail
![Screenshot](Snippets/api_admin_movie_creation.PNG)
- Other User Profile
![Screenshot](Snippets/api_admin_movie_list.PNG)
- Edit Profile
![Screenshot](Snippets/api_ananyomous_movie_list.PNG)
- Story Detail
![Screenshot](Snippets/api_get_single_movie_adminaccess.PNG)
- Other User Profile
![Screenshot](Snippets/api_movie_admin_update.PNG)
- Edit Profile
![Screenshot](Snippets/api_admin_delete.PNG)
- Story Detail
![Screenshot](Snippets/api_normal_user_login.PNG)
- Other User Profile
![Screenshot](Snippets/api_normal_user_trying_to_create_movie.PNG)
- Other User Profile
![Screenshot](Snippets/api_incorrect_token.PNG)
- Other User Profile
![Screenshot](Snippets/api_normal_user_getmovie.PNG)
- Other User Profile
![Screenshot](Snippets/api_normal_user_update_notallowed.PNG)
- Other User Profile
![Screenshot](Snippets/api_normal_user_delete_movie_notallowed.PNG)
- Other User Profile
![Screenshot](Snippets/api_ananoymouse_usernot_allowed to_deleteupdate.PNG)

