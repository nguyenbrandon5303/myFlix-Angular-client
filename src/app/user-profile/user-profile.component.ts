// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser();
  }

  editProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      localStorage.setItem('username', result.Username)
      this.snackBar.open(result, 'Updated user details.', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
    });
  }

}
