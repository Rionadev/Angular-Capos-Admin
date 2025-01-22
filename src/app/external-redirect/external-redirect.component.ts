import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-external-redirect',
  templateUrl: './external-redirect.component.html',
  styleUrls: ['./external-redirect.component.scss']
})
export class ExternalRedirectComponent implements OnInit {

  constructor(
    @Inject('APP_CONFIG') private config: any, 
  ) {}

  ngOnInit(): void {
    console.log("Replace with your external URL");
    window.location.href = `https://caposgt.com/online-store/${this.config.private_web_address}/home`; // Replace with your external URL
  }

}
