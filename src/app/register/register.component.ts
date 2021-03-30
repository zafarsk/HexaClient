import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor( private memberService: MembersService,
    private toastr: ToastrService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }
  initializeForm(){
    this.registerForm = this.fb.group({      
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  compareControlString(controlName: string): ValidatorFn{
    return ( control: AbstractControl) =>{
      return control?.value === control?.parent?.controls[controlName].value 
              ? null : {isFailed: true};
    };
  }

  register(){
    console.log(this.registerForm.value);
    this.memberService.register(this.registerForm.value).subscribe(response =>{
      //this.router.navigateByUrl("/members");
    },err=>{
      console.log(err);
      this.validationErrors = err;
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  public toFormControl(point: AbstractControl): AbstractControl {
    return point;
  }

}
