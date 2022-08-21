public class CustomWalletHandler {
    
    
    @AuraEnabled(cacheable=true)
    public static Wallet__c getWalletInfo(){
        String userId = UserInfo.getUserId();
        return [SELECT Id, balance__c From Wallet__c WHERE OwnerId =: userId];        
    }
    
    
    
    //update my wallet and pals wallet
    @AuraEnabled(cacheable=false)
    public static Wallet__c updateMyWallet(String Palid, Double Amount){
        String userId = UserInfo.getUserId();
        
        Wallet__c uppalswallet = [SELECT Id, balance__c From Wallet__c WHERE OwnerId =: Palid];
        uppalswallet.balance__c = uppalswallet.balance__c + Amount;
        
        deductMyWallet(Amount);
        update uppalswallet;
            
        return uppalswallet;
	}
    
     @AuraEnabled(cacheable=false)
    public static void insertNewWallet(String walletName){
        String userId = UserInfo.getUserId();
        Uuser__c user = [Select Id, Name from Uuser__c where OwnerId =:userId];
        
        Wallet__c wallet = new Wallet__c();
        wallet.Name = walletName;
        wallet.added_from__c = user.Id;

        insert wallet;
    } 
    
    
    @AuraEnabled(cacheable=false)
    public static Wallet__c updateWallet(Double Amount){
       	String userId = UserInfo.getUserId();
        Wallet__c upmywallet = [SELECT Id, balance__c From Wallet__c Where OwnerId =:userId];
        upmywallet.balance__c = upmywallet.balance__c + Amount;
       try{
            update upmywallet;
            CardHandler.updateCard(Amount);
           
        } catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
    	}        
       return upmywallet;
	}
    
    @AuraEnabled(cacheable=false)
    public static Wallet__c deductMyWallet(Double Amount){
           
        String userId = UserInfo.getUserId();
        Wallet__c upmywallet = [SELECT Id, balance__c From Wallet__c Where OwnerId =:userId];
        upmywallet.balance__c = upmywallet.balance__c - Amount;
        try{
            update upmywallet;
           
        } catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
    	}        
        return upmywallet;
	}
    
    
    
}