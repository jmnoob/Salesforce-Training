trigger insertPassbook on Bills__c (After update) {
    
    
    if(Trigger.isUpdate && Trigger.isAfter){
        
         	String names;
            Double am;
            
            for(Bills__c cbills: Trigger.new){
                names = cbills.Name;
                am = cbills.amount__c;
                if(cbills.successful__c){
                    Bills.insertPB(names, am);
                }
            }
            
    }
   
}