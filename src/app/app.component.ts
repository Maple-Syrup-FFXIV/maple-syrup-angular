import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'maple-syrup-angular';
  public usernamePlaceHolder : string | null = localStorage.getItem("UserName");

  constructor(public userService : UserService) { }

  hasToken():boolean{
    return localStorage.getItem("DiscordToken") != null;
  }

  ngOnInit(): void {
  }

}
