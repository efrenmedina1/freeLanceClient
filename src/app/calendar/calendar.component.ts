import { Component, OnInit } from '@angular/core';
import {RoleService } from "../role.service"
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../environments/environment.prod';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public month = [];
  public activeMonth = "";
  public activeDay = "";
  public modal = false;
  p:any

  constructor(private roleService: RoleService, private http: HttpClient) { }

  ngOnInit() {
    this.getMonths()
    .subscribe(data => 
    //   console.log(data.sort(function(a, b){
    //     return a.id-b.id
    // }))
      this.month = data.sort(function(a, b){
        return a.id-b.id
      })
      // console.log(this.products)
      );
 
  }

  getMonths() : any {
    return this.http.get(`${APIURL}/monthlist/`);
}

commentEdit(e) {
  e.preventDefault(); 
  
  this.activeMonth = e.path[3].id;
  this.activeDay = e.path[0].id;
  this.modal = true

  console.log(this.activeMonth, this.activeDay, e)
  
}

monthUpdate = (e) => {
  let comment = e.target.elements[0].value;
  


  

  fetch(`${APIURL}/month/${this.activeMonth}`, {
    method: 'PUT',
    body: JSON.stringify(
      {
        activeDay: comment,
      
        }
    ),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.roleService.token
    })
  })
  .then(response => console.log(response))
  .then((res) => this.ngOnInit() )
  .then((res) => window.alert("Updated Profile") )
  
  
}

modalFalse(e) {
  e.preventDefault(); 

  this.modal = false;
  
}

}
