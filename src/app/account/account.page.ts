import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  Alldatas: any;
  private Datas: DataProvider;

  constructor(private auth: AuthService, data:DataProvider) { 
    this.Datas = data;
    this.Alldatas = this.Datas.user;
  }

  ngOnInit() {
    this.Datas.getMe();
  }

  logout(){
    this.auth.signOut();
  }

}
