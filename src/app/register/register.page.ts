import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private apiurl = "http://127.0.0.1:8000/api";

  private firstname: String = "";
  private lastname: String = "";
  private phonenumber: String = "";

  

  constructor(private router: Router, private toaster: ToastController, private storage: Storage, private dataProvider: DataProvider, private http: HttpClient, private auth: AuthService) {
    
  }

  ngOnInit() {
  }

  signUp(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let options = {
      headers: headers
    }

    let erreur = "";

    let data = {
      "firstname": this.firstname,
      "lastname": this.lastname,
      "phonenumber": this.phonenumber,
    }

    console.log(this.firstname)
    
    this.http.post(this.apiurl+'/user/apply', data, options)
    .subscribe(
      data => {
        this.toaster.create({
          message: 'Inscription validée ! Vous allez recevoir un sms contenant votre token !',
          duration: 2500,
          color: 'success'
        }).then(toast => {
          toast.present()
        });
        this.router.navigate(['/tabs/home']);
      },
      err => {
        //If fields are empty
        if(this.firstname == "" || this.lastname == "" || this.phonenumber == ""){
          //Notification
          this.toaster.create({  
            message: "Veuillez remplir tous les champs",
            duration: 2000,
            color: 'danger'
          }).then(toast => {
            toast.present()
          });
        }else{
          //Notification
          this.toaster.create({  
            message: err.error,
            duration: 2000,
            color: 'danger'
          }).then(toast => {
            toast.present()
          });
        } 
      }
    )
  }
}
