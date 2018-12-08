import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './posts.models';


@Injectable({providedIn: 'root'})
export class PostsService {
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

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  delete(uuid: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${uuid}`).pipe(
      map(() => uuid)
    );
  }
}
