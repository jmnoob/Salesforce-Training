import { api, LightningElement, track, wire } from 'lwc';
import getWalletInfo from '@salesforce/apex/CustomWalletHandler.getWalletInfo';
import { NavigationMixin } from "lightning/navigation";
import getCardInfo from '@salesforce/apex/CardHandler.getCardInfo';
import insertWallets from '@salesforce/apex/CustomWalletHandler.insertNewWallet';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomWallet extends NavigationMixin (LightningElement) {

    value;
    totalpsend;
    cardId;
    getId;
    record;
    parseValue;
    isUser = true;
    walletName;

    @track isLoading = false;

    @wire (getWalletInfo)
    userWallet({error, data}){ 
        if(data){
            this.record = data;
            this.getId = data.Id;
            this.isUser = false;
        }else if(!data) {
            this.isUser = true;
        }
    }

    getWalletName(event){
        this.walletName = event.target.value;
        if (!event.target.value) {
            event.target.reportValidity();
        }
    }

    insertNewWallet(){
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        
        if(allValid){
            this.handleIsLoading(true);
            insertWallets({'walletName': this.walletName}).then(res=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Created New Wallet',
                        variant: 'success'
                    })
                );
                this.RecordView();
            }).catch(error => {
                this.showToast('Error inserting or refreshing records', error.body.message, 'Error', 'dismissable');
            }).finally(()=>{
                this.handleIsLoading(false);
            });
        }
    }

    handleIsLoading(isLoading) {
        this.isLoading = isLoading;
    }

    RecordView() {
        setTimeout(() => {
             eval("$A.get('e.force:refreshView').fire();");
        }, 1000); 
     }

     handleSendMoney(){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'MyPals'
            }
        });
     }



    handleShowModal() {
        const modal = this.template.querySelector("c-addmoney");
        modal.show();
        getCardInfo().then(result =>{
            console.log(result);
            this.value = result.Card_no__c;
            this.totalpsend = result.total_spend__c;
            this.cardId = result.Id;
            console.log(this.value);
            modal.getcardnumber = this.value;
            modal.total = this.totalpsend;
            modal.cardIds = this.cardId;
        })
        
      }




}