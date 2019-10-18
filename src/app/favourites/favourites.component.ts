import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html'
})
export class FavouritesComponent implements OnInit {

  movies: any[] = [];
  allMovies: any[] = [];

  constructor(private movieService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.movies = [];
    const movies = JSON.parse(window.sessionStorage.getItem("movies"));
    const favorites = JSON.parse(window.sessionStorage.getItem('favorite'));
    for (let movie of favorites) {
      let found = movies.find(val => val.id === movie);
      if (found) {
        this.movies.push(found);
      }
    }
    this.allMovies = this.movies;
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

  unFavourite(id) {
    this.movieService.unFavorite(id)
    .subscribe(res => {
      const movie = this.movies.find(val => +val.id === +id);
      const index = this.movies.indexOf(movie);
      this.movies.splice(index, 1);
      let favorites = JSON.parse(window.sessionStorage.getItem('favorite'));
      favorites = favorites.filter((val) => +val !== +id);
      window.sessionStorage.favorite = JSON.stringify(favorites);
    });
  }

}
