import { Component, OnInit } from '@angular/core';
import { faFrownOpen } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-preview-none',
  templateUrl: './preview-none.component.html',
  styleUrls: ['./preview-none.component.css']
})
export class PreviewNoneComponent implements OnInit {
  public faFrownOpen = faFrownOpen;
  constructor() { }

  ngOnInit() {
  }

}
