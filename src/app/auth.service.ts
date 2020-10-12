import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DataProvider } from './providers/data';
import { SelectValueAccessor, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //User auth status
  public isLogedIn: Boolean = false;

  private token;

  constructor(private storage: Storage, private router: Router, private data: DataProvider, private toaster: ToastController) { 
    this.storage.get('token').then(val => {
      if (val != null){
        this.isLogedIn = true;
        this.router.navigate(['/tabs/shop']);
      }else{
        this.isLogedIn = false;
        this.router.navigate(['/tabs/home']);
      } 
    })
  }

  public signIn(){    
    this.storage.get('token').then(()=>{
      this.data.getMe().then((val)=>{
        if(val != null){ 
          this.isLogedIn = true
          this.router.navigate(['/tabs/account']);
          
          //Success notification
          this.toaster.create({
            message: "Connexion réussie !",
            duration: 850,
            color: 'success'
          }).then(toast => {
            toast.present();
          })
        }
      })
    })
  }

  public signOut(){
    this.storage.remove('token');
    this.isLogedIn = false;
    console.log("déconnecté, -> isLogedIn = "+this.isLogedIn);
    this.router.navigate(['']);
    
    //Success notification
    this.toaster.create({
      message: "Vous êtes bien déconnecté !",
      duration: 2000
    }).then(toast => {
      toast.present();
    })
  }




}
