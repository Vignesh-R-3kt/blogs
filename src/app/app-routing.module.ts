import { Authguard } from './shared/authguard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { NewBlogComponent } from './components/new-blog/new-blog.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [Authguard], children: [
      { path: '', redirectTo: 'blogs', pathMatch: 'full' },
      { path: 'blogs', component: BlogsComponent },
      { path: 'new-blog', component: NewBlogComponent },
      { path: 'blog-details/:id', component: BlogDetailsComponent },
      { path: '**', redirectTo: 'blogs' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
