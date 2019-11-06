import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() eachComment: any;
  public eachCommentHTML:string;
  constructor() { }

  ngOnInit() {
    this.eachCommentHTML = this.htmlDecode(this.eachComment.data.body_html);
  }
  htmlDecode(rawHTML: string) {
    var doc = new DOMParser().parseFromString(rawHTML, "text/html");
    return doc.documentElement.textContent;
  }
}
