import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  siteList: any;

  constructor(public navCtrl: NavController) { 
    this.siteList=JSON.parse(localStorage.getItem('listofsite'));
    console.log(this.siteList);
  }

  ngOnInit() {
  }
displaySite(site)
{
  let navigationExtras: NavigationExtras = {
    queryParams: {
        data:JSON.stringify(site)
    }
 };
 this.navCtrl.navigateForward(['synthese'], navigationExtras);
}
deleteSite(site)
{
  var siteList = [];
  if (localStorage.getItem('listofsite') != null) {
    siteList = JSON.parse(localStorage.getItem('listofsite'));
  }
  siteList= siteList.filter(obj => obj.name !== site.name);
  localStorage.setItem('listofsite', JSON.stringify(siteList));
  this.siteList=siteList;
  
}
}
