import { Component, OnInit } from '@angular/core';
import { SalusloginService } from '../saluslogin.service';
import { Router } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators } from "@angular/forms"

@Component({
  selector: 'app-domesticsu',
  templateUrl: './domesticsu.component.html',
  styleUrls: ['./domesticsu.component.css']
})
export class DomesticsuComponent implements OnInit {
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
      "staffnum": ['',Validators.required],
      "job_title":['',Validators.required],
      "email": ['', Validators.email],
      "password": ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      "passwordconfirm": ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
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
                "password":post.passwordconfirm,
                "staff_number":post.staffnum,
                "job_title":post.job_title,
      }
    
    
    }
    let session_payload = {"name":post.name,"surname":post.surname,"staff_number":post.staffnum}
    localStorage.setItem('user_profile',JSON.stringify(session_payload))
    this.log.DomesticSignUp(this.payload)
        .subscribe(
          (data)=>{
            this.wait=false
            if (data["message"]=="succeessful")
            {
              this.router.navigate(["/domesticdash"])
            }
          }
        )
    
  
}
}
