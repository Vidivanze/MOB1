import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.page.html',
  styleUrls: ['./shop-details.page.scss'],
})
export class ShopDetailsPage implements OnInit {
  
  data: any;
  private cart: CartPage;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) { 
    //
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.product;
      }
    });
  }

  ngOnInit() {

  }


  addToCart(productId){
    console.log(productId)
    this.cart.addToCart(productId);
    //Toast
  }
 
}
