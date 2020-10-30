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
  public totalPrice = 0;

  constructor(private data: DataProvider, private storage: Storage, private toaster: ToastController) {
    
  }

  ngOnInit() {
    this.data.getProducts().then((prod) => {
      this.cartProductList = prod;
      this.storage.get('cart').then((val) => {
        if(val != null){
          this.cart = val;
          console.log(this.cart)
          this.cart.forEach((element1) => {
            this.totalPrice += element1['price'];
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
    if(productId != null){
      this.data.findProductById(productId).then((val) => {
        this.productToAdd = val;
        this.cart.push(this.productToAdd);
        this.totalPrice += this.productToAdd['price']
      });

      this.storage.set('cart', this.cart).then(() => {
        this.cartProductList = this.cartProductList.filter(({id}) => id != productId);
      })

      //Notification
      this.toaster.create({  
        message: "Ajouté au panier !",
        duration: 800,
        color: 'success'
      }).then(toast => {
        toast.present()
      });

    }
  }

  removeFromCart(cartItem){ 
    if(cartItem != null){
      this.cart = this.cart.filter(({id}) => id != cartItem.id);
      this.cartProductList.push(cartItem);
      this.sortProductListByName();
      this.totalPrice -= cartItem['price'];
      this.storage.set('cart', this.cart);

      //Notification
      this.toaster.create({  
        message: "Supprimé du panier",
        duration: 800,
        color: 'danger'
      }).then(toast => {
        toast.present()
      });

    }
  }

  dropCart(){
    this.storage.get('cart').then((val) => {
      if(val != null){ 
        this.cart.splice(0, this.cartProductList.length);
        this.storage.remove('cart');
        this.cartProductList.splice(0, this.cartProductList.length);
        
        this.productToAdd = null;
        this.totalPrice = 0;

        //reset cartProductList
        this.data.getProducts().then((prod) => {
          this.cartProductList = prod;
        })


        //Notification
        this.toaster.create({  
          message: "Le panier à été vidé",
          duration: 2000,
          color: 'primary'
        }).then(toast => {
          toast.present()
        });

        
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

