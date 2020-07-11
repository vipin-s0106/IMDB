import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public auth_srv:AuthService) { }

  ngOnInit(): void {
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

}
