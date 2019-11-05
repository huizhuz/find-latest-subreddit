import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  
  constructor(private http: HttpClient) { }
  public getPost(subreddit: string){
    return this.http.get(`https://www.reddit.com/r/${subreddit}/new.json?limit=1`)
  }
}
