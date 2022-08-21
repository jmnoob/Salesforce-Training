import { LightningElement, track, wire } from 'lwc';
import getBills from '@salesforce/apex/Bills.getDataFromBills';
import getUserInfo from '@salesforce/apex/AdminHandler.getUserInfo';
import getCancel from '@salesforce/apex/AdminHandler.updateMyWallet';
import getAdmin from '@salesforce/apex/AdminHandler.forAdminBills';
import getSupport from '@salesforce/apex/AdminHandler.forSupportBills';
import upFlag from '@salesforce/apex/AdminHandler.updateTheFlag';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const actions = [
    { label: 'Cancel', name: 'cancel'}, 
    { label: 'Flag', name: 'Flag'}
]
const column = [
    {   
        label: 'Pay',
        type: 'button', typeAttributes: {  
        label: 'Pay',  
        name: 'View',  
        title: 'View',  
        disabled: false,  
        value: 'view',  
        iconPosition: 'left'  
    }},
      {
        label: 'Bill Number',
        fieldName: 'Name'
    },
    {
        label: 'Amount',
        fieldName: 'amount__c',
        type: 'currency'
    },
    {
        label: 'Category',
        fieldName: 'category__c'
    },
    {
        label: 'Paid',
        fieldName: 'paid__c',
        sortable: true
    },
    {
        label: 'Pay Before',
        fieldName: 'pay_before__c'
    },
    {
        label: 'Successful',
        fieldName: 'successful__c'
    },
    {
        label: 'Offer Applied',
        fieldName: 'offer_applied__c',
        
    },
    {
        label: 'Flagged',
        fieldName: 'Flagged__c'
    }
]
const admcolumn = [
      {
        label: 'Bill Number',
        fieldName: 'Name'
    },
    {
        label: 'Amount',
        fieldName: 'amount__c',
        type: 'currency'
    },
    {
        label: 'Category',
        fieldName: 'category__c'
    },
    {
        label: 'Paid',
        fieldName: 'paid__c',
        sortable: true
    },
    {
        label: 'Pay Before',
        fieldName: 'pay_before__c'
    },
    {
        label: 'User Name',
        fieldName: 'userName',
    },
    {
        label: 'Successful',
        fieldName: 'successful__c'
    },
    {
        label: 'Offer Applied',
        fieldName: 'offer_applied__c',
        
    },
    {
        label: 'Flagged',
        fieldName: 'Flagged__c'
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
            menuAlignment: 'right'
        }
    }
]
const supportcolumn = [
    {
      label: 'Bill Number',
      fieldName: 'Name'
  },
  {
      label: 'Amount',
      fieldName: 'amount__c',
      type: 'currency'
  },
  {
      label: 'Category',
      fieldName: 'category__c'
  },
  {
      label: 'Paid',
      fieldName: 'paid__c',
      sortable: true
  },
  {
      label: 'Pay Before',
      fieldName: 'pay_before__c'
  },
  {
      label: 'User Name',
      fieldName: 'userName',
  },
  {
      label: 'Successful',
      fieldName: 'successful__c'
  },
  {
      label: 'Offer Applied',
      fieldName: 'offer_applied__c',
      
  },
  {
      label: 'Flagged',
      fieldName: 'Flagged__c'
  },
  {
      type: 'action',
      typeAttributes: {
          rowActions: actions,
          menuAlignment: 'right'
      }
  }
]


export default class Bills extends LightningElement {

    isUser = false;
    isAdmin = false;
    isSupport = false;
    admData;
    usrData;
    supportData;
    supportColumn = supportcolumn;
    columns = column;
    s = admcolumn;

    @wire(getUserInfo)
    userinfo({error, data}){
        console.log(data);
        if(data === "System Administrator"){
            this.adminData();
            this.isAdmin = true;
            this.isUser = false;
        }else if(data === "Pal Customer Support"){
            this.getsupportData();
            this.isSupport = true;
            this.isAdmin = false;
            this.isUser = false;
        }else if(data === "Pal Customer") {
            this.isUser = true;
            this.isAdmin = false;
        }
    }
  
