import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private auth: AuthService) { 
    if(this.auth.isLogedIn){
      this.router.navigate(['/tabs/shop']);
    }
  }
  ngOnInit() {
    
  }

}
