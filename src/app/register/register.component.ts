import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  dup: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register(details) {
    this.userService.create(details.name, details.username, details.password)
    .subscribe(res => {
      window.sessionStorage.user = JSON.stringify(res.user);
      window.sessionStorage.token = res.token;
      window.sessionStorage.favorite = JSON.stringify(res.favorite);
      this.router.navigateByUrl(`/`);
    }, err => {
      this.dup = true;
    });
  }

}
