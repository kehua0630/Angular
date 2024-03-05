import { Component, OnInit, ElementRef, ViewChild, HostListener, Input } from '@angular/core';


@Component({
  selector: 'app-moving-div',
  templateUrl: './moving-div.component.html',
  styleUrls: ['./moving-div.component.scss']
})
export class MovingDivComponent implements OnInit {
  /** 進線視窗是否拖曳中 */
  isChatWindowMoving = false;
  /** 進線視窗縮放 */
  isChatWindowResizing = false;

  /** 拖曳視窗 */
  dx: any;
  dy: any;

  grabberX = 0;
  grabberY = 0;


  private chatModal: ElementRef;
  @ViewChild('chatModal') set chatModalContent(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.chatModal = content;
    }
  }

  private chatHeader: ElementRef;
  @ViewChild('chatHeader') set chatgHeaderContent(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.chatHeader = content;
    }
  }



  modalWidth = 1500;


  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      this.chatModal.nativeElement.style.left = '250px';
      this.chatModal.nativeElement.style.top = '30px';
      this.chatModal.nativeElement.style.height = '400px';
      this.chatModal.nativeElement.style.width = '400px';
    })
  }

  /**
   * 滑鼠按下函數，當滑鼠按下時執行該函數
   */
  mouseDown(event: any, action: string): void {
    console.log('mouseDown', event);
    // 獲得滑鼠的鍵值，0是滑鼠左鍵；1是滑鼠滾軸鍵；2是滑鼠右鍵
    if (event.button === 0) {
      if (action === 'move') {
        this.isChatWindowMoving = true;
        // 設定滑鼠樣式
        this.chatHeader.nativeElement.style.cursor = 'move';
        // 獲得滑鼠當前座標
        const x = event.x;
        const y = event.y;

        this.dx = x - parseInt(this.chatModal.nativeElement.style.left, 10);
        this.dy = y - parseInt(this.chatModal.nativeElement.style.top, 10);
      } else {
        this.isChatWindowResizing = true;
        this.grabberX = event.clientX;
        this.grabberY = event.clientY;
      }
    }
  }

  /**
   * 按下滑鼠後移動函數，當滑鼠移動是執行該函數，移動div
   */
  @HostListener('document:mousemove', ['$event'])
  mouseMove(event: any): void {
    if (this.chatModal && this.isChatWindowMoving) {
      // 獲得滑鼠當前移動的座標位置
      const x = event.x; // 滑鼠移動的x軸的座標
      const y = event.y; // 滑鼠移動的y軸的座標
      // 計算div移動後的left與top的距離
      // 使用當前座標減去滑鼠在div中的位置與div左邊與頂端的距離
      const left = x - this.dx;
      const top = y - this.dy;
      // 設定div新的座標位置
      this.chatModal.nativeElement.style.left = left + 'px';
      this.chatModal.nativeElement.style.top = top + 'px';

      console.log('modal new x::', left);
      console.log('modal new y::', top);
    } else if (this.chatModal && this.isChatWindowResizing) {
      const offsetX = event.clientX - this.grabberX;
      const offsetY = event.clientY - this.grabberY;
      this.resizer(offsetX, offsetY);
      this.grabberX = event.x;
      this.grabberY = event.y;

      console.log('modal new width::', offsetX);
      console.log('modal new height::', offsetY);
    }
  }

  /**
   * 滑鼠鬆開函數，當滑鼠鬆開時執行該函數
   */
  mouseUp(): void {
    this.dx = null;
    this.dy = null;
    this.isChatWindowResizing = false;
    this.isChatWindowMoving = false;
  }

  resizer(offsetX: number, offsetY: number): void {
    const width = parseInt(this.chatModal.nativeElement.style.width, 10) + offsetX;
    const height = parseInt(this.chatModal.nativeElement.style.height, 10) + offsetY;
    if (height < 200) {
      this.mouseUp();
      return;
    }

    if (width < 200) {
      this.mouseUp();
      return;
    }
    this.chatModal.nativeElement.style.width = width + 'px';
    this.chatModal.nativeElement.style.height = height + 'px';
    this.modalWidth = width * 0.4;
  }
}


