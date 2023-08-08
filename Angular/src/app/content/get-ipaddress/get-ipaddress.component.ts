import { Component } from '@angular/core';
import { HTTPRequestService, HTTP_METHOD } from 'src/app/service/httpRequest.service';

@Component({
  selector: 'app-get-ipaddress',
  templateUrl: './get-ipaddress.component.html',
  styleUrls: ['./get-ipaddress.component.scss']
})
export class GetIPAddressComponent {

  url = 'https://jsonip.com';
  ipAddr = '';

  constructor(
    private httpReqSvc: HTTPRequestService
  ) { }


  ngOnInit() {
    this.getIpAddress();
  }

  getIpAddress() {
    this.httpReqSvc.request(HTTP_METHOD.GET, null, this.url).subscribe(result => {
      this.ipAddr = result.ip;
    });
  }

}
