import { LightningElement, wire } from 'lwc';
import getCardInfo from '@salesforce/apex/CardHandler.getCardInfo';
import card from '@salesforce/schema/Card__c';
import cardNo from '@salesforce/schema/Card__c.Card_no__c';
import cardCvv from '@salesforce/schema/Card__c.cvv__c';
import cardExp from '@salesforce/schema/Card__c.expiry_date__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomCard extends LightningElement {

    value;
    objectName = card;
    fields = [cardNo, cardCvv, cardExp];
    getCardId;
    record;
    isHaveCard = false;


    @wire (getCardInfo)
    cardData({error, data}){
        if(data){
            this.value = data.Card_no__c;
            console.log(this.value);
            this.getCardId = data.Id;
            this.isHaveCard = true;
        }
        else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }

    handleSuccess(){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Card Created',
                variant: 'success'
            })
        );
        this.refreshRecord();
    }

    handleError(){
        this.RecordViewTimeOUt();
    }

    RecordViewTimeOUt() {
        setTimeout(() => {
             eval("$A.get('e.force:refreshView').fire();");
        }, 6000); 
     }

     refreshRecord(){
        setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
       }, 1000); 
     }
    
    
}