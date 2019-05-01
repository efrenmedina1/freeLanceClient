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
  public activeMonth = 0;
  public activeDay = "";
  public modal = false;
  public modalComment = "";
  public modalEvents= [];
  public p = 5;

  constructor(private roleService: RoleService, private http: HttpClient) { }

  ngOnInit() {
    this.roleService.getToken()

    this.getMonths()
    .subscribe(data => 
    //   console.log(data.sort(function(a, b){
    //     return a.id-b.id
    // }))
     { this.month = data.sort(function(a, b){
        return a.id-b.id
      })
      console.log(this.month)}
      );
 
  }

  getMonths() : any {
    return this.http.get(`${APIURL}/monthlist/`);
}

getEvents() : any {
  return this.http.get(`${APIURL}/event/${this.activeMonth}/${this.activeDay}`);
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
  this.modalComment = "";
  this.modalEvents= [];
  
}

commentEdit(e) {
  e.preventDefault(); 
  
  this.activeMonth = e.path[3].id;
  this.activeDay = e.path[0].id;
  this.modal = true

  console.log(e)

  
    fetch(`${APIURL}/eventlist/${this.activeMonth}/${this.activeDay}`,{
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.roleService.token
      })  
    })

   .then(response =>{  response.json().then(data => {
      let event = data.sort(function(a, b){
        return a.id-b.id
      });
      this.modalEvents = event;
      console.log(this.modalEvents)
    });
  })
  
  }

  createEvent(e) {
    e.preventDefault(); 
    
    let header = e.target.elements[0].value;
    let message = e.target.elements[1].value;
    let month = this.activeMonth;
    let day = this.activeDay;

    console.log(e.target.elements.value);
  
    fetch(`${APIURL}/event/`, {
      method: 'POST',
      body: JSON.stringify(
        {
          "header": header,
          "message": message,
          "month": month,
          "day": day,
          
          }
      ),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.roleService.token
      })
    })
    .then((res) => this.ngOnInit() )
    .then((res) => this.modal = false )
  }

}
