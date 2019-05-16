import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserPictureComponent } from '../user-picture/user-picture.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  allusers;
  editform:any={};
  model:any={};
  regisformat:any = {}
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  id;
  cfcode;





  constructor(private service: UsersService,private dialog: MatDialog) {
    console.log ('Test Services')
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(res => {
      console.log('dataGetAll',res)
      this.allusers = res['data']
      console.log('value-reciv' , this.allusers)
    })
  }

  viewid(id){
    console.log(id,'logid')
    this.service.getbyID(id).subscribe(resid => {
      console.log('viewdetail-ID',resid)
      this.editform = resid['data']
      console.log('ADD-form-ViewID', this.editform)
    })
  }


    deleteuser(id){
      console.log('deletetrigger',id)
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false,
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((did) => {
        console.log('id-CF',did)
        if (did.value == true) {
          this.service.delete(id).subscribe(res => {
            // console.log('codeCF',res['resultCode'])
            this.cfcode = res['resultCode']
           console.log('delete-CF',this.cfcode)
           if (this.cfcode !== 200 ) {
             console.log(res['error']['message'])
            Swal.fire({
              type: 'error',
              title: 'CITICAL ERROR !!!! ',
              text: res['error']['message']
            })
          } else {
            this.getAll();
          }
          })
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          // Read more about handling dismissals
          did.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }


    openCreateDialog() {
      const dialogref =
      this.dialog.open(UserCreateComponent, {
           width: '450px',
           data: { header: 'Create User' }
      });console.log(this.openCreateDialog)
      dialogref.afterClosed().subscribe(() => {
        this.getAll();
      })
  }
    openEditDialog(id,firstname,lastname,phonenumber,email){
      console.log(id,'mat-id')
      const dialogref =
      this.dialog.open(UserEditComponent, {
          width: '450px',
          data: { header: 'Edit View', id: id, Firstname: firstname, Lastname: lastname,
           Phonenumber: phonenumber, Email: email }
      })
      dialogref.afterClosed().subscribe(() => {
        this.getAll()
      })
    }
      openUploadDialog() {
        const dialogref =
        this.dialog.open(UserPictureComponent, {
            width: '450px',
            data: { header: 'Upload'}
        })
      }


// do not use
  exit(){
    window.location.reload()
  }
}


  /*
    edituser(firstName,lastName,phoneNumber, email,id) {
      this.editform = {
        firstname: firstName,
        lastname: lastName,
        phonenumber: phoneNumber,
        email: email
      }
      console.log('Input Data',this.editform)
      this.service.update(id,this.editform).subscribe(res =>{
        console.log('Confirm-data-edit',res)
        this.getAll();
        this.cfcode =res['resultcode']
        if (this.cfcode != 500){
          alert('success')
        }else{
          alert('Error Try Again')
        }
      })
  }
  */

      /*.subscribe(res => {
        console.log('delete-detail',res['data'])
        this.getAll();
        this.cfcode =res['resultcode']
        if (this.cfcode != 500){
          alert('success')
        }else{
          alert('Error Try Again')
        }
      })*/


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
          alert('Error Plese Insert Data')
        }else{
          alert('Success !! ')
          this.getAll();
        }
      })
    }
    */