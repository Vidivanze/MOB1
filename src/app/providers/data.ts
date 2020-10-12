import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {reject, resolve} from 'q';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable()
export class DataProvider {
  
  private apiurl = "http://127.0.0.1:8000/api";

  public stock = []
  public user = []

  constructor(private http: HttpClient, private storage: Storage, private toaster: ToastController){}

  //Load Data
  public loadFromAPI(): Promise<any>
  {
    return new Promise<any> ( (resolve, reject) => {
      this.http.get(this.apiurl+'/products').subscribe(
        response => {
          this.stock = response['data'];
        },
        err => {
          console.log('API failed with code '+err.status)
        }
      )
    })
  }



  //Return user informations
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

  

}