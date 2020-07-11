import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IMDB-Frontend';

  public searchkeyword;
  public IsAdmin;

  constructor(private route:ActivatedRoute,private router: Router,public authSrv: AuthService){
    if(authSrv.loggedIn()){
      this.IsAdmin = this.authSrv.isAdmin.subscribe(
        res => this.IsAdmin = res,
        err => this.IsAdmin = false
      )
    }
  }

  doSearch(){
    this.router.navigate(['/search'],{ queryParams: { keyword: this.searchkeyword } })
  }

}
