import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
    let test = document.getElementById("test");
    function testclick() {
      console.log("click");
    }
  }


  ngOnInit(): void {
  }

}
