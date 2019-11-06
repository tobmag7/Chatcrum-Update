import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrumdataService } from '../scrumdata.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit {

	TFTW = [];
	TFTD = [];
	verify = [];
  done = [];
  loggedUser;

  constructor(private _route: ActivatedRoute, private _scrumdataService: ScrumdataService, private http: HttpClient) { }

  project_id = 0

  pparticipants = []

  ngOnInit() {
    this.loggedUser = this._scrumdataService.getUser();
  	this.project_id = parseInt((this._route.snapshot.paramMap.get('project_id')));
  	this.getProjectGoals();
  }

  calculateRole(val) {
    val = val.split("-");
    if ((val[3] % 4) === 3) {
      return 3;
    }
    if ((val[3] % 4) === 2) {
      return 2;
    }
    if ((val[3] % 4) === 1) {
      return 1;
    }
    if ((val[3] % 4) === 0) {
      return 0;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray
        (
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );

    } else {
      console.log(event.container.id)
      console.log(event.item.data)
      event.item.data[2] = this.calculateRole(event.container.id)
      console.log(event.item.data)
      this._scrumdataService.updateStatus(event.item.data).subscribe(
        data => (console.log(data)),
        err => (console.log(err))
      )
      transferArrayItem
        (
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
    }
  }


  getProjectGoals() {
  	this._scrumdataService.allProjectGoals(this.project_id).subscribe(
  		data => {
        console.log(data)
        console.log(this.loggedUser)
        this.pparticipants = data['data']
        this.pparticipants.forEach(element => {
          element['scrumgoal_set'].forEach(item => {
            if(item['status'] == 0 && item['user'] == element['id']) {
              this.TFTW.push([element['user']['nickname'], item['name'], item['status'], item['id']])
            }
            if (item['status'] == 1 && item['user'] == element['id']) {
              this.TFTD.push([element['user']['nickname'], item['name'], item['status'], item['id']])
            }
            if (item['status'] == 2 && item['user'] == element['id']) {
              this.verify.push([element['user']['nickname'], item['name'], item['status'], item['id']])
            }
            if (item['status'] == 3 && item['user'] == element['id']) {
              this.done.push([element['user']['nickname'], item['name'], item['status'], item['id']])
            }
            
          });
        });
        
  		},
  		error => {
  			console.log('error', error)
  		}
  	)
  }

  
}
