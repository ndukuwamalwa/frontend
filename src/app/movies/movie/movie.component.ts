import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: any = {};
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private movieService: MoviesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.isLoading = true;
        this.movieService.details(params.id).subscribe(res => {
          this.movie = res;
          this.isLoading = false;
        });
      }
    });
  }

  back() {
    window.history.back();
  }

}
