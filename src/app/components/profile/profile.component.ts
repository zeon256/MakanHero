import {Component, OnInit} from '@angular/core';
import {Router}from '@angular/router';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {toast} from '../../toast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [toast]
})
export class ProfileComponent implements OnInit {

  private url = 'http://192.168.1.167:8000/api/v1/me';
  private email: string;

  constructor(private router: Router, private http: Http, private ts: toast) {
    this.getUserData();
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  getUserData() {
    const headers = new Headers(
      {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'bearer ' + localStorage.getItem('currentUser')
      });
    const options = new RequestOptions({headers: headers});
    this.http.get(this.url, options).map(res => res.json()).subscribe(msg => {
      this.email = msg.data.email;
    }), err => this.ts.showToast('Error b0ss');
  }

}
