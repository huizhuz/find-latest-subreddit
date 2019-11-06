import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Url } from 'url';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() post: any;
  @Input() comments: Array<any>;
  private faExternalLinkAlt = faExternalLinkAlt;
  private mediaExist: boolean = false;   //change
  private textContentExist: boolean = false;
  private outerLinkExist: boolean = false;
  private showComments: boolean = false;

  private mediaIsVideo: boolean = false;
  private mediaIsImage: boolean = false;
  private linkURL: Url;
  private videoURL: Url;
  private imageURL: Url;

  constructor(public sanitizer: DomSanitizer) {
  }
  
  ngOnInit() {
    console.log(this.comments);
    if (this.post.post_hint) {
      switch (this.post.post_hint) {
        case "self":
          this.textContentExist = true;
          break;
        case "link":
          this.outerLinkExist = true;
          this.linkURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.url);
          break;
        case "image":
          this.mediaExist = true;
          this.mediaIsImage = true;
          this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.url);
          break;
        case "rich:video":
          this.mediaExist = true;
          this.mediaIsVideo = true;
          let tempURL: string = this.post.url;
          if(tempURL.includes('https://www.youtube.com')){
            tempURL = tempURL.replace('watch?v=', 'embed/');
          } else if(tempURL.includes('https://youtu.be/')){
            tempURL = tempURL.replace('https://youtu.be/','https://www.youtube.com/embed/');
          }
          this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(tempURL);
          break;
        case "hosted:video":
          this.mediaExist = true;
          this.mediaIsVideo = true;
          this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.media.reddit_video.fallback_url);
          break;
      }
    } else if(this.post.selftext.length !== 0){
      this.textContentExist = true;
    } else if(this.post.selftext.length === 0){
      this.outerLinkExist = true;
      this.linkURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.url);
    }
  }

  openCommentDrawer(){
    if(this.post.num_comments !== 0){
      this.showComments = !this.showComments;
    }
  }
}
