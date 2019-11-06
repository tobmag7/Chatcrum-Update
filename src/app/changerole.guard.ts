import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ScrumdataService } from './scrumdata.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeroleGuard implements CanActivate {
  constructor(private _scrumdataService: ScrumdataService, private router: Router) {}
  canActivate(): boolean {
    if (this._scrumdataService.getUser().role == 'Owner') {
      console.log('Logged in');
      return true;
    } else {
      console.log('Logged Out');
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
