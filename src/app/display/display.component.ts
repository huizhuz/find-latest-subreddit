import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubredditService } from '../services/subreddit.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  public post: any = null;
  public comments: Array<any> = [];
  public postExist: boolean = false;
  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subredditService: SubredditService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  onRefreshClicked() {
    this.loading = true;
    this.comments = [];
    this.postExist = false;
    this.fetchData();
  }

  onGoHomeClicked() {
    this.router.navigate(['home']);
  }

  fetchData() {
    this.route.params.subscribe(params => {
      this.subredditService.getPost(params.subreddit).subscribe(res => {
        this.loading = false;
        if (res && res.data.children.length === 1) {
          this.post = res.data.children[0].data;
          this.postExist = true;
          // get all comments
          if (this.post.num_comments === 0) { // no comment available
            this.comments = [];
          } else {
            this.subredditService.getComments(params.subreddit, this.post.id).subscribe(res => {
              if (res && res[1].data.children.length > 0) {
                this.comments = res[1].data.children;
                console.log(this.comments)
              }
            }, err => {
              //console.log(err)
            })
          }
        }
      }, err => {
        this.loading = false;
        this.postExist = false;
      })
    });
  }
}
