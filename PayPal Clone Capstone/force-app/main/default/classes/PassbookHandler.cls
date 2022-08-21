public class PassbookHandler {
	
    @AuraEnabled(cacheable=true)
    public static List<Passbook__c> getPassbookInfo(){
        String userId = UserInfo.getUserId();
        return [SELECT Id, amount__c, expense_description__c, Name, comment__c, datetime__c, Flagged__c From Passbook__c WHERE OwnerId =: userID];
    }
   
}