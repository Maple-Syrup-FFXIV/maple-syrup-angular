import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:  Router,private route : ActivatedRoute, private userService : UserService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      if(params['code']){
        this.userService.login(params['code']);
      }else{
        this.router.navigateByUrl("/");
      }
    })
  }

}
