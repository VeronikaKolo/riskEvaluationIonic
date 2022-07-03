import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.page.html',
  styleUrls: ['./risk.page.scss'],
})

export class RiskPage implements OnInit {
  
  data:any;
  constructor(private route: ActivatedRoute,private alert:AlertController,public navCtrl: NavController) { 
    this.route.queryParams.subscribe(params => {
      if(JSON.parse( params["data"])!=null)
      {
        this.data =JSON.parse( params["data"]);
      }
      console.log(this.data);     
  });
}

  ngOnInit() {
  }

  async confirm()
  {
    let alert = await this.alert.create({
      header: 'Etes vous sûr ?',
      backdropDismiss: false,
      buttons: [
        {
          text:'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Oui',
          handler:async (data) => {
            this.addRisk();
          }
        }
      ]
    });
    
    alert.present();
  }
addRisk()
{
  let table =JSON.parse(localStorage.getItem("listofrisks"));
  table.push(this.data);
  localStorage.setItem('listofrisks',JSON.stringify(table));
}
  async addMoyenMaitriseTechnique()
{
  let alert = await this.alert.create({
    header: 'Moyens de maîtrise technique',
    backdropDismiss: false,
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: ' ',
      },
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler:async (data) => {
          this.data.maitrise.technique.push(data.name);
        }
      }
    ]
  });
  
  alert.present();
}
  async addMoyenMaitriseOrganisationnel()
{
  let alert = await this.alert.create({
    header: 'Moyens de maîtrise organisationnel',
    backdropDismiss: false,
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: ' ',
      },
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler:async (data) => {
          this.data.maitrise.organisationnel.push(data.name);
        }
      }
    ]
  });
  
  alert.present();
}
  async addMoyenMaitriseHumain()
{
  let alert = await this.alert.create({
    header: 'Moyens de maîtrise humain',
    backdropDismiss: false,
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: ' ',
      },
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler:async (data) => {
          this.data.maitrise.humain.push(data.name);
        }
      }
    ]
  });
  
  alert.present();
}
  async addMaitriseMoyenAutres()
{
  let alert = await this.alert.create({
    header: 'Moyens de maîtrise autre',
    backdropDismiss: false,
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: ' ',
      },
    ],
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler:async (data) => {
          this.data.maitrise.autres.push(data.name);
        }
      }
    ]
  });
  
  alert.present();
}

deleteMoyenMaitrise(nom,table,element)
{
 table = table.filter(obj => obj !== element);
 this.data.maitrise[nom]=table;
}
}
