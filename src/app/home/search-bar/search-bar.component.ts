import { Component, OnInit, ElementRef } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  public faSearch = faSearch;
  public searchKeyword: string = "";

  constructor( 
    private router: Router,
    private el: ElementRef
    ) { }

  ngOnInit() {
    // Bind keydown event to catch when user presses enter
    this.el.nativeElement.addEventListener('keydown', (e)=>{
      var key = e.which || e.keyCode;
      if (key === 13){
        this.onSubmit();
      }
    })
  }
  
  onSubmit() {
    if(this.searchKeyword){
      this.router.navigate(['display', this.searchKeyword]);
    }
  }
}
