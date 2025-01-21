import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external-redirect',
  templateUrl: './external-redirect.component.html',
  styleUrls: ['./external-redirect.component.scss']
})
export class ExternalRedirectComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    //console.log("Replace with your external URL");
    window.location.href = 'https://caposgt.com/online-store/onestore/home'; // Replace with your external URL
  }

}
