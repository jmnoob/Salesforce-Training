public class AdminHandler {
    
    
    @AuraEnabled(cacheable=true)
    public static String getUserInfo() {
        Id profileId=userinfo.getProfileId();
        return [Select Id, Name from Profile where Id=:profileId].Name;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Bills__c> forAdminBills(){
        List<Bills__c> bills = new List<Bills__c>();
        bills = [SELECT ID, Name, amount__c,location__c,for_user__c, for_user__r.Name, category__c, paid__c, pay_before__c, successful__c,offer_applied__c,Flagged__c from Bills__c ORDER BY Name DESC];
        return bills;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Bills__c> forSupportBills(){
        List<Bills__c> bills = new List<Bills__c>();
        bills = [SELECT ID, Name, amount__c,location__c,for_user__c, for_user__r.Name, category__c, paid__c, pay_before__c, successful__c,offer_applied__c,Flagged__c from Bills__c Where Flagged__c = true ORDER BY Name DESC];
        return bills;
    }
    
    @AuraEnabled(cacheable=false)
    public static void updateMyWallet(Double Amount, String ThisBillId, Boolean isPaid, String userName){
        
        Wallet__c upmywallet = [SELECT Id, balance__c, added_from__c From Wallet__c Where added_from__c =:userName];
        upmywallet.balance__c = upmywallet.balance__c + Amount;
       
        try{
            if(isPaid){
            update upmywallet;
            updateTheBill(ThisBillId);
            }else{
                updateTheBill(ThisBillId);
            }
          }catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
        }  
              
    }
    
  
    public static void updateTheBill(String BillsId){
        Bills__c bills = [SELECT ID, paid__c, successful__c from Bills__c where Id =: BillsId];
        delete bills; 
    }
    
    @AuraEnabled(cacheable=false)
    public static Bills__c updateTheFlag(String BillsId){
        
        Bills__c bills = [SELECT ID, paid__c, successful__c,Flagged__c from Bills__c where Id =: BillsId];
        
        if(bills.Flagged__c){
            bills.Flagged__c = false;
        }else{
            bills.Flagged__c = true;
        }
        
        update bills;
        return bills;
    }
        
    
    
    
}