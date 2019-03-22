import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resurety';

ce = false
cg = false

  toggle = (opt) => {
    if(opt == "ce"){
      this.ce = true
      this.cg = false
    }else{
      this.ce = false
      this.cg = true
    }
  }
}


