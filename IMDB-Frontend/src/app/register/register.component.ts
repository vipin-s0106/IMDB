import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUserData = {'username':'','email':'','password':'','confirm_password':'','full_name':''}; 
  public registeruserMessage;
  public register_message_color;
  public typing_confirm_password = false;
  public confirm_new_password_match;

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(){
    if(this.registerUserData.password === this.registerUserData.confirm_password){
      this._auth.registerUser(this.registerUserData).subscribe(
        res => this.DisplaySuccessUserMessage(res),
        err => this.DisplaySuccessUserMessage(err)
      )
    }
    else{
      this.DisplaySuccessUserMessage("Confirm Password do not match with password")
    }
    
  }


  DisplaySuccessUserMessage(msg){
    if ('error' in msg){
      this.registeruserMessage = msg['error']['error'];
      this.register_message_color="Tomato";
    }
    else{
      this.registeruserMessage = "You have succefully registered with us.";
      this.register_message_color="green";
    }
    
  }

  verfiyConfirmPasswordMatch(){
    this.typing_confirm_password = true;
    if(this.registerUserData.confirm_password === this.registerUserData.password){
      this.confirm_new_password_match = true;
    }
    else{
      this.confirm_new_password_match = false;
    }
  }


}
