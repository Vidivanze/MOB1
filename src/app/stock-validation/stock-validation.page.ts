import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-validation',
  templateUrl: './stock-validation.page.html',
  styleUrls: ['./stock-validation.page.scss'],
})
export class StockValidationPage implements OnInit {

  private productList = [];
  private newStock = []; 
  private productToAdd;
  private newStockEstablished = false;
  private productNewStock: Number;
  private stockToSend = [];

  constructor(private data: DataProvider, private http: HttpClient, private toaster: ToastController, private router: Router) { 


  }


  ngOnInit() {
    this.data.getProducts().then((val) => {
      this.productList = val;
    })
  }


  validateProductStock(productId){
    
    //find product by id
    this.data.findProductById(productId).then((val) => {
      this.productToAdd = val
      this.productToAdd.stock = this.productNewStock
      this.newStock.push(this.productToAdd)
      this.productList = this.productList.filter(({id}) => id != productId);
      
      //if all the products stock have been edit
      if(this.productList.length == 0){ 
        this.newStockEstablished = true;
      }
    })
  }


  sendNewStock(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let options = {
      headers: headers
    }

    let erreur = "";


    this.newStock.forEach((product) => {
        this.stockToSend.add([{"id" : product.id, "quantity": product.stock},])
    })

  
    let data = {
      "quantities": this.stockToSend,
    }

    console.log(this.stockToSend)
    
    /*
    this.http.post(this.data.apiurl+'/products/stock', data, options)
    .subscribe(
      data => { 
        this.toaster.create({
          message: 'Le stock à bien été enregistré ',
          duration: 2500,
          color: 'success'
        }).then(toast => {
          toast.present()
        });
        this.router.navigate(['/tabs/home']);
      },
      err => {

      }
    )*/
  }

  reDoStock(){
    this.data.getProducts().then((val) => {
      this.productList = val;
    })

    this.newStockEstablished = false;
    this.newStock = [];
  }
  

}
