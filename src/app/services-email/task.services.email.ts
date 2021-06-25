import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

const baseUrl = 'http://apilayer.net/api';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceEmail {

  constructor(private http: HttpClient) { }

//   ccc(): Observable<any> {
//     return this.http.get<any>(`${baseUrl}/check?access_key=aad0e7a7a6e978c54dddf8699eb8e0da&email=email.mail@hotmail.com`);
//   }

  checkEmail(email: any): Observable<Task> {
    return this.http.get(`${baseUrl}/check?access_key=aad0e7a7a6e978c54dddf8699eb8e0da&email=${email}`);
  }
}
