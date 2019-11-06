import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {
  private shortcuts:Array<string> = [
    "AskReddit",
    "books",
    "DIY",
    "food",
    "funny",
    "jokes",
    "programmer",
    "television",
    "tifu",
    "videos",
    "worldnews",
  ]
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRedirectToSubreddit(shortcut: string){
    this.router.navigate(['display', shortcut]);
  }

}
