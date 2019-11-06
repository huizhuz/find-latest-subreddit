import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {
  private shortcuts:Array<any> = [];
  private loading:boolean = true;
  private showShortcuts:boolean = false;

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
