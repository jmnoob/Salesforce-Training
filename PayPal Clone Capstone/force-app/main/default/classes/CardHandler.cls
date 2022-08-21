public class CardHandler {
    
	@AuraEnabled(cacheable=true)
    public static Card__c getCardInfo(){
        String userId = UserInfo.getUserId();
        return [SELECT Id, Card_no__c, total_spend__c From Card__c WHERE OwnerId =: userId];
    }
    
    
    public static Card__c updateCard(Double Amount){
        String userId = UserInfo.getUserId();
        Card__c myCard = [SELECT Id, Card_no__c, total_spend__c From Card__c Where OwnerId =:userId];
        myCard.total_spend__c = myCard.total_spend__c + Amount;
       try{
            update myCard;
        }catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
    	}
        return myCard;
    }
    
}