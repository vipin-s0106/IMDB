import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // private _baseurl = "http://127.0.0.1:8000"
  private _baseurl = environment.apiBaseUrl

  private _createMovie_url= this._baseurl + "/api/movie/create/";
  private _getMovieslist_url = this._baseurl + "/api/movie/list/";
  private _getMovie_url = this._baseurl + "/api/get_movie/"
  private _update_deleteMovie_url = this._baseurl + "/api/movies/"

  
  constructor(private http: HttpClient) { }


  createMovie(data): Observable<any>{
    return this.http.post<any>(this._createMovie_url, data);
  }

  getMoviesList(): Observable<any>{
    return this.http.get(this._getMovieslist_url);
  }

  getNextMoviesList(url): Observable<any>{
    return this.http.get(url);
  }

  getMovie(id): Observable<any>{
    return this.http.get(this._getMovie_url+id+"/");
  }

  updateMovie(id,data): Observable<any>{
    return this.http.put<any>(this._update_deleteMovie_url+id+"/",data)
  }

  deleteMovie(id): Observable<any>{
    return this.http.delete(this._update_deleteMovie_url+id+"/")
  }
  
  searchMovie(searchkeyword):Observable<any>{
    return this.http.get(this._getMovieslist_url+"?search="+searchkeyword);
  }

}
