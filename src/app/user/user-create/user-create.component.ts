import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';
import { FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  createForm: FormGroup;


  unamePattern = "^[a-zA-Z.-]{1,50}$";
  uphonePattern = "^[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userdata;
  cfdata;
  cfcode;
  /*
    allusers;
    editform:any={};
    model:any={};
    regisformat:any = {}
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    id;
    */

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private service: UsersService) {


  }

  ngOnInit() {
    this.createForm = new FormGroup({
      Firstname: new FormControl('', [Validators.required, Validators.pattern(this.unamePattern)]),
      Lastname: new FormControl('', [Validators.required, Validators.pattern(this.unamePattern)]),
      Phonenumber: new FormControl('', [Validators.required, Validators.pattern(this.uphonePattern)]),
      Email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.createForm.controls[controlName].hasError(errorName);
  }

  createpost(createFormValue) {
    if (this.createForm.valid) {
      this.userdata = createFormValue;
      console.log(this.userdata);
      this.cfdata = {
        firstname: this.userdata.Firstname,
        lastname: this.userdata.Lastname,
        phonenumber: this.userdata.Phonenumber,
        email: this.userdata.Email
      };
      this.service.create(this.cfdata).subscribe(res => {
        console.log('dataput', res);
        this.cfcode = res['resultCode'];
        console.log('CodeRef', this.cfcode);
        if (this.cfcode !== 200) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: res['error']['message']
          });
        } else {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your account has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
        }
      });

    }

  }


  onNoClick(): void {
    this.dialogRef.close();
  }



  /*
  registeruser(firstName,lastName,phoneNumber, email) {
   this.regisformat = {
     firstname: firstName,
     lastname: lastName,
     phonenumber: phoneNumber,
     email: email
   }
   console.log('Input Data',this.regisformat)
   this.service.create(this.regisformat).subscribe(res => {
     console.log('cf',res['resultCode'])
     this.cfcode = res['resultCode']
     console.log('CodeRef' ,this.cfcode)
     if ( this.cfcode !== 200){
       Swal.fire({
         type: 'error',
         title: 'Oops...',
         text: res['error']['message']
       })
     }else{
       Swal.fire({
         position: 'top-end',
         type: 'success',
         title: 'Your work has been saved',
         showConfirmButton: false,
         timer: 1500
       })
       this.onNoClick()
       window.location.reload()
     }
   })
 }
 */



}
