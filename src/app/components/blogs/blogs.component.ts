import { LoaderService } from 'src/app/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogsList: any;

  constructor(private api: ApiService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.show();
    this.api.fetchAllBlogs().subscribe((res: any) => {
      this.blogsList = res.reverse();
      this.loader.close();
    })
  }

}
