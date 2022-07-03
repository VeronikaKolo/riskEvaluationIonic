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
      {text:'EVALUATION DES RISQUES', style:'header'},
    this.buildTableHeader(data),
    this.buildSubTableHeader(),
    this.buildTable(data)
     
         
     ],
     styles: {
       header: {
         fontSize: 30,
         fillColor:'yellow',
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
         fontSize: 16,
         color: 'black',
         margin: [0, 0, 30, 0]
       },
           cell:{
               fillColor: '#F9E79F',
               width: 20
           },
        red:{
          color: 'red',
        }
     },
     defaultStyle: {
       // alignment: 'justify'
     }
     
   }
   this.pdfObj = pdfMake.createPdf(docDef).download();
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
  buildSubTableHeader() {
    var body = [];
  
    body.push([
                  { text:'N°' ,style:'cell'},
                  { text:'Risque' ,style:'cell'},
                  { text:'Mode de travail',style:'cell'},
                  { text:'Description succinte de la tâche, procédé, installation',style:'cell'},
                  { text:'Dommages HSE',style:'cell'},
                  { text:'Estimation du risque',style:'cell',colSpan: 3},{},{},
                  { text:'MAITRISE du risque HSE, Mesure de prévention existante',style:'cell',colSpan: 4},{},{},{},
                  { text:'Les moyens de maîtrise sont-ils suffisants ?',style:'cell',colSpan:4},{},{},{},
                  { text:'Si non, actions correctives',style:'cell'}]);
                  return {
                    table: {
                      widths: [40,150,75,250,100,75,75,40,75,85,75,45,45,45,45,45,100],
                        headerRows: 1,
                        body: body
                    }
                };
  }
  buildTableHeader(data: any) {
    var body = [];
    let d = new Date();
    let date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
   body.push([
    {text:'DATE:', style:'tableHeader'},
    {text: date , style:'tableHeader'},
    {text: 'PILOTES: \n' + this.personnes(data), style:'tableHeader'},
    {text: 'POSTE', style:'tableHeader'},
    {text: data.name, style:'tableHeader'},
   ])
   return {
    table: {
        headerRows: 1,
        widths: [150,150,150,150,793],
        body: body
    }
};

  }
  buildTable(data: any) {
    var body = [];
  
   
                  body.push([
                  { text:'Numéro lié au DUERP',style:'cell'},
                  { text:'Catégorie',style:'cell'},
                  { text:'N : Normal \n D : Dégradé \n M : Maintenance',style:'cell'},
                  { text:'Décrire la tâche prescrite, de l\'activité',style:'cell'},
                  { text:'Type de blessure ou atteinte à l\'environnement',style:'cell'},
                  { text:'Fréquence',style:'cell'},
                  { text:'Gravité',style:'cell'},
                  { text:'Risque brut',style:'cell'},
                  { text:'Technique',style:'cell'},
                  { text:'Organisationnel',style:'cell'},
                  { text:'Humain',style:'cell'},
                  { text:'Maitrise',style:'cell'},
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
                      {text: risk.id},
                     {text: risk.name}, 
                     {text:risk.work},
                    {text:risk.description},
                     {text:risk.dommage},
                     {text:risk.frequency.name},
                     {text:risk.gravity.name},
                     {text:risk.gravity.value*risk.frequency.value},
                     {text:risk.maitrise.technique},
                     {text:risk.maitrise.organisationnel},
                     {text:risk.maitrise.humain},
                     {text:risk.calculateMaitrise},
                     {text:risk.maitrisenumber},
                     {text:risk.maitrisechoice},
                     {text: this.maitrisePondere(risk.maitrisepondere)},
                     {text: this.riskPondere(risk.riskpondere)},
                     {text:risk.action , style:'red'},
                   ]);
               
                  }
                  return {
                    table: {
                        headerRows: 1,
                        widths: [40,150,75,250,100,75,75,40,75,85,75,45,45,45,45,45,100],
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

 riskPondere(maitriseponderee) {
  if (maitriseponderee==0)
    return '';
  
   return maitriseponderee;
 }
 maitrisePondere(maitriseponderee) {
  if (maitriseponderee==0)
    return '';
  
   return maitriseponderee;
 }
 
 
 formatText(textArray)
 {
   var text='';
   for(var i=0;i<textArray.length-1;i++)
   {
     text += "- "+ textArray[i]+ '\n';
   }
   text += "- "+ textArray[i];
 }
 
}
