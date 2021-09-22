import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User | null  = null;

  constructor(private api : ApiService, private router :Router) {
    if(this.currentUser == null && localStorage.getItem("DiscordToken")){
      this.authenticate();
    }
   }


   login(discordCode : string): void{
     var body = {
       discordCode: discordCode
     }
     this.api.post("user/login",body).subscribe(data => {
       console.log(data);
      localStorage.setItem("DiscordToken",data.accessToken);
      localStorage.setItem("UserName",data.username);
      this.currentUser = new User();
      this.currentUser.id = data.id;
      this.currentUser.image = data.image;
      this.currentUser.username = data.username;
      console.log(this.currentUser);
      this.router.navigateByUrl("/");
     })
   }

   authenticate() : void{

     this.api.post("user/Authenticate").subscribe(data => {
      localStorage.setItem("DiscordToken",data.accessToken);
      localStorage.setItem("UserName",data.username);
      this.currentUser = new User();
      this.currentUser.id = data.id;
      this.currentUser.image = data.image;
      this.currentUser.username = data.username;
     }, error =>{
       localStorage.removeItem("DiscordToken");
       localStorage.removeItem("UserName");
     });
   }


}
