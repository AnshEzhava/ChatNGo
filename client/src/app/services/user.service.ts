import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://chatngo-backend.azurewebsites.net/api';
  constructor(private http: HttpClient) {}

  getUserIp(): Observable<any> {
    return this.http.get('https://api.ipify.org?format=json');
  }

  saveUser(username: string, ipAddress: string): Observable<any> {
    const payload = {
      username: username,
      ipAddress: ipAddress,
    };

    return this.http.post(`${this.baseUrl}/user/save`, payload, {
      responseType: 'text',
    });
  }

  findRegisteredUser(userIp: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userIp}`, {
      responseType: 'text',
    });
  }

  updateRegisteredUser(userIp: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${userIp}`, {
      responseType: 'text',
    });
  }
}
