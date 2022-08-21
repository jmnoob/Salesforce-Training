import { LightningElement, api } from 'lwc';
import updateWallets from '@salesforce/apex/CustomWalletHandler.updateMyWallet';
import getWalletInfo from '@salesforce/apex/CustomWalletHandler.getWalletInfo';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Sendmoney extends LightningElement {
    
    
    @api palname;
    @api palid;
    amount;
    balance;

    showModal = false;

    @api isData;
    
    @api show() {
        this.showModal = true;
        console.log('hello');
      }
    
    handleDialogClose() {
        this.showModal = false;
    }

    //get the amount to send
    getAmountValue(event){
        this.amount = event.target.value;
    }

    updateWallets(){

        //get current user balance
        getWalletInfo().then(res =>{
            this.balance = res.balance__c;
          })

        console.log(this.balance);
        console.log(this.balance - this.amount);
        //verify if the user has enough balance  
        if(this.balance < this.amount){
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Payment Error',
                    message: 'Insufficient funds',
                    variant: 'error'
                })
             );
        }else{
            //update the wallet of the user via the owner id - as one wallet one user id, we can use this as basis
            console.log(this.amount);
            updateWallets({'Palid': this.palid, 'Amount': this.amount}).then(()=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Send Money Successful',
                        variant: 'success'
                    })
                );
            })

        }
    }


}