import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubredditService } from '../services/subreddit.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  public post: any = null;
  public postExist: boolean;

  constructor(
    private route: ActivatedRoute,
    private subredditService: SubredditService) {


    this.route.params.subscribe(params => {
      this.subredditService.getPost(params.subreddit).subscribe(res => {
        if (res && res.data.children.length === 1) {
          this.postExist = true;
          this.post = res.data.children[0].data;
          console.log(this.post.title);
        }
      }, err => {
        this.postExist = false;
      })
    });
  }

  ngOnInit() {
  }

}
