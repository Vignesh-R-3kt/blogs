import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL: string = 'https://blobstorage-production.up.railway.app/api/admin';

  constructor(private api: HttpClient) { }

  fetchAllBlogs() {
    return this.api.get(this.baseURL);
  }

  postNewBlog(data: any) {
    return this.api.post(this.baseURL, data);
  }

  fetchSingleItem(id: any) {
    return this.api.get(`${this.baseURL}/post?id=${id}`)
  }

  uploadNewPost(data: any) {
    return this.api.post(this.baseURL, data);
  }
}

