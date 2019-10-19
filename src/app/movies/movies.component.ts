import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {

  movies: any[] = [];
  allMovies: any[] = [];
  favourites: number[] = JSON.parse(window.sessionStorage.getItem('favorite'));
  user = JSON.parse(window.sessionStorage.getItem("user"));
  isLoading: boolean = false;

  constructor(private movieService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.isLoading = true;
    this.movieService.list(1, 50, "")
      .subscribe(res => {
        if (this.isAuthenticated()) {
          for (let movie of res) {
            if (this.favourites.includes(movie.id)) {
              movie.favorite = true;
            } else {
              movie.favorite = false;
            }
          }
        } else {
          for (let movie of res) {
            movie.favorite = false;
          }
        }
        this.movies = res;
        this.allMovies = res;
        window.sessionStorage.movies = JSON.stringify(this.movies);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        alert("Problem getting movies.");
      });
  }

  search(keyword: string) {
    if (keyword.trim() === "") {
      this.movies = this.allMovies;
    } else {
      const pattern = new RegExp(keyword, "i");
      this.movies = this.allMovies.filter((movie) => pattern.test(movie.title));
    }
  }

  viewDetails(id) {
    this.router.navigateByUrl(`/movie?id=${id}`);
  }

  isAuthenticated(): boolean {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("favorite");
  }

  favourite(id) {
    this.movieService.favorite(+id)
      .subscribe(res => {
        this.favourites.push(+id);
        window.sessionStorage.favorite = JSON.stringify(this.favourites);
        const index = this.movies.indexOf(this.movies.find(val => val.id === id));
        this.refreshFavorites(index);
      }, err => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
      });
  }

  unFavourite(id) {
    this.movieService.unFavorite(id)
      .subscribe(res => {
        const index = this.favourites.indexOf(+id);
        this.favourites.splice(index, 1);
        window.sessionStorage.favorite = JSON.stringify(this.favourites);
        const o_index = this.movies.indexOf(this.movies.find(val => val.id === id));
        this.refreshFavorites(o_index);
      });
  }

  refreshFavorites(changed) {
    this.movies[changed].favorite = !this.movies[changed].favorite;
  }

}
