import { LoaderService } from 'src/app/services/loader.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent {

  blogForm: any;
  attachmentValue: any;

  constructor(private fb: FormBuilder, private http: ApiService, private loader: LoaderService, private router: Router) {
    this.blogForm = fb.group({
      title: ["", [Validators.required, Validators.minLength(10)]],
      description: ["", [Validators.required, Validators.minLength(30)]],
      file: ["", Validators.required]
    })
  }

  fetchFormValue(): void {
    this.loader.show();
    const formValues = {
      title: this.blogForm.value.title,
      description: this.blogForm.value.description,
      file: this.attachmentValue
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

    this.http.postNewBlog(formData).subscribe((res: any) => {
      this.loader.close();
      this.router.navigate(['/home/blogs'])
    })
  }

  updateFileValue(e: any): void {
    this.attachmentValue = e.target.files[0];
  }
}
