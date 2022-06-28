import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CriticPage } from '../critic/critic.page';
import { ExportExcelService } from '../export-excel-service.service';
import {ExportPDFService} from '../export-pdf.service'

@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.page.html',
  styleUrls: ['./synthese.page.scss'],
})

export class SynthesePage implements OnInit {

  data:any;
  risk:any;
  riskselected:any;
  currentRisk = {
    id: 0,
    name: '',
    work: '',
    dommage:'',
    dommagesautres:'',
    description:'',
    frequency:
    {
      name:'',
      value:1,
    },
    gravity:
    {
      name:'',
      value:1,
    },
    vigilance: [],
    maitrise:
    {
      technique: [],
      organisationnel: [],
      humain: [],
      autre: []
    },
    maitrisenumber:0
  }
  riskArray:any;
  index: any;
  constructor(private route: ActivatedRoute,private http: HttpClient,public ete: ExportExcelService,public modalController: ModalController,private alert:AlertController, public pdf:ExportPDFService) { 
    this.route.queryParams.subscribe(params => {
       
      this.data =JSON.parse( params["data"]);
      
  console.log(this.data.risks);
  });
  if (localStorage.getItem('listofrisks') == null) {
    this.getData();
  }
  else {
    this.riskArray = JSON.parse(localStorage.getItem('listofrisks'));
  }

}

getData() {
  this.http.get('../../assets/data/risk.json')
    .subscribe(data => {
      localStorage.setItem('listofrisks', JSON.stringify(data['riskItems']))
      this.riskArray = localStorage.getItem('listofrisks');
    }, (rej) => { console.error("Could not load local data", rej) });
}

  
  selected()
  {
    this.riskselected=true;
    console.log(this.risk);
  }

