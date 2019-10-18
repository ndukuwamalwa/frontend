import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { host } from './init';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = `${host}/users`;

  constructor(private http: HttpClient) { }

  create(name: string, username: string, password: string): Observable<any> {
    return this.http.post(this.url, { name, username, password });
  }

  userId(): string {
    const id = (JSON.parse(window.sessionStorage.getItem('user')) || {}).id;
    return id;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}?id=${id}`);
  }

  update(name: string, username: string, password: string): Observable<any> {
    return this.http.put(this.url, { name, username, password, id: this.userId })
  }

  list(page: number, size: number, keyword: string): Observable<any> {
    return this.http.get(`${this.url}?page=${page}&size=${size}&keyword=${keyword}`);
  }

  login(detail): Observable<any> {
    return this.http.post(`${host}/login`, detail);
  }
}
