import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies;
  public next_movie_list_url;
  public notEmptyMovie=true;
  public notscrolly=true;


  public logged_user;
  public is_admin;

  constructor(public mov_srv: MovieService, public auth_srv: AuthService,public app_com:AppComponent) { }

  ngOnInit(): void {
    
    this.mov_srv.getMoviesList().subscribe(
      res => {
        this.movies = res.results;
        this.next_movie_list_url = res.next
        console.log(this.movies)

        this.auth_srv.getLoggeduser().subscribe(
          res => {
            console.log(res)
            this.logged_user = res;
            this.is_admin = res.is_staff;
            this.app_com.IsAdmin = res.is_staff
          },
          err => {
            this.is_admin = false
          }
        )

      },
      err => {
        console.log(err)
      }
    )

    this.updateNavBar()
  }


  onScroll(nextMovieURL){
    console.log("Scrolling")
    if (this.notscrolly && this.notEmptyMovie) {
      // console.log(nextPostURL)
      this.notscrolly = false;
      if (nextMovieURL){
        this.loadNextPost(nextMovieURL);
      }    
    }
    
  }

  loadNextPost(nextMovieURL){
    this.mov_srv.getNextMoviesList(nextMovieURL).subscribe(
      res =>{
        let new_movies = res.results;
        this.next_movie_list_url = res.next

        

        if (new_movies.length === 0){
            this.notEmptyMovie = false;
            this.notscrolly = false;
        }
        this.movies = this.movies.concat(new_movies);
        this.notscrolly = true;
      }
    )
  }


  delete_movie(id){
    this.mov_srv.deleteMovie(id).subscribe(
      res => {
        this.ngOnInit()
      },
      err =>{
        console.log(err)
      }
    )
  }

  updateNavBar(){
    if(this.auth_srv.loggedIn()){
      this.auth_srv.getLoggeduser().subscribe(
        res => { 
          this.auth_srv.isAdmin.next(res.is_staff)
        
        },
        err =>{
          this.auth_srv.isAdmin.next(false)
        }
      )
    }
  }

}
