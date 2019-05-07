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

  constructor(public roleService: RoleService, private http: HttpClient) { }

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

  createTopic(e) {
    e.preventDefault(); 
    let comment = e.target.elements[0].value;
    
    
    console.log(comment);
    console.log(this.roleService.token);
    if(comment.length > 8) {
    fetch(`${APIURL}/comments/`, {
      method: 'POST',
      body: JSON.stringify(
        {
          "description": comment,
          "username": this.roleService.name
          
          }
      ),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.roleService.token
      })
    })
    .then((res) => e.target.elements[0].value = "" )
    .then((res) => this.ngOnInit() )
  } else{
    window.alert("Topic must be longer then eight characters");
  }
} 

delete(e) {
  e.preventDefault();
  console.log('delete');
  var delID = e.target.elements[0].id;
  var token = this.roleService.token;
  console.log(token);
  console.log(delID);

  fetch(`${APIURL}/conversation/${delID}`, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: token
    })
  })
    .then((res) => this.ngOnInit() )
  console.log("delete")
}
}
