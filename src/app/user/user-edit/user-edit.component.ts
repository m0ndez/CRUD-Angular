import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../shared/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  editForm : FormGroup;
  unamePattern = "^[a-zA-Z.-]{1,50}$";
  uphonePattern = "^[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userdata;
  cfdata;
  id;
  cfcode;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogref: MatDialogRef<UserEditComponent>,
    private service: UsersService) {

    }

  ngOnInit() {
    this.editForm = new FormGroup({
      Firstname: new FormControl('', [Validators.required, Validators.pattern(this.unamePattern)]),
      Lastname: new FormControl('', [Validators.required, Validators.pattern(this.unamePattern)]),
      Phonenumber: new FormControl('', [Validators.required, Validators.pattern(this.uphonePattern)]),
      Email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.editForm.controls[controlName].hasError(errorName)
  }

  editpost(id,editFormValue) {
    console.log(id,'sentid')
    if(this.editForm.valid){
      this.userdata = editFormValue;
      console.log(this.userdata)
      this.cfdata = {
        firstname: this.userdata.Firstname,
        lastname: this.userdata.Lastname,
        phonenumber: this.userdata.Phonenumber,
        email: this.userdata.Email
      }
    this.service.update(id,this.cfdata).subscribe(res => {
      console.log(res,'CF-Edit')
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
            title: 'Your datail has been updated',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogref.close();
        }
    });
    }
  }

  onNoClick(): void {
    this.dialogref.close();
  }


}