  exportToExcel()
  {
    
   // this.ete.testExport(this.data);
    this.pdf.pdfDownload(this.data);
  }
  ngOnInit() {
    this.riskselected=false;
  }
  async deleteRisk()
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
          }
        }, {
          text: 'Oui',
          handler:async (data) => {
            this.riskselected=false;
            this.data.risks = this.data.risks.filter(obj => obj !== this.risk);
          }
        }
      ]
    });
    
    alert.present();
  }
  addRisk()
  { 
    this.presentAlertRisks();
  }
  async presentAlertRisks() {
    let radio_options = [];
    for (let i = 0; i < this.riskArray.length; ++i) {
      radio_options.push({
        type: 'radio',
        label: this.riskArray[i].name,
        value: this.riskArray[i].index,
        checked: i === 0
      });
    }
    setTimeout(async () => {
      let alert = await this.alert.create({
        header: 'Risque',
        inputs: radio_options,
        backdropDismiss: false,
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'Retour',
            cssClass: 'secondary',
            handler: () => {
              
            }
          }, {
            text: 'Ok',
            handler: async (data) => {
              this.index = data;
               
              this.currentRisk.id = this.riskArray[data].id;
              this.currentRisk.name = this.riskArray[data].name
              this.currentRisk.vigilance = this.riskArray[this.index].vigilance
              this.presentWork();
            }
          }
        ]
      });
      alert.present();
    });
  }
  async alertTechnique() {
    let options = [];
    for (let i = 0; i < this.riskArray[this.index].maitrise.technique.length; ++i) {
      options.push({
        type: 'checkbox',
        label: this.riskArray[this.index].maitrise.technique[i],
        value: this.riskArray[this.index].maitrise.technique[i],
        checked: false
      });
    }
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Technique',
      backdropDismiss: false,
      inputs: options,
      buttons: [
        {
          text: 'Retour',
          role: '',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentAlertCritic();
          }
        },
         
        {
          text: 'Ok',
          handler: (data) => {
            this.currentRisk.maitrise.technique = data;
            this.askMaitriceTechniqueAutre();
          }
        }
      ]
    });
    await alert.present();
  }
  async alertTechniqueAutres() {
    let options = [];
    for (let i = 0; i < this.risk[this.index].maitrise.technique.length; ++i) {
      options.push({
        type: 'checkbox',
        label: this.risk[this.index].maitrise.technique[i],
        value: this.risk[this.index].maitrise.technique[i],
        checked: false
      });
    }
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Technique',
      backdropDismiss: false,
      inputs: options,
      buttons: [
        {
          text: 'Retour',
          role: '',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentAlertCritic();
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.currentRisk.maitrise.technique = data;
            this.alertOrganisationnel();
          }
        }
      ]
    });
    await alert.present();
  }
  async alertOrganisationnel() {
    let options = [];
    for (let i = 0; i < this.riskArray[this.index].maitrise.organisationnel.length; ++i) {
      options.push({
        type: 'checkbox',
        label: this.riskArray[this.index].maitrise.organisationnel[i],
        value: this.riskArray[this.index].maitrise.organisationnel[i],
        checked: false
      });
    }
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'Organisationnel',
      inputs: options,
      buttons: [
        {
          text: 'Retour',
          role: '',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentAlertCritic();
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.currentRisk.maitrise.organisationnel = data;
            this.askMaitriceOrganisationelleAutre();
          }
        }
      ]
    });
    await alert.present();
  }
  async alertHumain() {
    let options = [];
    var i=0;
    for ( i = 0; i < this.riskArray[this.index].maitrise.humain.length; ++i) {
      options.push({
        type: 'checkbox',
        label: this.riskArray[this.index].maitrise.humain[i],
        value: this.riskArray[this.index].maitrise.humain[i],
        checked: false
      });
    }

    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'Humain',
      inputs: options,
      
      buttons: [
        {
          text: 'Retour',
          role: '',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }
        ,{
          text: 'Ok',
          handler: (data) => {
            this.currentRisk.maitrise.organisationnel = data;
            this.askMaitriceHumainAutre();
          }
        }
      ]
    });
    await alert.present();
  }
  async presentMaitrise() {
    this.currentRisk.maitrisenumber = this.calculateMaitrise() * this.currentRisk.frequency.value * this.currentRisk.gravity.value;

              this.data.risks.push(this.currentRisk);
              var newcurrentRisk = {
                id: 0,
                name: '',
                work: '',
                dommage:'',
                dommagesautres:'',
                description:'',
                frequency:
                {
                  name:'',
                  value:1,
                },
                gravity:
                {
                  name:'',
                  value:1,
                },
                vigilance: [],
                maitrise:
                {
                  technique: [],
                  organisationnel: [],
                  humain: [],
                  autre: []
                },
                maitrisenumber:0,
              }
              this.currentRisk = newcurrentRisk;
              this.presentOption();
        
  }
  calculateMaitrise() {
    if (this.currentRisk.maitrise.technique.length == 0 && this.currentRisk.maitrise.humain.length == 0 && this.currentRisk.maitrise.organisationnel.length == 0)
      return 4;

    let matriseTechnique = true, maitriseOrganisation = true, maitriseHumain = true;


    if (this.riskArray[this.index].maitrise.technique.length != 0) {
      matriseTechnique = this.currentRisk.maitrise.technique.length > 0;
    }
    if (this.riskArray[this.index].maitrise.organisationnel.length != 0) {
      maitriseOrganisation = this.currentRisk.maitrise.organisationnel.length > 0;
    }
    if (this.riskArray[this.index].maitrise.humain.length != 0) {
      maitriseHumain = this.currentRisk.maitrise.humain.length > 0;
    }

    if (matriseTechnique && maitriseHumain && maitriseOrganisation)
      return 1;
    if (matriseTechnique && maitriseHumain || matriseTechnique && maitriseOrganisation || maitriseOrganisation && maitriseHumain) {
      return 2;
    }
    if (maitriseHumain || matriseTechnique || maitriseOrganisation)
      return 3;

  }
  async presentOption() {

    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'CHANTIER EvRP',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Terminer',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.save();

          }
        }, {
          text: 'Ajouter un risque',
          handler: (data) => {

            this.presentAlertRisks();
          }
        }
      ]
    });
    await alert.present();
  }
  async presentOption2() {

    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'CHANTIER EvRP',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Retour',
          role: '',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Ajouter un risque',
          handler: (data) => {
            this.presentWork();
          }
        }
      ]
    });
    await alert.present();
  }
  alertMaitrise() {
    if (this.riskArray[this.index].maitrise.technique.length != 0) {
      this.alertTechnique();
    }
    else {
      if (this.riskArray[this.index].maitrise.organisationnel.length != 0) {
        this.alertOrganisationnel();
      }
      else {
          this.alertHumain();
        
      }
    }
  }


  async presentDommagesAutres() {
    let alert = await this.alert.create({
      header: 'Autres dommages HSE',
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      inputs: [
        {
          name: 'dommagesautres',
          type: 'text',
          placeholder: ' ',
        },
      ],
      buttons: [
         {
          text: 'Suivant',
          handler: async (data) => {
            this.currentRisk.dommagesautres = data;
            this.presentAlertCritic();
          }
        }
      ]
    });

    alert.present();
  }
  async DommagesAsk()
  {
    let alert = await this.alert.create({
      header: 'Autres dommages HSE ?',
      backdropDismiss: false,
      buttons: [
        {
          text:'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Oui',
          handler:async () => {
            this.presentDommagesAutres();
          }
        }
      ]
    });
    
    alert.present();
  }
  async presentMaitriceTechniqueAutre() {
    let alert = await this.alert.create({
      header: 'Autre maîtrise technique',
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      inputs: [
        {
          name: 'techniqueautres',
          type: 'text',
          placeholder: ' ',
        },
      ],
      buttons: [
         {
          text: 'Suivant',
          handler: async (data) => {
            this.currentRisk.maitrise.technique.push(data);
            this.alertOrganisationnel();
          }
        }
      ]
    });

    alert.present();
  }
  async askMaitriceTechniqueAutre()
  {
    let alert = await this.alert.create({
      header: 'Autre maîtrise technique ?',
      backdropDismiss: false,
      buttons: [
        {
          text:'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertOrganisationnel();
            
          }
        }, {
          text: 'Oui',
          handler:async () => {
            this.presentMaitriceTechniqueAutre();
          }
        }
      ]
    });
    
    alert.present();
  }
  async presentMaitriceOrganisationelleAutre() {
    let alert = await this.alert.create({
      header: 'Autre maîtrise organisationelle',
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      inputs: [
        {
          name: 'organisationelleeautres',
          type: 'text',
          placeholder: ' ',
        },
      ],
      buttons: [
         {
          text: 'Suivant',
          handler: async (data) => {
            this.currentRisk.maitrise.organisationnel.push(data);
            this.alertOrganisationnel();
          }
        }
      ]
    });

    alert.present();
  }
  async askMaitriceOrganisationelleAutre()
  {
    let alert = await this.alert.create({
      header: 'Autre maîtrise organisationelle ?',
      backdropDismiss: false,
      buttons: [
        {
          text:'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertHumain();
          }
        }, {
          text: 'Oui',
          handler:async () => {
            this.presentMaitriceOrganisationelleAutre();
          }
        }
      ]
    });
    
    alert.present();
  }
  async presentMaitriceHumainAutre() {
    let alert = await this.alert.create({
      header: 'Autre maîtrise organisationelle',
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      inputs: [
        {
          name: 'Humaineautres',
          type: 'text',
          placeholder: ' ',
        },
      ],
      buttons: [
        {
          text: 'Suivant',
          handler: async (data) => {
            this.currentRisk.maitrise.humain.push(data);
            this.presentMaitrise();
          }
        }
      ]
    });

    alert.present();
  }
  async askMaitriceHumainAutre()
  {
    let alert = await this.alert.create({
      header: 'Autre maîtrise humain ?',
      backdropDismiss: false,
      buttons: [
        {
          text:'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentMaitrise();
          }
        }, {
          text: 'Oui',
          handler:async () => {
            this.presentMaitriceHumainAutre();
          }
        }
      ]
    });
    
    alert.present();
  }

  async presentWork() {

    let alert = await this.alert.create({
      header: 'Mode de travail',
      backdropDismiss: false,
      inputs: [
        {
          type: 'radio',
          label: "Normal",
          value: "Normal",
        },
        {
          type: 'radio',
          label: "Dégradé",
          value: "Dégradé",
        }, {
          type: 'radio',
          label: "Maintenance",
          value: "Maintenance",
        }
      ],
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Retour',
          cssClass: 'secondary',
          handler: () => {
            this.presentAlertRisks();
          },
        }, 
        {
          text: 'Ok',
          handler: async (data) => {
            this.currentRisk.work = data;
            this.alertPoints();
          }
        }
      ]
    });
    alert.present();

  }
  
  async alertPoints() {
    var message = "";
    for (var i = 0; i < this.riskArray[this.index].vigilance.length; i++) {
      message += "-" + this.riskArray[this.index].vigilance[i] + "<br><br>"
    }
    const alert = await this.alert.create({
      cssClass: 'pointsClass',
      header: 'Points de vigilance',
      backdropDismiss: false,
      message: message,
      inputs: [
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description succinte de la tâche, procédé, installation ',
        },
      ],
      buttons: [
        {
          text: 'Retour',
          cssClass: 'secondary',
          handler: (blah) => {
            this.presentWork();
          }
        }, {
          text: 'Ok',
          handler: async(data) => {
            this.currentRisk.description=data;
            this.presentAlertDommage();
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertDommage() {

    const alert = await this.alert.create({
      cssClass: 'pointsClass',
      header: 'Dommages HSE ',
      backdropDismiss: false,
      inputs: [
        {
          type: 'radio',
          label: "Facture,Douleur,Blessure",
          value: "Facture,Douleur,Blessure",
        },
        {
          type: 'radio',
          label: "Coupure, plaie, piqûre",
          value: "Coupure, plaie, piqûre",
        },
        {
          type: 'radio',
          label: "Ecrasement, choc",
          value: "Ecrasement, choc",
        },
        {
          type: 'radio',
          label: "Electrisation, éléctrocution",
          value: "Electrisation, éléctrocution",
        },
        {
          type: 'radio',
          label: "Ecrasement",
          value: "Ecrasement",
        },
        {
          type: 'radio',
          label: "Brûlure",
          value: "Brûlure",
        },
        {
          type: 'radio',
          label: "Atteinte respiratoire",
          value: "Atteinte respiratoire",
        },
        {
          type: 'radio',
          label: "Affections cutanées,oculaires",
          value: "Affections cutanées,oculaires",
        },
        {
          type: 'radio',
          label: "Diminutions de l'acuité auditive,visuelle",
          value: "Diminutions de l'acuité auditive,visuelle",
        },
        {
          type: 'radio',
          label: "Décès",
          value: "Décès",
        },
        {
          type: 'radio',
          label: "Fatigue/Malaise",
          value: "Fatigue/Malaise",
        },
        {
          type: 'radio',
          label: "Dégats matérielles",
          value: "Fatigue/Malaise",
        },
      ],
      buttons: [
        {
          text: 'Retour',
          cssClass: 'secondary',
          handler: (blah) => {
            this.alertPoints();
          }
        },
         {
          text: 'Ok',
          handler: async (data) => {
            this.currentRisk.dommage = data;
            this.presentDommagesAutres();
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertCritic() {
    const modal = await this.modalController.create({
      component: CriticPage,
      cssClass: 'my-custom-class',
      componentProps: {
        risk: this.currentRisk
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        if(data['data']==null)
        {
          this.presentAlertDommage();
        }
        else
          {       
          this.currentRisk = data['data'];
          console.log(this.currentRisk);
          this.alertMaitrise();
        }
      });

    return await modal.present();
  }
  save() {
  
    var siteList = [];
    if (localStorage.getItem('listofsite') != null) {
      siteList = JSON.parse(localStorage.getItem('listofsite'));
    }
    siteList= siteList.filter(obj => obj !== this.data.risk.pop());
    siteList.push(this.data);
    localStorage.setItem('listofsite', JSON.stringify(siteList));

  }
}