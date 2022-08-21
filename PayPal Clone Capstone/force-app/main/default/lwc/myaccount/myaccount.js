import { LightningElement, wire } from 'lwc';
import myAccount from '@salesforce/apex/MyAccount.getAccountInfo';
import insertAcc from '@salesforce/apex/MyAccount.insertAccount';
import userName from '@salesforce/schema/Uuser__c.Name';
import mobileNumber from '@salesforce/schema/Uuser__c.mobile_number__c';
import email from '@salesforce/schema/Uuser__c.Email__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class Myaccount extends LightningElement {

    fields=[userName, mobileNumber, email];
    haveData = false;
    accId;
    usersname;
    usersphone;
    usersemail;
    @wire (myAccount)
    accounts({error, data}){
        if(data){
            this.accId = data.Id;
            this.haveData = true;
        }else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }

    getUsername(event){
        this.usersname = event.target.value;
        if (!event.target.value) {
            event.target.reportValidity();
        }
    }

    getPhone(event){
        this.usersphone = event.target.value;
        if (!event.target.value) {
            event.target.reportValidity();
        }
    }

    getEmail(event){
        this.usersemail = event.target.value;
        if (!event.target.value) {
            event.target.reportValidity();
        }
       
    }

    createAccount(){
        const allValid = [...this.template.querySelectorAll('lightning-input')]
        .reduce((validSoFar, inputFields) => {
            inputFields.reportValidity();
            return validSoFar && inputFields.checkValidity();
        }, true);

        if(allValid){
            insertAcc({'Username': this.usersname, 'phone': this.usersphone, 'email': this.usersemail}).then(()=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account Created',
                        variant: 'success'
                    })
                );
                this.RecordView();
            })
        }
    }


    RecordView() {
        setTimeout(() => {
             eval("$A.get('e.force:refreshView').fire();");
        }, 1000); 
     }

}