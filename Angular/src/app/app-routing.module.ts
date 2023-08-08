import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SIDEBAR_ROUTING } from './enum/sidebar-enum';

// component
import { GetIPAddressComponent } from './content/get-ipaddress/get-ipaddress.component';


const routes: Routes = [
  { path: SIDEBAR_ROUTING.GET_IP_ADDRESS, component: GetIPAddressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
