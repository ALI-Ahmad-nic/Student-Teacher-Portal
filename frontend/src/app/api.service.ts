import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  stdatafun(studentData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/stregister`, studentData, { headers });
  }

  logindatafun(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  getStudents(): Observable<any> {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/students`, { headers });
  }


  
  postdatafun(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/register', data);
  }





 

  editstudent(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatestudent/${id}`, data);
  }

  deletestudent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletestudent/${id}`);
  }
}
