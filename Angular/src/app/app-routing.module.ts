import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SIDEBAR_ROUTING } from './enum/sidebar-enum';

// component
import { GetIPAddressComponent } from './content/get-ipaddress/get-ipaddress.component';
import { CopyAndLockComponent } from './content/copy-and-lock/copy-and-lock.component';
import { PdfViewerComponent } from './content/pdf-viewer/pdf-viewer.component';
import { MovingDivComponent } from './content/moving-div/moving-div.component';


const routes: Routes = [
  { path: SIDEBAR_ROUTING.GET_IP_ADDRESS, component: GetIPAddressComponent },
  { path: SIDEBAR_ROUTING.COPY_AND_LOCK, component: CopyAndLockComponent },
  { path: SIDEBAR_ROUTING.PDF_VIEWER, component: PdfViewerComponent },
  { path: SIDEBAR_ROUTING.MOVING_DIV, component: MovingDivComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
