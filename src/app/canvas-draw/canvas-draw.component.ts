import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-canvas-draw',
  templateUrl: './canvas-draw.component.html',
  styleUrls: ['./canvas-draw.component.scss'],
})

export class CanvasDrawComponent  {

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;
 
  selectedColor = '#9e2956';
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
 
  drawing = false;
  lineWidth = 5;
 
  constructor(private plt: Platform,  private toastCtrl: ToastController) {}
 
  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 200;
  }
 
  startDrawing(ev) {
    this.drawing = true;
    var canvasPosition = this.canvasElement.getBoundingClientRect();
 
    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }
 
  endDrawing() {
    this.drawing = false;
  }
  moved(ev) {
    if (!this.drawing) return;
   
    var canvasPosition = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');
   
    let currentX = ev.pageX - canvasPosition.x;
    let currentY = ev.pageY - canvasPosition.y;
   
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;
   
    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
   
    ctx.stroke();
   
    this.saveX = currentX;
    this.saveY = currentY;
  }
   
  exportCanvasImage() {
  }
 
  selectColor(color) {
    this.selectedColor = color;
  }
 
  setBackground() {
    var background = new Image();
    background.src = './assets/code.png';
    let ctx = this.canvasElement.getContext('2d');
 
    background.onload = () => {
      ctx.drawImage(background,0,0, this.canvasElement.width, this.canvasElement.height);   
    }
  }
}