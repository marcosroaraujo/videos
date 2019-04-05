import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data: any;
  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('no login');
    console.log(this.data);
  }
}
