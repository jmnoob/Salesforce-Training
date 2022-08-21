trigger walletset on Wallet__c (before insert) {
    for(Wallet__c wallet: Trigger.New){
        wallet.balance__c = 0;
    }
}