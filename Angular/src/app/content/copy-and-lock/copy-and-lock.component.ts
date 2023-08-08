import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-copy-and-lock',
  templateUrl: './copy-and-lock.component.html',
  styleUrls: ['./copy-and-lock.component.scss']
})
export class CopyAndLockComponent {

  lockCtrl = false;
  copyText = ''

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }


  ngOnInit() {
    this.lockChange();
  }

  lockChange() {
    // 鎖滑鼠右鍵
    this.document.addEventListener('contextmenu', (event) => {
      if (this.lockCtrl) {
        event.preventDefault()
      }
    }, !this.lockCtrl);
  }

  copyLog(event: string) {
    console.log(event);


  }
}
