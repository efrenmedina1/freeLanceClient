import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public adminRole = false;
  public userRole = false;
  public noRole = true;
  public banRole = false;

  public role = '';
  public token = '';
  public topic = '';
  public email = '';
  public name = 'Guest';

  constructor() { }
  
  getToken(){
    this.role = sessionStorage.getItem('role')
   this.token = sessionStorage.getItem('token')
   this.topic = sessionStorage.getItem('topic')
   this.name = sessionStorage.getItem('name')
   if (this.role == "admin" ) {
    this.adminRole = true;
    this.userRole = true;
    this.noRole = false;
    this.banRole = false;
  } else if(this.role == "user" ) {
    this.adminRole = false;
    this.userRole = true;
    this.noRole = false;
    this.banRole = false;
  } else if(this.role == "banned" ) {
    this.adminRole = false;
    this.userRole = false;
    this.noRole = false;
    this.banRole = true;
  } else {
    console.log("no login")
    this.adminRole = false;
    this.userRole = false;
    this.noRole = true;
    this.banRole = false;
  }
}
}