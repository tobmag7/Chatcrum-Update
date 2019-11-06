import { Component, OnInit } from '@angular/core';
import { Scrumuser } from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private scrumdataService: ScrumdataService) { }

  ngOnInit() {
  }
  userTypes = ['Regular User', 'Project Owner'];
  scrumUserModel = new Scrumuser('', '', '', '', '', true);

  feedback = '';
  loggedUser;

    onSubmit() {
      console.log(this.scrumUserModel)
        this.scrumdataService.signup(this.scrumUserModel).subscribe(
          data => {
          console.log('Successful!', data)
          console.log(this.loggedUser)
          this.feedback = 'User Account Created Successfully' 
        },
          error => {
          console.error('Error Occured!', error)
          this.feedback = 'SignUp Failed'
        }  
      )
    }
    
}

