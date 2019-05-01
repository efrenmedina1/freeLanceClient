import { Component, OnInit } from '@angular/core';
import {RoleService } from "../role.service"
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../environments/environment.prod';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private roleService: RoleService, private http: HttpClient) { }

  public conversation = [];
  public message = [];
  public activeConversation = 0;
  public displayMessage = false;

  ngOnInit() {
    this.roleService.getToken()

    this.getConversations()
    .subscribe(data => 
   
     { this.conversation = data.sort(function(a, b){
        return a.id-b.id
      })
      console.log(this.conversation)}
      );
  }

  
  getConversations() : any {
    return this.http.get(`${APIURL}/conversationlist/`);
}

getMessages(e) {
  e.preventDefault(); 
  
  console.log(e.toElement.id)

  let id = e.toElement.id
  this.activeConversation = id
  this.message = [];
  this.displayMessage = true

  
    fetch(`${APIURL}/messagelist/${id}`,{
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
      this.message = event;
      console.log(this.message)
    });
  })
  
  }

  createMessage(e) {
    e.preventDefault(); 
    
    let message = e.target.elements[0].value;
    console.log(message);
    console.log(this.roleService.token);
    if(message.length > 2) {
    fetch(`${APIURL}/message/`, {
      method: 'POST',
      body: JSON.stringify(
        {
          "message": message,
          "name": this.roleService.name,
          "conversationId": this.activeConversation
          
          }
      ),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.roleService.token
      })
    })
    .then((res) => e.target.elements[0].value = "" )
    .then((res) =>
    fetch(`${APIURL}/messagelist/${this.activeConversation}`,{
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
      this.message = event;
      console.log(this.message)
    });
  }) 
     )
  } else{
    window.alert("Please input a comment");
  }
  }
}
