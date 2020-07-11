import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public data = {}

  constructor(private _auth: AuthService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    this._auth.logoutUser(this.data).subscribe(
      res => {
        this.router.navigate(['/signin'])
      },
      err => {
        console.log(err);
        this.router.navigate(['/signin'])
      }
    )
    
  }

}
