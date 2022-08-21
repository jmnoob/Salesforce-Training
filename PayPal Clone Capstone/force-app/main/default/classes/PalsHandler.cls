public class PalsHandler {
        
    @AuraEnabled
    public static List<Pals__c> getPalsData(String PalName){
        String user = UserInfo.getUserId();
        String str ='%'+PalName+'%';
        return [SELECT ID, Pal_Name__r.Name, Pal_Name__r.OwnerId FROM Pals__c Where Pal_Name__r.OwnerId !=:user AND Pal_Name__r.Name like :str];
    }
    
    
}