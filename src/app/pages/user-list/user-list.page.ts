import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {


  users:User[] = [];

  constructor(
    private userService:UserServiceService
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      res=>{
this.users = res;
console.log(this.users);
      },
       erro =>{
      }
    )
  }

}
