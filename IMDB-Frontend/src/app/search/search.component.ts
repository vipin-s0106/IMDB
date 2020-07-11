import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public search_keyword;
  public movies;
  public next_movie_list_url;
  public notEmptyMovie=true;
  public notscrolly=true;
  public search_count = 0;

  public logged_user;
  public is_admin;

  constructor(private route: ActivatedRoute,private router: Router,public mov_srv: MovieService,public auth_srv: AuthService) {
  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.search_keyword = params.keyword;
        console.log(this.search_keyword);
        
        this.mov_srv.searchMovie(this.search_keyword).subscribe(
          res => {
            this.search_count = res.count
            this.movies = res.results;
            this.next_movie_list_url = res.next
            console.log(this.movies)
            this.auth_srv.getLoggeduser().subscribe(
              res => {
                console.log(res)
                this.logged_user = res;
                this.is_admin = res.is_staff;
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
      });

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
