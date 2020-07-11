import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  constructor(public auth_srv: AuthService,public mov_srv:MovieService,private _router:Router,private route:ActivatedRoute) { }

  public movie_data = {"name":"","director":"","genre":"","imdb_score":"","popularity":""}
  public message;
  public message_color;
  public movie;
  public is_admin;

  ngOnInit(): void {
    this.auth_srv.isAdmin.subscribe(
      res => {
        if(!res){
          this._router.navigate(['/home'])
        }
      }
    )
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.mov_srv.getMovie(id).subscribe(
      res => {
        this.movie = res;
        this.movie_data.name = res.name;
        this.movie_data.director = res.director;
        this.movie_data.genre = res.genre;
        this.movie_data.imdb_score = res.imdb_score;
        this.movie_data.popularity = res.popularity;
        console.log(this.movie)
      },
      err => console.log(err)
    )

    this.updateNavBar()
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


  updateMovie(id){
    let flag = false
    const uploadData = new  FormData();
    if(this.movie_data.name){
      uploadData.append("name",this.movie_data.name)
      flag = true
    }
    
    if(this.movie_data.name){
      uploadData.append("director",this.movie_data.director)
      flag = true
    }
    
    if(this.movie_data.name){
      uploadData.append("genre",this.movie_data.genre)
      flag = true
    }
   
    if(this.movie_data.name){
      uploadData.append("imdb_score",this.movie_data.imdb_score)
      flag = true
    }
   
    if(this.movie_data.name){
      uploadData.append("popularity",this.movie_data.popularity)
      flag = true
    }
    
    if(flag){
      this.mov_srv.updateMovie(id,uploadData).subscribe(
        res =>{
          this.ngOnInit();
          this.message = "Details successfully updated";
          this.message_color = "green"
          
        },
        err =>{
          console.log(err)
          this.message = "Invalid Details enter";
          this.message_color = "tomato"
        }
      )
    }
    else{
      this.message = "Please enter the details";
      this.message_color = "tomato"
    }
  }

}
