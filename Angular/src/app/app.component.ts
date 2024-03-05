import { SIDEBAR_ENUM, SIDEBAR_ROUTING } from './enum/sidebar-enum';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular';

  sidebarItems = [
    {
      name: SIDEBAR_ENUM.GET_IP_ADDRESS,
      router: SIDEBAR_ROUTING.GET_IP_ADDRESS
    },
    {
      name: SIDEBAR_ENUM.COPY_AND_LOCK,
      router: SIDEBAR_ROUTING.COPY_AND_LOCK
    },
    // {
    //   name: SIDEBAR_ENUM.PDF_VIEWER,
    //   router: SIDEBAR_ROUTING.PDF_VIEWER
    // },
    {
      name: SIDEBAR_ENUM.MOVING_DIV,
      router: SIDEBAR_ROUTING.MOVING_DIV
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.redirectTo(this.sidebarItems[0].router);
  }


  redirectTo(router: string) {
    if (router) {
      this.router.navigateByUrl(router);
    }
  }
}
