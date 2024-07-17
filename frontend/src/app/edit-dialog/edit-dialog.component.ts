import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { FormBuilder, Validators , FormGroup} from '@angular/forms';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  signupForm:FormGroup
constructor(public dialogref:MatDialogRef<EditDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private apiService:ApiService,
  private formbuilder: FormBuilder,)
  {
    this.signupForm = this.formbuilder.group({
      fname: [data.st.fname, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lname: [data.st.lname, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: [data.st.email, [Validators.required, Validators.email]],
      address: [data.st.address, [Validators.required]],
      CGPA: [data.st.CGPA, [Validators.required]]
    });
}

onNoClick(): void {
  this.dialogref.close();
}

onSubmit(): void {
  if (this.signupForm.valid) {
    this.apiService.editstudent(this.data.st._id, this.signupForm.value).subscribe(response => {
      this.dialogref.close(response);
    });
  }
}

}
