import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  private url= "http://localhost:3000"
  username:string|null=localStorage.getItem('name')

  registerUser(params:any):Observable<any>{
    return this.http.post(`${this.url}/user`,params)
  }
  
  // Fetch user data from API
  getUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.url}/user`).pipe(
      catchError(() => of([]))
    );
  }

  // Check if user is authenticated
  isAuthenticated(username: string, password: string): Observable<boolean> {
    console.log(username,password);
    
    return this.getUsers().pipe(
      map(users => users.some((user: { username: string; password: string; }) => user.username === username && user.password === password))
    );
  }

  addTask(params:any):Observable<any>{
    params.username = this.username;
    return this.http.post(`${this.url}/tasks`,params)
  }

  getTasks(): Observable<any>{
    return this.http.get<any[]>(`${this.url}/tasks`).pipe(
      catchError(() => of([]))
    );
  }

  getTasksByUsername(username:string): Observable<any[]> {
    return this.getTasks().pipe(
      map(tasks => tasks.filter((task: { username: string }) => task.username === username))
    );
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.url}/tasks/${taskId}`).pipe(
      catchError(error => {
        console.error('Error deleting task:', error);
        return of(null); // Return null or appropriate default value
      })
    );
  }



}
