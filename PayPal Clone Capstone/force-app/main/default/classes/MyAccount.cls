public class MyAccount {
	
    @AuraEnabled(cacheable=true)
    public static Uuser__c getAccountInfo(){
        String userId = UserInfo.getUserId();
        return [SELECT Id, Email__c, Name, mobile_number__c From Uuser__c WHERE OwnerId =: userID LIMIT 1];   
    }
    
    @AuraEnabled(cacheable=false)
    public static void insertAccount(String Username, String phone, String email){
        
        Uuser__c user = new Uuser__c();
        user.Name = Username;
        user.mobile_number__c = phone;
        user.Email__c = email;
        
        insert user;
        
    }
}