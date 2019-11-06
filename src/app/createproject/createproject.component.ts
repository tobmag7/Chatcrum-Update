import { Component, OnInit } from '@angular/core';
import { Userproject } from '../userproject';
import { ScrumdataService } from '../scrumdata.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {

  constructor(private _scrumdataService: ScrumdataService) { }

  ngOnInit() {
  }

  createProjectModel = new Userproject('', '', '');

  feedback = "";

  var(message, data) {
    var x = document.getElementById("alert");
    document.getElementById('alert').innerHTML = message;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  onProjectSubmit() {
    console.log(this.createProjectModel)
    this._scrumdataService.createproject(this.createProjectModel).subscribe(
    data => {console.log('success', data)
    this.feedback = 'Project Created Successfully For Existing User'},
    error => {console.log('create project failed', error)}
  )
  }

}
