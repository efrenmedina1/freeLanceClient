import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RoleService } from "../role.service";
import { flatten } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private router: Router, public roleService: RoleService) { }
  public modal = false;
  public menuOn = false;
  public menuOff = true;

  ngOnInit() {
  }

  menuOffToggle(e) {
    e.preventDefault(); 
    this.menuOff = true;
    this.menuOn = false;
  }

  menuOnToggle(e) {
    e.preventDefault(); 
    this.menuOff = false;
    this.menuOn = true;
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
  
    this.roleService.loginModal = false;
  }

  
  modalTrue(e) {
    e.preventDefault(); 
  
    this.roleService.loginModal = true;
  }



}
