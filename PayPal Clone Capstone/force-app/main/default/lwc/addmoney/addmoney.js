import { LightningElement, api, wire, track } from 'lwc';
import updateWC from '@salesforce/apex/CustomWalletHandler.updateWallet';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class Addmoney extends LightningElement {

  disabled = false;
  @track error;


  @api getcardnumber;
  @api total;
  @api cardIds;
  amount;
  showModal = false;
  randomnumber = Math.floor(Math.random() * 6);

  @api show() {
    this.showModal = true;
    console.log(this.getcardnumber);
    console.log(this.cardIds);
  }
  handleDialogClose() {
    this.showModal = false;
    window.location.reload();
  }

  getAmount(event){
    this.amount = event.target.value;
  }

  updateWalletnCard(){
    console.log(this.amount);
    if(this.randomnumber < 2){
      this.dispatchEvent(
        new ShowToastEvent({
            title: 'Payment Error',
            message: 'Insufficient funds',
            variant: 'error'
        })
     );
    }else {
    updateWC({'Amount': this.amount}).then(res=>{
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Wallet Updated',
                variant: 'success'
            })
          );
    })
  }
  }




  
}