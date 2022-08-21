trigger ApprovalEmail on Property_Booking__c (before insert, after update) {
	
    if(Trigger.isUpdate && Trigger.isAfter){
        for(Property_Booking__c propsNew: Trigger.new){
   
            if(propsNew.Status__c == 'Sent for Approval'){
                
                list<Messaging.SingleEmailMessage> mailList = new list<Messaging.SingleEmailMessage>();
                EmailTemplate et = [SELECT Id, Subject, Body FROM EmailTemplate WHERE Name = 'Property Booking Email'];
               
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setTemplateId(et.Id);
                //mail.toaddresses = new String[] {'mahilumjude@gmail.com'};
                mail.setTargetObjectId(propsNew.CreatedById);
                //mail.setWhatId(propsNew.Id); // Id of the Quote record. 
     			//mail.setSaveAsActivity(false);
     			//mail.setUseSignature(false);
                mailList.add(mail);
                if(!mailList.isEmpty()){
                    Messaging.sendEmail(mailList);
                }
                
            }
        }
    }
}