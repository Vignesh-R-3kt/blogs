import { LoaderService } from 'src/app/services/loader.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent {

  blogForm: any;
  attachmentValue: any;
  userInfo: any;

  constructor(private fb: FormBuilder, private http: ApiService, private loader: LoaderService, private router: Router, private snackbar: MatSnackBar) {
    this.blogForm = fb.group({
      title: ["", [Validators.required, Validators.minLength(10)]],
      description: ["", [Validators.required, Validators.minLength(30)]],
      file: ["", Validators.required]
    });

    const user = JSON.parse(sessionStorage.getItem('userInfo') || "");
    this.userInfo = user.additionalUserInfo.profile;
    console.log(this.userInfo);

  }

  fetchFormValue(): void {
    this.loader.show();
    const formValues = {
      title: this.blogForm.value.title.trim(),
      description: this.blogForm.value.description.trim(),
      file: this.attachmentValue,
      userName: this.userInfo.name,
      userId: this.userInfo.id
    };

    const date = new Date();
    const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('description', formValues.description);
    formData.append('imageUrl', formValues.file);
    formData.append('date', today);
    formData.append('time', time);
    // formData.append('userName', formValues.userName);
    // formData.append('userId', formValues.userId);

    this.http.postNewBlog(formData).subscribe((res: any) => {
      this.loader.close();
      this.router.navigate(['/home/blogs']);
      this.snackbar.open('New blog added successfully', 'ok', {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      })
    }, (err: any) => {
      this.loader.close();
      this.snackbar.open('Something went wrong, please try again', 'close', {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: 'right'
      })
    })
  }

  updateFileValue(e: any): void {
    this.attachmentValue = e.target.files[0];
  }

  removeWhiteSpace(e: any) {
    e.target.value = e.target.value.replaceAll("  ", " ");
  }
}
