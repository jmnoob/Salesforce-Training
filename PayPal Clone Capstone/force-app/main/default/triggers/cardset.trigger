trigger cardset on Card__c (before insert, after insert) {
    
    if(Trigger.isBefore && Trigger.isInsert)
    {
         for(Card__c cards: Trigger.New){
       	 cards.total_spend__c = 0;
    	}
    }
  
    
    
}