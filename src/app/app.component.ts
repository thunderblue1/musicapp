import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
  }
  title = 'My Music Collection';
  version = "1.0";
  displayArtistList() {
    this.router.navigate(['list-artists'],{queryParams: {data: new Date()}})
  }
  displayVersion() {
    alert(this.version);
  }
}
