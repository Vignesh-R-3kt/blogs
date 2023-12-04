import { LoaderService } from 'src/app/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogsList: any;

  constructor(private api: ApiService, private loader: LoaderService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loader.show();
    this.api.fetchAllBlogs().subscribe((res: any) => {
      this.blogsList = res.reverse();
      this.loader.close();
    }, (err: any) => {
      this.loader.close();
      this.snackbar.open('Something went wrong, please try again', 'close', {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: 'right'
      })
    })
  }
}
