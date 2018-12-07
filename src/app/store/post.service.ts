import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models';

@Injectable({providedIn: 'root'})
export class PostService {
  private baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${post.uuid}`, post);
  }

  get(uuid: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${uuid}`);
  }
}
