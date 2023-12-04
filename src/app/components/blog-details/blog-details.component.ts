import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog: any;

  constructor(private http: ApiService, private route: ActivatedRoute, private loader: LoaderService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loader.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.http.fetchSingleItem(id).subscribe((res: any) => {
      this.blog = res;
      this.blog.time = this.convertTime(res.time);
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

  convertTime(data: any): string {
    const time = data.split(':');
    let text;

    if (time[0] <= 12) {
      if (time[0] === 12) {
        text = 'PM';
      } else {
        text = "AM"
      }
    } else {
      const hour = time[0] - 12;
      const formattedhour = hour.toString().padStart(2, '0');
      time.splice(0, 1, formattedhour);
      text = "PM";
    }
    const forMattedTime = `${time.join(':')} ${text}`;
    return forMattedTime;
  }
}
