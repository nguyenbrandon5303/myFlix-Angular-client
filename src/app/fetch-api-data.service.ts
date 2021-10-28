import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixdb-5303.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    // console.log('start of registration');
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  getOneMovie(): Observable<any> {
    return this.http.get(apiUrl + `movies/:title`).pipe(
      catchError(this.handleError)
    );
  }

  getDirector(director: any): Observable<any> {
    return this.http.get(apiUrl + `directors/${director}`).pipe(
      catchError(this.handleError)
    );
  }

  getGenre(genre: any): Observable<any> {
    return this.http.get(apiUrl + `genres/${genre}`).pipe(
      catchError(this.handleError)
    );
  }

  getUser(username: any): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  getFavoriteMovies(username: any): Observable<any> {
    return this.http.get(apiUrl + `users/${username}/movies`).pipe(
      catchError(this.handleError)
    );
  }

  addMovie(username: any, movieId: any): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  editUser(username: any, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `users/${username}`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(username: any): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteFavoriteMovie(username: any, movieId: any): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}