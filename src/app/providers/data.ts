import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {reject, resolve} from 'q';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable()
export class DataProvider {
  
  private apiurl = "http://127.0.0.1:8000/api";

  public products = [];
  public user = [];
  public userBalance;

  constructor(private http: HttpClient, private storage: Storage, private toaster: ToastController){}

  //Returns products datas
  public getProducts(): Promise<any> {
    return new Promise<any> ( (resolve, reject) => {
      this.http.get(this.apiurl+'/products').subscribe(
        response => {
          this.products = response['data'];
          resolve(this.products);
        },
        err => {
          console.log('API failed with code '+err.status)
        }
      )
    })
  }

  //Returns product by his id
  public findProductById(id){
    return new Promise<any>((resolve, reject) => {
      this.products.forEach((product) =>{  
        if (product.id == id) {
          resolve(product);
        }
      })
      reject('Product # ' + id + ' not found');
    })
  }


  //Returns user's informations
  public getMe(): Promise<any> {
    return new Promise<any> ( (resolve, reject) => {
      this.http.get(this.apiurl+"/me").subscribe(
        response => {
          this.user = response['data'];
          console.log(this.user);
          resolve(this.user);
        },
        err => {
          this.toaster.create({
            message: 'Votre token est invalide. Veuillez réessayer !',
            duration: 4000,
            color: 'danger'
          }).then(toast => {toast.present()})
          this.storage.remove('token');
        }
      );
    })
  }

  //Returns user's balance
  public getBalance(): Promise<any> {
    return new Promise<any> ( (resolve, reject) => {
      this.http.get(this.apiurl+"/me/balance").subscribe(
        response => {
          this.userBalance = response;
          resolve(response);
        },
        err => {
          this.toaster.create({
            message: 'Votre token est invalide. Veuillez réessayer !',
            duration: 4000,
            color: 'danger'
          }).then(toast => {toast.present()})
          this.storage.remove('token');
        }
      );
    })
  }

}