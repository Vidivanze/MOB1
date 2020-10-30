import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartPage } from '../cart/cart.page';
import { DataProvider } from '../providers/data';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.page.html',
  styleUrls: ['./shop-details.page.scss'],
})
export class ShopDetailsPage implements OnInit {
  
  dataDetail: any;
  private cart = [];

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, private data: DataProvider, private toaster: ToastController) { 
    //
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.dataDetail = this.router.getCurrentNavigation().extras.state.product;
      }
    });
  }

  ngOnInit() {
    this.storage.get('cart').then((val) => {
      if(val != null){
        this.cart = val;
      }
    });

  }


  addToCart(productId){  

      if(productId != null){
        this.data.findProductById(productId).then((val) => {
          if(val != null){
            this.cart.push(val);  
          }        
        });

        this.storage.set("cart", this.cart).then((val) => {
          this.cart = val;
        });
        
        //Notification
        this.toaster.create({  
          message: "Produit ajouté au panier !",
          duration: 800,
          color: 'success'
        }).then(toast => {
          toast.present()
        });

      }
    
  }


}
