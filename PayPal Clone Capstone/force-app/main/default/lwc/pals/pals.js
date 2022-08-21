import { LightningElement } from 'lwc';
import palsData from '@salesforce/apex/PalsHandler.getPalsData';
import palName from '@salesforce/schema/Pals__c.Pal_Name__c';
import palType from '@salesforce/schema/Pals__c.type__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const col = [
    {
        label: 'Send Money',
        type: 'button', 
        typeAttributes: {  
            label: 'Send Money',  
            name: 'View',  
            title: 'View',  
            disabled: false,  
            value: 'view',  
            iconPosition: 'left'
        }
    },
    {
        label: 'Pal Name',
        type: 'text', 
        fieldName: 'Name'
    }
]

export default class Pals extends LightningElement {


    fields = [palName, palType];


    result;
    searchName;
    coloumns = col;

    setName(e){
        this.searchName = e.target.value;

        this.GetPalsData();
    }

    GetPalsData(){
        palsData({'PalName' : this.searchName}).then(res => {
            if(res){
                
                let paldata = [];
                res.forEach(row =>{
                    let pdata = {};
                    pdata.Name = row.Pal_Name__r.Name;
                    pdata.OwnerId = row.Pal_Name__r.OwnerId;
                    paldata.push(pdata);
                })
                this.result = paldata;

            }
        }).catch(err =>{
            this.error=err;
        })
    }


    handleSuccess(){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Pals Added',
                variant: 'success'
            })
        );
        this.refreshRecord();
    }

    handleError(){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Pals Error',
                variant: 'error'
            })
        );
    }


    refreshRecord(){
        setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
       }, 2000); 
     }

    record;
    handleRowAction(event){
        this.record = event.detail.row;
        console.log(this.record.Name);
        const modal = this.template.querySelector("c-sendmoney");
        modal.show();
        modal.palname = this.record.Name;
        modal.palid = this.record.OwnerId;//get the owner id of Pal user
        console.log(this.record.OwnerId);   
        modal.isData = true;
    }

}