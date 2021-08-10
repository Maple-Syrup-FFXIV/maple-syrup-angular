import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User | null  = null;

  constructor(private api : ApiService) {
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
      this.currentUser.Id = data.id;
      this.currentUser.Image = data.image;
      this.currentUser.UserName = data.username;

      console.log(this.currentUser);
     })
   }

   authenticate() : void{

     this.api.post("user/Authenticate").subscribe(data => {
      localStorage.setItem("DiscordToken",data.accessToken);
      localStorage.setItem("UserName",data.username);
      this.currentUser = new User();
      this.currentUser.Id = data.id;
      this.currentUser.Image = data.image;
      this.currentUser.UserName = data.username;
     }, error =>{
       localStorage.removeItem("DiscordToken");
       localStorage.removeItem("UserName");
     });
   }


}
