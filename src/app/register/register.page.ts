import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private firstname: String;
  private lastname: String;
  private phonenumber: String;
  
  private Datas: DataProvider;

  constructor(private router: Router, private toaster: ToastController, private storage: Storage, dataProvider: DataProvider) {
    this.Datas = dataProvider;
  }

  ngOnInit() {
  }

  newUser(){
    //If fields are empty
    if(this.firstname == null || this.lastname == null || this.phonenumber == null || this.firstname == "" || this.lastname == "" || this.phonenumber == ""){
      //Toast notification
      this.toaster.create({
          message: "Veuillez remplir tous les champs",
          duration : 2000,
        }).then(toast => {
          toast.present();
        });
    
    }else{
      //Register user
      this.storage.set("firstname", this.firstname);
      this.storage.set("lastname", this.lastname);
      this.storage.set("phonenumber", this.phonenumber);

      this.Datas.registerToAPI(this.firstname, this.lastname, this.phonenumber);


      //Success notification
      this.toaster.create({
        message: "Vous êtes enregistré "+this.firstname+" "+this.lastname+" !",
        duration: 2000,
      }).then(toast => {
        toast.present();
      })
    }
  }
}
