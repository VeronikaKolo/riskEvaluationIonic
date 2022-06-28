import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Injectable, ɵɵresolveBody } from '@angular/core';
import { Directory, Encoding, Filesystem, FilesystemDirectory } from '@capacitor/filesystem';


import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class ExportPDFService {

  pdfObj = null;

 
 constructor( public fileOpener:FileOpener) {}

 pdfDownload(data){
 
console.log(data);
   const docDef = {
     pageSize:'A2',
     pageOrientation: 'landscape',
     content: [
       {
         style: 'tableExample',
         table: {
           body: [
             ['Nom du poste','Secteur', 'Nombre de personnes concernées', 'Participants à l\'évalusation des risques'],
             [data.name,data.secteur, data.number, this.personnes(data)]
           ]
         }
       },
    this.buildTable(data)
     
         
     ],
     styles: {
       header: {
         fontSize: 18,
         bold: true,
         margin: [0, 0, 0, 10]
       },
       subheader: {
         fontSize: 16,
         bold: true,
         margin: [0, 10, 0, 5]
       },
       tableExample: {
         margin: [0, 5, 0, 15]
       },
       tableHeader: {
         bold: true,
         fontSize: 13,
         color: 'black'
       },
           cell:{
               fillColor: '#F9E79F',
           }
     },
     defaultStyle: {
       // alignment: 'justify'
     }
     
   }
   //this.pdfObj = pdfMake.createPdf(docDef).download();
   this.pdfObj= pdfMake.createPdf(docDef)
   this.pdfObj.getBase64( async(data) => {
    var pdfBase64 = data;
    console.log(pdfBase64);
    const fileName = 'Evaluation_des_Risques.pdf';
   try{
    let path=fileName;
    const result= await Filesystem.writeFile({
      path,
      data:data,
      directory:Directory.Documents,
      recursive:true
    });
    this.fileOpener.open(`${result.uri}`,'application/pdf');
   }
    catch(e)
    {
      console.error('Unable to write',e);
    }
  });
 }
  buildTable(data: any) {
    var body = [];

    body.push([
    { text:'Risque' ,style:'cell'},
                  { text:'N°' ,style:'cell'},
                  { text:'Mode de travail',style:'cell'},
                  { text:'Description succinte de la tâche, procédé, installation',style:'cell'},
                  { text:'Dommages HSE',style:'cell'},
                  { text:'Estimation du risque',style:'cell'},
                  { text:'Les moyens de maîtrise sont-ils suffisants ?',style:'cell'},
                  { text:'Si les moyens de maitrise sont jugés insuffisants, on pondère les MM ?',style:'cell'},
                  { text:'Si non, actions correctives',style:'cell'},
                  { text:'Catégorie',style:'cell'},
                  { text:'Numéro lié au DUERP',style:'cell'},
                  { text:'N : Normal D : Dégradé M : Maintenance',style:'cell'},
                  { text:'Décrire la tâche prescrite, de l\'activité',style:'cell'},
                  { text:'Type de blessure ou atteinte à l\'environnement (douleur, fracture,pollution, brulure…) ',style:'cell'},
                  { text:'Fréquence Comptage ',style:'cell'},
                  { text:'Fréquence',style:'cell'},
                  { text:'Gravité',style:'cell'},
                  { text:'Gravité comptage',style:'cell'},
                  { text:'Moyens de maîtrise technique',style:'cell'},
                  { text:'Moyens de maîtrise organisationnel',style:'cell'},
                  { text:'Moyens de maîtrise humain',style:'cell'},
                  { text:'Maitrise du risque',style:'cell'},
                  { text:'Risque résiduel',style:'cell'},
                  { text:'OUI / NON',style:'cell'},
                  { text:'MM pondéré',style:'cell'},
                  { text:'Risque pondéré',style:'cell'},
                  { text:'Actions correctives',style:'cell'}]);
            

                  for(var i=0;i<data.risks.length;i++)
                  {
                   var risk=data.risks[i];
                   console.log(risk)
                    body.push([ 
                     {text: risk.name}, 
                     {text: risk.id},
                     {text:risk.work},
                    {text:risk.description},
                     {text:risk.dommage},
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     {text:risk.vigilance},
                     '',
                     '',
                     {text:risk.frequency.name},
                     {text:risk.frequency.value},
                     {text:risk.gravity.name},
                     {text:risk.gravity.value},
                     {text:risk.maitrise.technique},
                     {text:risk.maitrise.organisationnel},
                     {text:risk.maitrise.humain},
                     {text:risk.maitrisenumber},
                     '',
                     '',
                     '',
                     '',
                     ''
                   ]);
               
                  }
                  return {
                    table: {
                        headerRows: 1,
                        body: body
                    }
                };
  }

 personnes(data) {
   let personne="";
   var i=0;
   for( i=0;i<data.personne.length-1;i++)
   {
     personne+= data.personne[i].name +", "
   }
   personne+= data.personne[i].name 
   return personne;
 }


}
