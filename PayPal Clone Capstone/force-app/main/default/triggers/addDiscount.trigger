trigger addDiscount on Bills__c (before insert, before update) {

    if(Trigger.isBefore && Trigger.isInsert){
        for(Bills__c mybills: Trigger.New){
            mybills.offer_applied__c = 0;
            if(mybills.amount__c == 5000){
                mybills.offer_applied__c = 20;
            }if(mybills.amount__c >= 10000 && mybills.amount__c < 15000){
                mybills.offer_applied__c = 50;
            }if(mybills.amount__c >= 15000){
                mybills.offer_applied__c = 80;
            }
         }
    }
    
}