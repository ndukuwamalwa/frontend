import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  invalid: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(value) {
    this.userService.login(value)
    .subscribe(res => {
      window.sessionStorage.user = JSON.stringify(res.user);
      window.sessionStorage.token = res.token;
      window.sessionStorage.favorite = JSON.stringify(res.favorite);
      this.router.navigateByUrl(`/`);
    }, err => {
      this.invalid = true;
    });
  }

}
