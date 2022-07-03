
import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js'
import * as XLSX from 'xlsx'; 
import { Directory, Filesystem} from '@capacitor/filesystem';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  EXCEL_TYPE='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

  constructor(private file :File, private emailComposer:EmailComposer) { }
  
  testExport(excelData)
  {let title = excelData.title;
        const header = excelData.headers
        const data = excelData.risks;

        //Create a workbook with a worksheet
        let workbook = new Excel.Workbook();
        let worksheet = workbook.addWorksheet(data.name);
        worksheet.properties.defaultRowHeight = 40;
        worksheet.properties.defaultColWidth = 30;
        let dateLabel = worksheet.getCell('A1');
        dateLabel.value = "DATE :"
        dateLabel.font = {
          name: 'Calibri',
          size: 12,
          bold: true,
        }
        dateLabel.alignment = { vertical: 'middle', horizontal: 'center' }
    
        // Date
        worksheet.mergeCells('B1:C1');
        let d = new Date();
        let date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
        let dateCell = worksheet.getCell('B1');
        dateCell.value = date;
        dateCell.font = {
          name: 'Calibri',
          size: 12,
          bold: true,
        }
        dateCell.alignment = { vertical: 'middle', horizontal: 'center' }

        //Label Pilotes

        let piloteLabel = worksheet.getCell('D1');
        piloteLabel.value = "PILOTES :"
        piloteLabel.font = {
          name: 'Calibri',
          size: 12,
          bold: true,
        }
        piloteLabel.alignment = { vertical: 'middle', horizontal: 'center' }
    
     //Pilotes
     let pilote = worksheet.getCell('E1');
     let string="";
     for(let i =0; i<excelData.personne.length;i++)
     {
       string +=excelData.personne[i].name +" ";
     }
     pilote.value = string;
     pilote.font = {
       name: 'Calibri',
       size: 12,
       bold: true,
     }
     pilote.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true  }
 
        //Label poste

        let posteLabel = worksheet.getCell('F1');
        posteLabel.value = "POSTE :"
        posteLabel.font = {
          name: 'Calibri',
          size: 12,
          bold: true,
        }
        posteLabel.alignment = { vertical: 'middle', horizontal: 'center' }
    
     //Pilotes
     worksheet.mergeCells('G1:U1');
     let poste = worksheet.getCell('G1');
     poste.value = excelData.name;
     poste.font = {
       name: 'Calibri',
       size: 28,
       bold: true,
       color:{ argb: 'FF0000' }
     }
     poste.alignment = { vertical: 'middle', horizontal: 'center' }

       //Label poste
        worksheet.mergeCells('A2:U2');
        title = worksheet.getCell('A2');
        title.value = "EVALUATION DES RISQUES :"
        title.font = {
         name: 'Calibri',
         size: 28,
         bold: true,
       }
       title.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' },
        bgColor: { argb: '' }
      }
       
       title.alignment = { vertical: 'middle', horizontal: 'center' }
       
       //Label poste
       worksheet.mergeCells('A3:A4');
       title = worksheet.getCell('A3');
       title.value = "Risque "
       title.font = {
        name: 'Calibri',
        size: 12,
        bold: true,
      }
      
      title.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCE4D6' },
        bgColor: { argb: '' }
      }
      title.alignment = { vertical: 'middle', horizontal: 'center' }
      
        //Label poste
        worksheet.mergeCells('B3:B4');
        title = worksheet.getCell('B3');
        title.value = "N°"
        title.font = {
         name: 'Calibri',
         size: 12,
         bold: true,
       }
       
       title.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: ' A9D08E' },
        bgColor: { argb: '' }
      }
      title.alignment = { vertical: 'middle', horizontal: 'center' }

              //Label poste
        worksheet.mergeCells('C3:C4');
        title = worksheet.getCell('C3');
        title.value = "MODE de travail"
        title.font = {
         name: 'Calibri',
         size: 12,
         bold: true,
       }
       title.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCE4D6' },
        bgColor: { argb: '' }
      }
      title.alignment = { vertical:'middle', horizontal: 'center' }

       worksheet.mergeCells('D3:D4');
        title = worksheet.getCell('D3');
        title.value = "Description succinte de la tâche, procédé, installation"
        title.font = {
         name: 'Calibri',
         size: 12,
         bold: true,
       }
       title.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true  }

       worksheet.mergeCells('E3:E4');
       title = worksheet.getCell('E3');
       title.value = "Dommages HSE "
       title.font = {
        name: 'Calibri',
        size: 12,
        bold: true,
      }
      title.alignment = { vertical: 'middle', horizontal: 'center' }

      worksheet.mergeCells('F3:O4');
      title = worksheet.getCell('F3');
      title.value = "Estimation du risque"
      title.font = {
       name: 'Calibri',
       size: 12,
       bold: true,
     }
     title.alignment = { vertical: 'middle', horizontal: 'center' }
     
     title.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'F4B084' },
      bgColor: { argb: '' }
    }

     worksheet.mergeCells('P3:S3');
     title = worksheet.getCell('Q3');
     title.value = "Les moyens de maîtrise sont-ils suffisants ? "
     title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    title.alignment = { vertical: 'middle', horizontal: 'center' }

     title = worksheet.getCell('Q4');
     title.value = "Les moyens de maîtrise sont-ils suffisants ? "
     title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    title.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true  }

    worksheet.mergeCells('R4:S4');
    title = worksheet.getCell('R4');
    title.value = "Si les moyens de maitrise sont jugés insuffisants, on pondère les MM ? "
    title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    title.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0000' },
      bgColor: { argb: '' }
    }
    title.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true  }

    worksheet.mergeCells('T3:U4');
    title = worksheet.getCell('T4');
    title.value = "Si non, actions correctives"
    title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    title.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'F4B084' },
      bgColor: { argb: '' }
    }
    title.alignment = { vertical: 'middle', horizontal: 'center' }
        //Label poste
        title = worksheet.getCell('A5');
        title.value = "Catégorie "
        title.font = {
         name: 'Calibri',
         size: 12,
         bold: true,
       }
       
       title.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'F2F2F2' },
         bgColor: { argb: '' }
       }
       title.alignment = { vertical: 'middle', horizontal: 'center' }
       
         //Label poste
         title = worksheet.getCell('B5');
         title.value = "Numéro lié au DUERP"
        
         title.font = {
          name: 'Calibri',
          size: 12,
          bold: true,
        }
        title.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: ' A9D08E' },
         bgColor: { argb: '' }
       }
       title.alignment = { vertical: 'middle', horizontal: 'center' }

         title = worksheet.getCell('C5');
         title.value = "N : Normal D : Dégradé M : Maintenance"
         title.font = {
          name: 'Calibri',
          size: 12,
          bold: true,
        }
        title.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'F2F2F2' },
         bgColor: { argb: '' }
       }
       title.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true  }
         title = worksheet.getCell('D5');
         title.value = "Décrire la tâche prescrite, de l'activité";
         title.font = {
          name: 'Calibri',
          size: 12,
          bold: true,
        }
         title.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true  }
  
        title = worksheet.getCell('E5');
        title.value = "Type de blessure ou atteinte à l'environnement (douleur, fracture,pollution, brulure…) ";
        title.font = {
          name: 'Calibri',
          size: 12,
          bold: true,
        }
        title.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true  }

 
       title = worksheet.getCell('F5');
       title.value = "Fréquence";
       title.font = {
        name: 'Calibri',
        size: 12,
        bold: true,
      }
       title.alignment = { vertical: 'middle', horizontal: 'center',wrapText: true  }
 
      title = worksheet.getCell('G5');
      title.value = "Fréquence Comptage ";
      title.font = {
        name: 'Calibri',
        size: 12,
        bold: true,
      }
      title.alignment = { vertical: 'middle', horizontal: 'center' }
 
      title = worksheet.getCell('H5');
      title.value = "Gravité";
      title.font = {
        name: 'Calibri',
        size: 12,
        bold: true,
      }
      title.alignment = { vertical: 'middle', horizontal: 'center' }
 
     title = worksheet.getCell('I5');
     title.value = "Gravité Comptage ";
     title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
     title.alignment = { vertical: 'middle', horizontal: 'center' }

     title = worksheet.getCell('J5');
     title.value = "Risque ";
     title.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF9900' },
      bgColor: { argb: '' }
    }
       title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    title.alignment = { vertical: 'middle', horizontal: 'center' }


     title = worksheet.getCell('K5');
     title.value = "Technique";
     title.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'F2F2F2' },
      bgColor: { argb: '' }
    }
    title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    title.alignment = { vertical: 'middle', horizontal: 'center' }

     title = worksheet.getCell('L5');
     title.value = "Organisationnelle";
     title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
     title.alignment = { vertical: 'middle', horizontal: 'center' }
     
     title = worksheet.getCell('M5');
     title.value = "Humain";
     title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
     title.alignment = { vertical: 'middle', horizontal: 'center' }

     title = worksheet.getCell('N5');
     title.value = "Maîtrise";
       
     title.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: ' A9D08E' },
      bgColor: { argb: '' }
    }
    title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    title.alignment = { vertical: 'middle', horizontal: 'center' }

     title = worksheet.getCell('O5');
     title.value = "Risque résiduel";
     title.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF9900' },
      bgColor: { argb: '' }
    }
    title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    title.alignment = { vertical: 'middle', horizontal: 'center' }
     
    title = worksheet.getCell('Q5');
    title.value = "OUI / NON ";
    title.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'F2F2F2' },
      bgColor: { argb: '' }
    }
    title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    title.alignment = { vertical: 'middle', horizontal: 'center' }
    

    title = worksheet.getCell('R5');
    title.value = "MM pondéré";
    title.alignment = { vertical: 'middle', horizontal: 'center' }
    title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    
    title = worksheet.getCell('S5');
    title.value = "Risque pondéré";
    title.alignment = { vertical: 'middle', horizontal: 'center' }
    title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    
    worksheet.mergeCells('T5:U5');
    title = worksheet.getCell('T5');
    title.value = "Actions correctives";
    title.alignment = { vertical: 'middle', horizontal: 'center' }
    title.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    }
    data.forEach(d => {
    console.log(d);
      let row = worksheet.addRow([d.name,d.id,d.work,d.description,d.dommage,d.labelfrequency,d.frequency,d.labelgravity,d.gravity,d.maitrisenumber,d.vigilance,d.maitrise.technique,d.maitrise.organisationnel,d.maitrise.humain]);
    }
    );
    let blob;
    workbook.xlsx.writeBuffer().then(async (data) => {
     blob = new Blob([data], { type: EXCEL_TYPE });
     
      
  });

 
}

}


