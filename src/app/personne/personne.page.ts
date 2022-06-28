import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform, ToastController } from '@ionic/angular';

import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.page.html',
  styleUrls: ['./personne.page.scss'],
})

export class PersonnePage {
  @ViewChild('canvas', { static: true }) signaturePadElement;
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;
  name;
  personnes:any[]=new Array();
  @Input()site: any;

  constructor(private elementRef: ElementRef,private modal: ModalController) { }

  ngOnInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.init();
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - window.innerHeight*0.3;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(56,128,255)';
  }

  save(): void {
    const img = this.signaturePad.toDataURL();
    let personne = { name:this.name,signature:img};
    this.personnes.push(personne);
    this.name="";
    this.clear();
 
    
  }
  next()
  {
   this.save();
    this.site.personne=this.personnes;
    this.modal.dismiss(this.site);  
  }
  back()
  {
    this.site.personne=null;
    this.modal.dismiss(this.site);  
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }


}
