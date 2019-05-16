import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../shared/users.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.css']
})
export class UserPictureComponent implements OnInit {
  selectedFile: File = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<UserPictureComponent>,
  private service: UsersService,
  private http: HttpClient,) { }


  ngOnInit() {
  }

  onFileSelected(event){
    this.selectedFile = <File> event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('', fd)
      .subscribe(res => {
        console.log(res);
      });

  }
}

