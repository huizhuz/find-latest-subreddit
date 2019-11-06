import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  
  constructor(private http: HttpClient) { }
  public getPost(subreddit: string): Observable<any>{
    return this.http.get(`https://www.reddit.com/r/${subreddit}/new.json?limit=1`);
  }
  public getComments(subreddit: any, post_id: string): Observable<any> {
    return this.http.get(`https://www.reddit.com/r/${subreddit}/comments/${post_id}.json`)
  }
}
