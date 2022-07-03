import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.page.html',
  styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {

  risks: any[];
  newidriskid :any;
  constructor(private alert:AlertController,public navCtrl: NavController) { }

  ngOnInit() {
   this.risks =JSON.parse(localStorage.getItem("listofrisks"));
   if(localStorage.getItem("riskid")==null)
   {
    this.newidriskid=30;
   }
   else
   {
    this.newidriskid=JSON.parse(localStorage.getItem("riskid"));
   }
 
  }
  ngOnDestroy() {
    localStorage.setItem('riskid',this.newidriskid);
  }
  risk={
  id:0,
  name:'',
  vigilance: [],
  maitrise:
    {
        technique:[],
        organisationnel:[],
        humain:[ ],
        autres:[]
    }
  
  }

  async presentAlertRisks()
  {
    
  let alert = await this.alert.create({
    header: 'Risque',
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Nom du risque ',
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
        text: 'Suivant',
        handler:async (data) => {
        this.risk.name=data.name;
        console.log(this.newidriskid);
        this.risk.id=this.newidriskid;
        this.newidriskid++;
        this.vigilancePresent();
        }
      }
    ]
  });
  
  alert.present();
  }
  async vigilancePresent() {
    let alert = await this.alert.create({
      header: 'Points de vigilances',
      backdropDismiss: false,
      inputs: [
        {
          name: 'points',
          type: 'textarea',
          placeholder: 'Points de vigilances ',
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
          text: 'Suivant',
          handler:async (data) => {
          this.risk.vigilance=data.points
          this.presentAlertMoyensdeMaitrise();
          }
        }
      ]
    });
    
    alert.present();
  }
  async presentAlertMoyensdeMaitrise() {
    let alert = await this.alert.create({
      header: 'Moyens de maitrise technique',
      backdropDismiss: false,
      inputs: [
        {
          name: 'points',
          type: 'textarea',
          placeholder: '',
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
          text: 'Suivant',
          handler:async (data) => {
          this.risk.maitrise.technique=data.points
          this.presentAlertMoyensOrga();
          }
        }
      ]
    });
    
    alert.present();
}  
  async presentAlertMoyensOrga() {
  let alert = await this.alert.create({
    header: 'Moyens de maitrise organisationnels',
    inputs: [
      {
        name: 'points',
        type: 'textarea',
        placeholder: '',
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
        text: 'Suivant',
        handler:async (data) => {
        this.risk.maitrise.organisationnel=data.points
        this.presentAlertMoyensHumains();
        }
      }
    ]
  });
  
  alert.present();
  }
  async presentAlertMoyensHumains() {
    let alert = await this.alert.create({
      header: 'Moyens de maitrise humains',
      backdropDismiss: false,
      inputs: [
        {
          name: 'points',
          type: 'textarea',
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
          text: 'Suivant',
          handler:async (data) => {
          this.risk.maitrise.humain=data.points
     
          this.risks.push(this.risk);
          localStorage.setItem('listofrisks',JSON.stringify(this.risks));
          }
        }
      ]
    });
    
    alert.present();
  }
  async presentDelete()
  {

    
    let radio_options = [];
    for(let i=0;i<this.risks.length;++i){
       radio_options.push({
        type: 'radio',
        label : this.risks[i].name,
        value : this.risks[i],
       checked : i === 0
      });
    }
  
    let alert = await this.alert.create({
      header: 'Risque',
      inputs: radio_options,
      backdropDismiss: false,
      buttons: [
        {
          text:'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler:async (data) => {
            this.delete(data);
          }
        }
      ]
    });
    
    alert.present();
  }
  async delete(risk)
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
            this.risks = this.risks.filter(obj => obj !== risk);
            localStorage.setItem('listofrisks',JSON.stringify(this.risks));
          }
        }
      ]
    });
    
    alert.present();
  }

  async presentModify()
  {
        
    let radio_options = [];
    for(let i=0;i<this.risks.length;++i){
       radio_options.push({
        type: 'radio',
        label : this.risks[i].name,
        value : this.risks[i],
       checked : i === 0
      });
    }
  
    let alert = await this.alert.create({
      header: 'Risque',
      inputs: radio_options,
      backdropDismiss: false,
      buttons: [
        {
          text:'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler:async (data) => {
            this.modify(data);
          }
        }
      ]
    });
    
    alert.present();
  }

  modify(risk)
  {
    console.log(risk);
    let navigationExtras: NavigationExtras = {
      queryParams: {
          data:JSON.stringify(risk)
      }
  };
  this.navCtrl.navigateForward(['risk'], navigationExtras);
  }
  async presentLimit()
  {
    let alert = await this.alert.create({
      header: 'Seuil de criticité',
      backdropDismiss: false,
      inputs: [
        {
          name: 'limit',
          type: 'number',
          placeholder: 'Seuil',
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
          text: 'Suivant',
          handler:async (data) => {
            if(data.limit!="")
              localStorage.setItem('limit',data.limit);
          }
        }
      ]
    });    
    alert.present();
  }
  addRisk()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          data:JSON.stringify(this.risk)
      }
  };
  this.navCtrl.navigateForward(['risk'], navigationExtras);
}
}
