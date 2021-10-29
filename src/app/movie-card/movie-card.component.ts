import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service'
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { DetailsCardComponent } from '../details-card/details-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteList: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openProfile(): void {
    this.dialog.open(UserProfileComponent);
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description }
    });
  }

  openDirector(name: string, bio: string, birth: number): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birth }
    });
  }

  openDetails(title: string, description: string, director: string, genre: string, actors: string): void {
    this.dialog.open(DetailsCardComponent, {
      data: { title, description, director, genre, actors }
    });
  }

  isFavorite(id: any): any {
    return this.favoriteList.includes(id);
  }

  addFavorite(id: string, title: string): void {
    this.fetchApiData.addMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} added to favorites`, '', {
        duration: 2000
      })
    });
    return this.getUserFavorites();
  }

  removeFavorite(id: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} deleted from favorites`, '', {
        duration: 2000
      })
    });
    return this.getUserFavorites();
  }

  getUserFavorites(): void {
    const username = localStorage.getItem('username');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.favoriteList = resp.Favorite;
    });
  }
}