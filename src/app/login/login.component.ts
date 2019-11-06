import { Component, OnInit } from '@angular/core';
import { Scrumlogin } from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _scrumdataService: ScrumdataService, private _router: Router) { }

  ngOnInit() {
  }

  // scrumUserLoginData = {}

  scrumUserLoginData = new Scrumlogin('', '', '');

  feedback = '';

  onLoginSubmit() {
    this._scrumdataService.login(this.scrumUserLoginData).subscribe(
      data => { 
        console.log('Successful!', data)
        localStorage.setItem('token', data.token)
        this.feedback = 'Login Successful, Welcome To Scrumboard'
        this._router.navigate(['/scrumboard', data['project_id']])
       },
      
       error => {
         console.log('Error Occured!', error)
         this.feedback = 'Login Failed, Invalid Credentials' 
        }
    )
  }

}
