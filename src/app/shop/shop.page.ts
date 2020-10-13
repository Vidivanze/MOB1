  
import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  Alldatas: any;
  private Datas: DataProvider;
  constructor(data:DataProvider, private router : Router, private auth: AuthService) {
    this.Datas = data;
    this.Alldatas = this.Datas.stock;
  }

  ngOnInit() {
    this.Datas.loadFromAPI();
   
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
