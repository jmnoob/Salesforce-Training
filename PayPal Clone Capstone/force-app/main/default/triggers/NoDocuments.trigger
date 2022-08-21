trigger NoDocuments on Car_Model__c (before update) {

    if(Trigger.isUpdate && Trigger.isBefore){
        for(Car_Model__c cars: Trigger.New){
            List<ContentDocumentLink> recid = [SELECT Id FROM ContentDocumentLink WHERE LinkedEntityId =: cars.Id];
            if(cars.Car_Stage__c == 'Ready for launched' && recid.isEmpty()){
          		cars.addError('Please put the recommended data before updating');
            }
        }
        //SELECT ContentDocumentId,Id,LinkedEntityId,ShareType FROM ContentDocumentLink WHERE LinkedEntityId = ;
    }
}