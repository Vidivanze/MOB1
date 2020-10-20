import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private auth: AuthService, private storage: Storage) {
    //If user is connected
    this.storage.get('token').then(val => {
      if (val != null){
        console.log("ok")
        this.router.navigate(['/tabs/shop']);
      }else{
        console.log("pas ok")
        this.router.navigate(['/tabs/home']);
      } 
    })
  }
  ngOnInit() {
    
  }

}
