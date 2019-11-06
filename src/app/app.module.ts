import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms' 
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { PreviewComponent } from './display/preview/preview.component';
import { PreviewNoneComponent } from './display/preview-none/preview-none.component';
import { CommentsComponent } from './display/preview/comments/comments.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { LoadingComponent } from './common/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    PreviewComponent,
    PreviewNoneComponent,
    CommentsComponent,
    HomeComponent,
    DisplayComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
