import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RoleService } from "../role.service";
import { APIURL } from '../../environments/environment.prod';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router, public roleService: RoleService) { }
  public signup = false;
  public login = true;

  ngOnInit() {
    this.roleService.getToken()
  }

  signUp(e) {
    e.preventDefault(); 
    console.log(e);
    var user = e.target.elements[0].value;
    var email = user.toLowerCase();
    var password = e.target.elements[1].value;
    var first = e.target.elements[2].value;
    var last = e.target.elements[3].value;
  console.log(email, password);
  if(email.length > 5 && password.length > 5) {
  fetch(`${APIURL}/user`, {
  method: 'POST',
  body: JSON.stringify({
    "user": {
    email: email,
    password: password,
    first: first,
    last: last,
    role: "user"
    }
  }),
  headers: new Headers({
    'Content-Type': 'application/json'
  })
})
.then(
  (response) => response.json()
  .catch((err) => console.log(err))
)

.then((json) => {
if(json == undefined) {
  console.log("user alrdy exist")
  window.alert( "User already exist. Please choose another email to signup" );
} else {
  console.log(json.user)
  this.roleService.role = json.user.role
  this.roleService.email = json.user.email
  this.roleService.token = json.sessionToken
  this.roleService.name = json.user.first

  this.roleService.loginModal = false
  window.alert("Logged in");
} 
}
)
.then(response =>  sessionStorage.setItem('role', this.roleService.role) )
.then(response =>  sessionStorage.setItem('email', this.roleService.email) )
.then(response =>  sessionStorage.setItem('token', this.roleService.token) )
.then(response =>  sessionStorage.setItem('name', this.roleService.name) )
.then(response =>  this.ngOnInit() )
.then(response =>  this.roleService.loginModal = false )
} else{
  window.alert("email and password must be longer then 5 characters");
}
}

loginUser(e) {
  e.preventDefault(); 
  console.log(e);
  var user = e.target.elements[0].value;
  var email = user.toLowerCase();
  var password = e.target.elements[1].value;
console.log(email, password);

fetch(`${APIURL}/user/login`, {
method: 'POST',
body: JSON.stringify(
  {
  "user" : {
  email: email,
  password: password
    }
  }
),
headers: new Headers({
  'Content-Type': 'application/json'
})
})
// res.json()
.then(response =>  response.json() )
.then(json =>  { 
  if(json.error == "failed to authenticate") {
  window.alert( "User does not exist. Please sign up" );
  console.log(json);
} else if(json.error == "You failed to login") {
  window.alert( "Incorrect Password. Contact admin to reset password" );
  console.log(json)
} else {
  console.log(json)
  this.roleService.role = json.user.role
  this.roleService.email = json.user.email
  this.roleService.token = json.sessionToken
  this.roleService.name = json.user.first

  this.roleService.loginModal = false
  window.alert("Logged in");
}
} )


.then(response =>  sessionStorage.setItem('role', this.roleService.role) )
.then(response =>  sessionStorage.setItem('email', this.roleService.email) )
.then(response =>  sessionStorage.setItem('token', this.roleService.token) )
.then(response =>  sessionStorage.setItem('name', this.roleService.name) )
.then(response =>  this.ngOnInit() )
.then(response =>  this.roleService.loginModal = false )



}

signupToggle(e) {
  if( this.signup == true ) {
    this.signup = false
    this.login = true
  } else {
    this.signup = true
    this.login = false
  }
}

}
