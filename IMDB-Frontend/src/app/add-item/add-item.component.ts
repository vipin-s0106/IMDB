import { Component, OnInit } from '@angular/core';

import { MovieService } from '../services/movie.service'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public movie_data = {"name":"","director":"","genre":"","imdb_score":"","popularity":""}
  public message;
  public message_color;

  constructor(private _movie_srv: MovieService,private route:ActivatedRoute,private router: Router,public auth_srv: AuthService) { }

  ngOnInit(): void {
    this.updateNavBar()
    this.auth_srv.isAdmin.subscribe(
      res => {
        if(!res){
          this.router.navigate(['/home'])
        }
      }
    )
  }


  addMovie(){
    this._movie_srv.createMovie(this.movie_data).subscribe(
      res =>{
        this.message = this.movie_data.name+" successfully added to list"
        this.message_color = "green"
      },
      err => {
        this.message = "Incorrect Data enter check IMDB score/Popularity rating limit"
        this.message_color = "tomato"
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
