import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  private Datas: DataProvider;

  constructor(private auth: AuthService, data:DataProvider) { 
    this.Datas = data;
  }

  ngOnInit() {
    this.Datas.getMe();
    this.Datas.getBalance();
  }

  logout(){
    this.auth.signOut();
  }

}
