import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user_credential = {'username':'','password':''}
  public failure_message;

  constructor(private _auth: AuthService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }


  LoginUser(){
    this._auth.loginUser(this.user_credential).subscribe(
      res => {
        // console.log(res);
        localStorage.setItem('token',res.access);
        localStorage.setItem('refresh',res.refresh);
        this.router.navigate(['/home']);
      },
      err => this.failure_message = err
    )
    
  }

}
