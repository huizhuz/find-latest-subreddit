import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Url } from 'url';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() post: any;
  @Input() comments: Array<any>;

  @Output() goHomeClicked = new EventEmitter();
  @Output() refreshClicked = new EventEmitter();

  public faHome = faHome;
  public faSyncAlt = faSyncAlt;

  public faExternalLinkAlt = faExternalLinkAlt;
  public mediaExist: boolean = false;   //change
  public textContentExist: boolean = false;
  public textContentHTML: string;
  public outerLinkExist: boolean = false;
  public showComments: boolean = false;

  public mediaIsVideo: boolean = false;
  public mediaIsImage: boolean = false;
  public linkURL: Url;
  public videoURL: Url;
  public imageURL: Url;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.post.post_hint) {
      switch (this.post.post_hint) {
        case "image":
          this.mediaExist = true;
          this.mediaIsImage = true;
          this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.url);
          break;
        case "rich:video":
          this.mediaExist = true;
          this.mediaIsVideo = true;
          let tempURL: string = this.post.url;
          if (tempURL.includes('https://www.youtube.com')) {
            tempURL = tempURL.replace('watch?v=', 'embed/');
          } else if (tempURL.includes('https://youtu.be/')) {
            tempURL = tempURL.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
          }
          this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(tempURL);
          break;
        case "hosted:video":
          this.mediaExist = true;
          this.mediaIsVideo = true;
          this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.media.reddit_video.fallback_url);
          break;
        case "self":
          this.textContentExist = true;
          this.textContentHTML = this.htmlDecode(this.post.selftext_html);
          break;
        case "link":
          this.outerLinkExist = true;
          this.linkURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.url);
          // if (this.post.secure_media && this.post.secure_media.oembed) {
          //   this.mediaExist = true;
          //   this.mediaIsImage = true;
          //   this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.url);
          // }
          break;
      }
    } else if (this.post.selftext.length !== 0) {
      this.textContentExist = true;
      this.textContentHTML = this.htmlDecode(this.post.selftext_html);
    } else if (this.post.selftext.length === 0) {
      this.outerLinkExist = true;
      this.linkURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.url);
    }
  }

  openCommentDrawer() {
    if (this.post.num_comments !== 0) {
      this.showComments = !this.showComments;
    }
  }

  openImageInNewTab = () => {
    window.open(this.post.url, '_blank');
  }

  onGoHome() {
    this.goHomeClicked.emit();
  }

  onRefresh() {
    this.refreshClicked.emit();
  }

  htmlDecode(rawHTML: string) {
    var doc = new DOMParser().parseFromString(rawHTML, "text/html");
    return doc.documentElement.textContent;
  }
  
}
