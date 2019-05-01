import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RoleService } from "../role.service";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private router: Router, private roleService: RoleService) { }
  public modal = false;

  ngOnInit() {
  }

  logout(e) {
    e.preventDefault(); 
  
    sessionStorage.clear();
    this.roleService.adminRole = false
    this.roleService.userRole = false
    this.roleService.noRole = true
    this.roleService.banRole = false
    this.router.navigate(['home'])
  }

  modalFalse(e) {
    e.preventDefault(); 
  
    this.modal = false;
  }

  
  modalTrue(e) {
    e.preventDefault(); 
  
    this.modal = true;
  }

}
