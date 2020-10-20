  
import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  
  public shopList = [];

  constructor(private data: DataProvider, private router : Router) { }

  ngOnInit() { 
    this.data.getProducts().then((val) => {
      this.shopList = val;
    })
  }

  //Product details
  details(product){ 
    let navigationExtras: NavigationExtras = {
      state: {
        product: product
      }
    };

    this.router.navigate(['/tabs/details/'], navigationExtras);
  }

}
