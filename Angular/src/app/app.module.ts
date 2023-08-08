import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// component
import { AppComponent } from './app.component';
import { GetIPAddressComponent } from './content/get-ipaddress/get-ipaddress.component';
import { CopyAndLockComponent } from './content/copy-and-lock/copy-and-lock.component';
// directive
import { CopyClipboardDirective } from './directive/copy-clipboard.directive';

@NgModule({
  declarations: [
    AppComponent,
    GetIPAddressComponent,
    CopyAndLockComponent,
    CopyClipboardDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    CopyClipboardDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
