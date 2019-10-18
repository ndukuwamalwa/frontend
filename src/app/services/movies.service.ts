import { Injectable } from '@angular/core';
import { host } from './init';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url: string = `${host}/movies`;

  constructor(private http: HttpClient, private userService: UserService) { 
  }

  create(movie): Observable<any> {
    return this.http.post(this.url, movie);
  }

  update(movie): Observable<any> {
    return this.http.put(this.url, movie);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}?id=${id}`);
  }

  list(page: number, size: number, keyword: string): Observable<any> {
    return this.http.get(`${this.url}?page=${page}&size=${size}&keyword=${keyword}`);
  }

  details(id: number): Observable<any> {
    return this.http.get(`${this.url}/details?id=${id}`);
  }

  rate(movie: number, rate: number): Observable<any> {
    return this.http.post(`${this.url}/rate`, { movie, rate, user: this.userService.userId });
  }

  addImage(movie, url): Observable<any> {
    return this.http.post(`${this.url}/image`, { movie, url });
  }

  token(): string {
    const token = window.sessionStorage.getItem("token");
    return token;
  }

  favorite(movie: number): Observable<any> {
    return this.http.post(`${this.userService.url}/favourites?token=${this.token()}`, { movie, user: this.userService.userId() });
  }

  unFavorite(id: number): Observable<any> {
    return this.http.delete(`${this.userService.url}/favourites?movie=${id}&user=${this.userService.userId()}&token=${this.token()}`);
  }

  myFavorites(): Observable<any> {
    return this.http.get(`${this.userService.url}/favourites?id=${this.userService.userId}&token=${this.token()}`);
  }
}
