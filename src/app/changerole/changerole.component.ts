import { Component, OnInit } from '@angular/core';
import { ScrumdataService } from '../scrumdata.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-changerole',
  templateUrl: './changerole.component.html',
  styleUrls: ['./changerole.component.css']
})
export class ChangeroleComponent implements OnInit {
  project_id;
  participants = [];
  userTypes = ["Admin", "QA", "Developer"]
  owner = [];
  qualityAnalyst = [];
  developer = [];

  constructor( private route: ActivatedRoute, private _scrumdataService: ScrumdataService) { }


  ngOnInit() {
    this.project_id = parseInt(this.route.snapshot.paramMap.get('project_id'));
    this.getProjectGoals();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.item.data.role = this.calculateRole(event.container.id);
      this._scrumdataService.updateUser(event.item.data).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  calculateRole(val){
    val = val.split("-");
    if((val[3] % 3) === 2 ){
      return 'Developer'
    }
    if((val[3] % 3) === 1 ){
      return 'Quality Analyst'
    }
    if((val[3] % 3) === 0 ){
      return 'Owner'
    }
  }

  updateGoalStatus( goal, goalItem ) {
    switch ( goal.id ) {
       case 'role_owner': goalItem.role = 'Owner';
               return;
       case 'role_quality_analyst': goalItem.status = 'Quality Analyst';
               return;
       case 'Developer': goalItem.status = 'Developer';
               return;
       default: return;
    }
  }

  sortUsers( participant ) {
    switch ( participant.goal ) {
       case 'Owner': this.owner.push(participant);
               return;
       case 'Quality Analyst': this.qualityAnalyst.push(participant);
               return;
       case 'Developer': this.developer.push(participant);
               return;
       default: return;
    }
  }

  filterUsers() {
    console.log('working');
    this.participants.forEach(( participant ) => {
       this.sortUsers(participant);
    });
  }

  getProjectGoals() {
    this._scrumdataService.allProjectGoals(this.project_id).subscribe(
      data => {
        this.participants = data.data;
        this.filterUsers()
        console.log(this.developer);
      },
      error => {
        console.log(error);
      }

    )
  }

}
