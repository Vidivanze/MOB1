import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../providers/data';
import { IfStmt } from '@angular/compiler';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  private cart = [];
  private cartProductList = [];
  private productToAdd;

  constructor(private data: DataProvider, private storage: Storage, private toaster: ToastController) {
    
  }

  ngOnInit() {
    this.data.getProducts().then((prod) => {
      this.cartProductList = prod;
      this.storage.get('cart').then((val) => {
        if(val != null){
          this.cart = val;
          this.cart.forEach((element1) => {
            this.cartProductList.forEach((element2, index2) => {
              if(element1.name == element2.name){
                this.cartProductList.splice(index2, 1);
              }
            });
          })
        }
      });
      
      this.sortProductListByName();
    });
  }


  addToCart(productId){  
    if(productId!= null){
      this.data.findProductById(productId).then((val) => {
        this.productToAdd = val
        this.cart.push(this.productToAdd);
      });

      this.storage.set('cart', this.cart).then(() => {
        this.cartProductList = this.cartProductList.filter(({id}) => id != productId);
      })

    }
  }

  removeFromCart(cartItem){ 
    if(cartItem != null){
      this.cart = this.cart.filter(({id}) => id != cartItem.id);
      this.cartProductList.push(cartItem);
      this.sortProductListByName();

      this.storage.set('cart', this.cart);

    }
  }

  dropCart(){
    this.storage.get('cart').then((val) => {
      if(val != null){ 
        this.storage.remove('cart');
        this.cart = null;
        
        //Notification
        this.toaster.create({  
          message: "Le panier à été vidé",
          duration: 2000,
          color: 'primary'
        }).then(toast => {
          toast.present()
        });

        this.ngOnInit();
      }
    })

  

    
     
  }


  sortProductListByName(){
    this.cartProductList.sort(function(a,b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
  }
}

