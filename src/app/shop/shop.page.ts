import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  results: Observable<any>;
  searchTerm: string = '';
  
  /**
   * Constructor of our first page
   * @param apiService The api Service to get data
   */
  constructor(private apiService: ApiService) { }
 
  ngOnInit() { }
 
  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.apiService.getProducts();
  }

}
