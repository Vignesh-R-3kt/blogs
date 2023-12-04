import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from 'src/app/services/google-auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loaderState: boolean = false;

  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.getLoaderState().subscribe((res: boolean) => {
      this.loaderState = res;
    })
  }
}
