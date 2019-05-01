import { Component, OnInit } from '@angular/core';
import {RoleService } from "../role.service"
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private roleService: RoleService, public http: HttpClient) { }

  ngOnInit() {
    this.roleService.getToken()
  }

}
