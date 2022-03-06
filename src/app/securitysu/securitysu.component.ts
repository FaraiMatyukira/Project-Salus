import { Component, OnInit } from '@angular/core';
import { SalusloginService } from '../saluslogin.service';
import { Router } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators } from "@angular/forms"

@Component({
  selector: 'app-securitysu',
  templateUrl: './securitysu.component.html',
  styleUrls: ['./securitysu.component.css']
})
export class SecuritysuComponent implements OnInit {
  public wait = false;
  public signupForm : FormGroup;
  public payload:any;
  public error_message ="";
  public titleAlert2 :string ="Please enter in an password that is 8 charaters long"
  public titleAlert1 :string ="This field is required"
  constructor(private log :SalusloginService,private router: Router,private fb: FormBuilder) {
    this.signupForm = fb.group({
      "name": ['', Validators.required],
      "surname": ['', Validators.required],
      "id_number": ['', Validators.required],
      "date_of_birth": ['', Validators.required],
      "petrol_sector": ['', Validators.required],
      "position": ['', Validators.required],
      "staffnum": ['',Validators.required],
      "email": ['', Validators.email],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(12)])],
        "passwordconfirm": ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(12)])],
      "cnr": ['',Validators.required],
      "address": ['',Validators.required],
      "city": ['',Validators.required],
      "pcode": ['',Validators.required],
      "validate": ''
    })

   
  }


  ngOnInit(): void {
  }
  password_check(password_1:any,password_2:any){
    let final_password;
    if (password_2 == password_1){
      final_password = password_2
      return {"responce":1,"password":final_password}
    }
    else{
      return {"responce":0}
    }
  }
  setValues(post:any){
    this.wait = true;
    let checked_password =this.password_check(post.password,post.passwordconfirm)
    if (checked_password["responce"] ==0){
      this.wait =false
      this.error_message = "Passwords dont match"

    }
    else{

    this.payload ={
      "data":{
                "name":post.name,
                "surname":post.surname,
                "id_number":post.id_number,
                "date_of_birth":post.date_of_birth,
                "email":post.email,
                "phone_number":post.cnr,
                "address":post.address,
                "city":post.city,
                "pcode":post.pcode,
                "password":checked_password["responce"],
                "staff_number":post.staffnum,
                "position":post.position,
                "petrol_sector":post.petrol_sector,
      }
    
    
    }
    let session_payload = {"name":post.name,"surname":post.surname,"staff_number":post.staffnum}
    localStorage.setItem('user_profile',JSON.stringify(session_payload))
    this.log.SecuritySignUp(this.payload)
        .subscribe(
          (data)=>{
            this.wait=false
            if (data["message"]=="succeessful")
            {
              this.router.navigate(["/securitydash"])
            }
          }
        )
    
  
}
  }
}
