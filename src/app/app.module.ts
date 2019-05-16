import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UsersService } from './user/shared/users.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatNativeDateModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatOptionModule, MatSelectModule,
MatIconModule, MatTableModule, MatFormFieldModule,MatTooltipModule} from '@angular/material';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserPictureComponent } from './user/user-picture/user-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserPictureComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatTooltipModule



  ],
  providers: [UsersService],
  bootstrap: [AppComponent],
  entryComponents: [UserCreateComponent, UserEditComponent,UserPictureComponent]
})
export class AppModule { }
