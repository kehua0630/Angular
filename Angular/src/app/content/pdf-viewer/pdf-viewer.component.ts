import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  @Output() totalPage = new EventEmitter<number>();
  @Output() currentPage = new EventEmitter<number>();
  @Output() isFinishSetPage = new EventEmitter<Observable<boolean>>();

  @Input() mercPdfFullUrl = 'https://www.orimi.com/pdf-test.pdf';
  @Input() originalSize = false;
  @ViewChild('pdfViewer') pdfElement: ElementRef;


  pageValue = 1;
  zoom = 1;
  rotateDeg = 0;

  // 拖曳
  mouseDown = false;
  position = {
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0
  };
  constructor() { }

  ngOnInit(): void {
    this.currentPage.emit(this.pageValue);
  }

  nextClick(): void {
    this.pageValue = this.pageValue + 1;
    this.currentPage.emit(this.pageValue);
  }

  backClick(): void {
    if (this.pageValue > 1) {
      this.pageValue = this.pageValue - 1;
      this.currentPage.emit(this.pageValue);
    }
  }

  setPageValue(page: number): void {
    this.pageValue = page;
    this.isFinishSetPage.emit(of(true));
  }

  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.totalPage.emit(pdf.numPages);
  }

  onZoomClick(zoomType: ZoomType): void {
    switch (zoomType) {
      case ZoomType.in:
        this.zoom += 0.1;
        break;
      case ZoomType.out:
        this.zoom -= 0.1;
        break;
      default:
        break;
    }
  }

  /** PDF旋轉 */
  onRotateClick(): void {
    this.rotateDeg += 90;
    if (this.rotateDeg >= 360) {
      this.rotateDeg = 0;
    }
  }

  /**
   * 滑鼠按下函數，當滑鼠按下時執行該函數
   */
  startDragging(e: any, flag: any, el: any): void {
    this.mouseDown = true;
    console.log(el);
    this.position.startX = e.pageX - el.offsetLeft;
    this.position.startY = e.pageY - el.offsetTop;
    this.position.scrollLeft = el.scrollLeft;
    this.position.scrollTop = el.scrollTop;
  }

  stopDragging(e: any, flag: any): void {
    this.mouseDown = false;
  }

  moveEvent(e: any, el: any): void {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }

    const x = e.pageX - el.offsetLeft;
    const y = e.pageY - el.offsetTop;
    const scrollX = x - this.position.startX;
    const scrollY = y - this.position.startY;
    el.scrollLeft = this.position.scrollLeft - scrollX;
    el.scrollTop = this.position.scrollTop - scrollY;
  }
}

export enum ZoomType {
  in = 'in',
  out = 'out'
}
