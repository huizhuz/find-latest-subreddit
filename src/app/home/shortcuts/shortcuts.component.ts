import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {
  public shortcuts:Array<any> = [];
  public loading:boolean = true;
  public showShortcuts:boolean = false;

  constructor(
    private router: Router,
    private subredditService: SubredditService) { }

  ngOnInit() {
    this.subredditService.getPopular().subscribe(res=>{
      this.shortcuts = res.data.children;
      this.loading = false;
      this.showShortcuts = true;
    }, err=>{
      this.loading = false
    })
  }

  onRedirectToSubreddit(shortcut: string){
    this.router.navigate(['display', shortcut]);
  }

}
