import { LightningElement, wire } from 'lwc';
import getPassbook from '@salesforce/apex/PassbookHandler.getPassbookInfo';
import pdflib from "@salesforce/resourceUrl/pdflib";
import { loadScript } from "lightning/platformResourceLoader";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const column = [
    {
        label: 'Vendor Name',
        fieldName: 'Name'     
    },
    {
        label: 'Amount',
        fieldName: 'amount__c'     
    },
    {
        label: 'Expense Desc.',
        fieldName: 'expense_description__c'     
    },
    {
        label: 'Comments',
        fieldName: 'comment__c'     
    },
    {
        label: 'Date Time',
        fieldName: 'datetime__c'     
    },
    {
        label: 'Flagged',
        fieldName: 'Flagged__c',
            
    },
    {   
        label: 'Download',
        type: 'button', 
        typeAttributes: {  
            label: 'Download',  
            name: 'View',  
            title: 'View',  
            disabled: false,  
            
        }
    }
];

export default class Passbook extends LightningElement {

    record;
    recordId;
    vendorName;
    amount;
    comment;
    expense;


    pbcolumn = column;


    @wire (getPassbook) passbook;

    handleRowAction(event){
        this.record = event.detail.row;
        this.recordId = this.record.Id;
        this.vendorName = this.record.Name;
        this.amount = this.record.amount__c;
        this.expense = this.record.expense_description__c;
        this.comment = this.record.comment__c;
        this.createPdf();
    }

    renderedCallback() {
        loadScript(this, pdflib).then(() => {});
    }



    async createPdf() {
        const pdfDoc = await PDFLib.PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(
          PDFLib.StandardFonts.TimesRoman
        );
    
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 30;
        page.drawText("Pasbook Transactions", {
          x: 50,
          y: height - 4 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          
        });
        page.drawText('\n \n Vendor Name : '+this.vendorName+' \n Expense Description : ' +this.expense +'\n Amount : ' +this.amount+ '\n Comment : '+this.comment+'\n' , {
            x: 50,
            y: height - 4 * fontSize,
            size: 12,
           
            font: timesRomanFont,
           
          })

        const pdfBytes = await pdfDoc.save();
        this.saveByteArray("Transaction Record", pdfBytes);
      }

      saveByteArray(pdfName, byte) {
        var blob = new Blob([byte], { type: "application/pdf" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        var fileName = pdfName;
        link.download = fileName;
        link.click();
      }


    
}