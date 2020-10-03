import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
 
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url = 'http://localhost:8000/api/products';
  apiKey = '5EwUJAMk0Vb77g5aFHyXSRhnZbsij3woMBSupEBiRct1HlUgKeFH2lmENept';
 
  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient) { }
 
  /**
  * Get data from the OmdbApi 
  * map the result to return only the results that we need
  * 
  * @returns Observable with the search results
  */
  getProducts(){
    return this.http.get(`${this.url}?&apikey=${this.apiKey}`);
  }


 
  /**
  * Get the detailed information for an ID using the "i" parameter
  * 
  * @param {string} id imdbID to retrieve information
  * @returns Observable with detailed information
  */
  getDetails(id) {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}
