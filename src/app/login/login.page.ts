import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private token: String;

  constructor(private router: Router, private toaster: ToastController, private storage: Storage, private auth: AuthService) {

  }

  ngOnInit() {
  }


  //add token to storage
  login(){
    this.storage.set('token', this.token);
    this.auth.signIn();
    this.token = null;
  }

}

