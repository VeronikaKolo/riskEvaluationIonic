import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-critic',
  templateUrl: './critic.page.html',
  styleUrls: ['./critic.page.scss'],
})
export class CriticPage implements OnInit {
  
  frequency: any;
  gravity:any;
  @Input()risk: any;
  tablefrequency= [{name:"En continu: 2 fois/jour",value:10},{name:"Fréquemment: 1 fois/jour",value:6},{name:"De temps en temps: 1 fois/semaine",value:3},{name:"Parfois: 1 à 2 fois/mois",value:2},{name:"Rarement: Quelques jours/an",value:1},{name:"Très rarement Moins d’une fois/an",value:0.5}];
  tablegravity= [{name:"Désastre (décès multiples) / MP irréversible",value:40},{name:"Dommage irréversible (amputation…) / MP irréversible ",value:15},{name:"AT déclaré avec arrêt > 1 jour / MP avec IPT mais reprise du travail",value:7},{name:"ATSA / MP réversible",value:4},{name:"AT bénin / Pas de MP",value:1}];
  tablegravity2= [{name:"Désastre Impact irréversible sur le long terme / Fuite accidentelle de produits dangereux / Déchets liquides (ISO)",value:40},{name:"Impact irréversible / Fuite accidentelle de produits dangereux / Déchets liquides (ISO)",value:15},{name:"Impact résersible à l'extérieur du site ou irréversible confiné au site / Fuite accidentelle de produits dangereux / Emission de Cov, bruit au voisinnage / Consommation énergie fossile / DIS",value:7},{name:"Impact réversible limité au site / Fuite accidentelle de produits chimiques peu dangereux / Consommation électrique, en circuit fermé / DIB / Bruit inférieur aux limites de propriété",value:4},{name:"Impact nul pour l'environnement / Produit sans caractéristiques dangereuses / Consommation d'énergie renouvelable / Déchets valorisables",value:1}];
  tablegravity3= [{name:"Produit trèx toxique, CMR / Désastre (décès multiples) / MP irréversible",value:40},{name:"Produit très toxique, CMR / Dommage irréversible (amputation…) / MP irréversible",value:15},{name:"Nocif, Toxicité aïgue, Inflammable / AT avec arrêt > 1 jour / MP avec IPT mais reprise du travail",value:7},{name:"Corrosif, Comburant / ATSA / MP réversible",value:4},{name:"Irritant, Toxicité spécifique (organe cible) / AT bénin / Pas de MP",value:1}];
  
  constructor(private modal: ModalController) { 
 
  
  }

  ngOnInit() {
    console.log(this.risk.id)
    this.risk.frequencylabel="";
    this.risk.frequency=1;
    this.risk.gravitylabel="";
    this.risk.gravity=1;
  }

  dismissModal()
  {
    let data=this.risk;
    
      this.modal.dismiss(data);    
  }
  back()
  {
    
    let data=null;
      this.modal.dismiss(data);    
  }
}
