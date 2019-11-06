import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scrumuser } from './scrumuser';
import { Userproject } from './userproject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrumdataService {

  constructor(private _http: HttpClient) {}

  _url = 'https://liveapi.chatscrum.com/scrum/api/scrumusers/';

  _urllogin = 'https://liveapi.chatscrum.com/scrum/api-token-auth/';

  _scrumProjectUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumprojects/';

  _updateProjectUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumgoals/';

  token;

  encode;
    public httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }


    signup(user: Scrumuser) {
      return this._http.post<any>(this._url, {'email': user['email'], 'password': user['password'], 
      'full_name': user['fullname'], 'usertype': user['usertype'],
    'projname': user['projname']}, this.httpOptions);
    }

    login(user) {
      return this._http.post<any>(this._urllogin, {'username': user['email'], 'password': user['password'], 'project': user['projname']}, this.httpOptions)
    }

    updateUser(user): Observable<any> {
      this.token = this.getUser().token;
      this.encode = JSON.parse(localStorage.getItem('Auth'));
      this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
      return this._http.patch(this._updateProjectUrl + user.id + '/', { role: user.role }, {
        headers: new HttpHeaders()
          .set('Authorization', `Basic ${this.encode}==`)
      })
    }
  
    updateStatus(user): Observable<any> {
      this.token = this.getUser().token;
      this.encode = JSON.parse(localStorage.getItem('Auth'));
      this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
      return this._http.patch(this._updateProjectUrl + user[3] + '/', { status: user[2] }, {
        headers: new HttpHeaders()
          .set('Authorization', `Basic ${this.encode}==`)
      })
    }
  
    // createProject(project): Observable<any> {
    //   return this._http.post(this._scrumProjectUrl, {email: project.email, name: project.fullname, projName: project.projectName,
    //   scrumprojectrole_set: [{role: 'Owner', user:'', scrumgoal_set:'', scrumnote_set:'', scrumworkid_set:'', scrumlog_set:''}], 
    //   scrumslack_set: [{access_token:'fkdoelaksdlf;kekpaiosd', bot_access_token:'aalskdofeisakdpf'}]}, this.httpOptions);
    // }

    createproject(user: Userproject) {
      return this._http.post<any>(this._url, { 'email': user['email'], 'projname': user['projname'], 'full_name': user['fullname'], 'usertype': 'Owner',}, this.httpOptions);
    }

    loggedIn() {
      return !!localStorage.getItem('token')
    }

    allProjectGoals(project_id) {
      return this._http.get<any>(this._scrumProjectUrl + project_id, this.httpOptions);
    }

    getUser(): any {
      return JSON.parse(localStorage.getItem('user'));
    }
}
