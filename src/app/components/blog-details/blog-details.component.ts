import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog: any;

  constructor(private http: ApiService, private route: ActivatedRoute, private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.http.fetchSingleItem(id).subscribe((res: any) => {
      this.blog = res;
      this.loader.close();
    })
  }
}
