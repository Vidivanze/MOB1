import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private token: String;
 

  constructor(private router: Router, private toaster: ToastController, private storage: Storage) {

  }

  ngOnInit() {
  }


  //add token to storage
  addToken(){
    this.storage.set('token', this.token);
  }

}