    @wire (getBills) bills;

    adminData(){
        getAdmin().then(res=>{
            
            if(res){
                let aData = [];
                res.forEach(row => {
                    let bdata ={};
                    bdata.Id = row.Id,
                    bdata.Name = row.Name,
                    bdata.amount__c = row.amount__c,
                    bdata.location__c = row.location__c,
                    bdata.userName = row.for_user__r.Name, 
                    bdata.for_user__c = row.for_user__c, 
                    bdata.category__c = row.category__c, 
                    bdata.paid__c = row.paid__c, 
                    bdata.pay_before__c = row.pay_before__c, 
                    bdata.successful__c = row.successful__c,
                    bdata.offer_applied__c = row.offer_applied__c,
                    bdata.Flagged__c = row.Flagged__c
                    if(row.Flagged__c){
                        actions[1].label = "Unflag"; 
                    }
                    aData.push(bdata);
                })
                this.admData = aData;
            }
            
        })
    }

    getsupportData(){
        getSupport().then(res=>{
            if(res){
                let sData = [];
                res.forEach(row => {
                    let bdata ={};
                    bdata.Id = row.Id,
                    bdata.Name = row.Name,
                    bdata.amount__c = row.amount__c,
                    bdata.location__c = row.location__c,
                    bdata.userName = row.for_user__r.Name, 
                    bdata.for_user__c = row.for_user__c, 
                    bdata.category__c = row.category__c, 
                    bdata.paid__c = row.paid__c, 
                    bdata.pay_before__c = row.pay_before__c, 
                    bdata.successful__c = row.successful__c,
                    bdata.offer_applied__c = row.offer_applied__c,
                    bdata.Flagged__c = row.Flagged__c
                    if(row.Flagged__c){
                        actions[1].label = "Unflag"; 
                    }
                    sData.push(bdata);
                })
                this.supportData = sData;
            }
        })
    }



    record;
    handleRowAction(event){
        this.record = event.detail.row;
        console.log(this.record.Id);
        const modal = this.template.querySelector("c-payment");
        modal.show();
        modal.billName = this.record.Name;
        modal.userId = this.record.for_user__c;
        modal.descr = this.record.category__c;
        modal.getid = this.record.Id;
        modal.amount = this.record.amount__c;
        modal.isPaid = this.record.paid__c;
        modal.discount = this.record.offer_applied__c;
    }


    cancelRecs;
    cancelAmt;
    cancelId;
    cancelisPaid;
    cancelName;
    handleCancelAction(event){
        let actionName = event.detail.action.name;
        this.cancelRecs = event.detail.row;
        this.cancelAmt = this.cancelRecs.amount__c;
        this.cancelId = this.cancelRecs.Id;
        this.cancelisPaid = this.cancelRecs.paid__c;
        this.cancelName = this.cancelRecs.for_user__c;

        switch (actionName) {
            case 'Flag':
                this.setFlagged();
                break;
            
            case 'cancel':
                this.cancelThis();
                break;
        }

    }


    cancelThis(){
        getCancel({'Amount' : this.cancelAmt, 'ThisBillId' : this.cancelId, 'isPaid': this.cancelisPaid, 'userName': this.cancelName}).then(res=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Bills Cancelled',
                    variant: 'success'
                })
            );
            window.location.reload();
        }).catch((error) => {
            this.errorMessage=error;
            console.log('unable to cancel the record due to'+JSON.stringify(this.errorMessage));
        });
    }

    setFlagged(){
        upFlag({'BillsId': this.cancelId}).then(()=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Update Successful',
                    variant: 'success'
                })
            );
            window.location.reload();
        }).catch((error) => {
            this.errorMessage=error;
            console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }


    


}