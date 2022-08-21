public class Bills {
    
    @AuraEnabled(cacheable=true)
    public static List<Bills__c> getDataFromBills(){
        String userId = UserInfo.getUserId();
        List<Bills__c> bills = new List<Bills__c>();
        bills = [SELECT ID, Name, amount__c,location__c, category__c,for_user__c, paid__c, pay_before__c, successful__c,offer_applied__c,Flagged__c from Bills__c where for_user__r.OwnerId =:userId ORDER BY Name DESC];
        return bills;
    }
    
    
    @AuraEnabled(cacheable=false)
    public static Bills__c updateBills(String BillsId, Double Amount){
        
        Bills__c bills = [SELECT ID, paid__c, successful__c from Bills__c where Id =: BillsId];
        bills.paid__c = true;
        bills.successful__c = true;
        try{
        update bills;
        CustomWalletHandler.deductMyWallet(Amount);   
        } catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
       }
       return bills;
    }
    
    
    @AuraEnabled(cacheable=false)
    public static void insertPB(String names, Double amount, String userId, String descr){
        
        Passbook__c Passbook = new Passbook__c();
            Passbook.Name = names;
            Passbook.amount__c = amount;
            Passbook.expense_description__c = descr;
            Passbook.datetime__c = datetime.now();
            Passbook.comment__c = 'any comments';
            Passbook.User__c = userId;
       
           insert Passbook;
          
    } 
    
   
    
    
}