@isTest
public class AdminHandlerTest {
    
    @isTest
    public static void adminHandlerUdateWallet(){
        
        Uuser__c user = new Uuser__c();
        user.Email__c = 'mahil@gmail.com';
        user.Name = 'Hello';
        insert user;
        
        user = [Select Id from Uuser__c where Id =:user.id];
        String useridd = user.id;
        
        Bills__c bills = new Bills__c();
        bills.amount__c = 200;
        bills.paid__c = false;
        bills.Flagged__c = true;
        insert bills;
        
        bills = [Select Id, amount__c, paid__c, Flagged__c from Bills__c where Id = :bills.Id];
		String billId = bills.Id;
		Double billamount = bills.amount__c;
		Boolean billpaid = bills.paid__c;
		        
        Wallet__c wallet = new Wallet__c();
        wallet.balance__c = 10;
        wallet.added_from__c = user.id;
        insert wallet;
        
        AdminHandler.updateMyWallet(billamount, billId, billpaid, useridd);
        
    }
    
    @isTest
    public static void customWallet(){
        Double amount = 200;
        
        Wallet__c wallet = new Wallet__c();
        wallet.balance__c = 10;
        insert wallet;
        
        wallet = [Select Id, OwnerId From Wallet__c where Id=:wallet.Id];
        String palid = wallet.OwnerId;
        CustomWalletHandler.updateMyWallet(palid, amount);
        
        
    }
    
    @isTest
    public static void myAccInsertAcc(){
        String name = 'hello';
        String phone = '0923873434';
        String email = 'hello@gmail.com';
        MyAccount.insertAccount(name, phone, email);
        
        Uuser__c user = [Select Id, Name, mobile_number__c, Email__c from Uuser__c where Name = 'hello'];
        
        System.assertEquals('0923873434', user.mobile_number__c);
    }
    
    
    @isTest
    public static void passbooktest(){
        System.debug(PassbookHandler.getPassbookInfo());
    }
    
    @isTest
    public static void BillsgetDataFromBills(){
        Bills.getDataFromBills();
    }
    
    @isTest
    public static void adminHandlerFlag(){
        Bills__c bills = new Bills__c();
        bills.amount__c = 200;
        bills.paid__c = false;
        bills.Flagged__c = true;
        insert bills;
      	AdminHandler.updateTheFlag(bills.id);
    }
    
    @isTest
    public static void billsInsertPB(){
        Uuser__c user = new Uuser__c();
        user.Email__c = 'mahil@gmail.com';
        user.Name = 'Hello';
        insert user;
        
        String names = 'hello'; 
        Double amount = 2345;
        String userId = user.Id;
        String descr = 'no';
        
        Bills.insertPB(names, amount, userId, descr);
    }
    

    @isTest
    public static void testacc(){
        AdminHandler.getUserInfo();
        AdminHandler.forAdminBills();
        AdminHandler.forSupportBills();
    }
  
    
    @isTest
    public static void deltest(){
        Bills__c bills = new Bills__c(amount__c = 5000);
        insert bills;
        AdminHandler.updateTheBill(bills.Id);
        
    }
    
    
    @isTest
    public static void wallettest(){
        Wallet__c wallet = new Wallet__c();
        wallet.balance__c = 10;
        insert wallet;
        
        Card__c cards = new Card__c();
        cards.total_spend__c = 10;
        cards.cvv__c = 123;
        cards.expiry_date__c = Date.newInstance(2023, 8, 1);
        cards.Card_no__c = 89754656;
        insert cards;
              
        CustomWalletHandler.getWalletInfo();
        CardHandler.getCardInfo();
        
    }
    
    @isTest
    public static void palstest(){
        PalsHandler.getPalsData('user');
    }
      
    
    @isTest
    public static void myacctest(){
        Uuser__c user = new Uuser__c();
        user.Name = 'Hello';
        insert user;
        MyAccount.getAccountInfo();
    }
    
    @isTest
    public static void wallettriggertest(){
        Wallet__c wallet = new Wallet__c();
        wallet.balance__c = 10;
        insert wallet;
        
        Card__c cards = new Card__c();
        cards.total_spend__c = 10;
        cards.cvv__c = 123;
        cards.expiry_date__c = Date.newInstance(2023, 8, 1);
        cards.Card_no__c = 89754656;
        insert cards;
    }
    
    @isTest
    public static void pbtest(){
        Bills__c bil = new Bills__c();
        bil.amount__c = 15000;
        bil.successful__c = false;
        insert bil;
        Bills__c bills = [Select Id, Name, successful__c from Bills__c Where Id=:bil.Id];
        bills.successful__c = true;
        update bills;
    }
      
    @isTest
    public static void updatecard(){
        Bills__c bil = new Bills__c();
        bil.amount__c = 10000;
        bil.successful__c = false;
        insert bil;
        Double n = 200;
        Bills.updateBills(bil.Id, n);
    }
    
    @isTest
	public static void card(){
    
    Card__c c = new Card__c();
    c.cvv__c = 123;
    c.expiry_date__c = Date.newInstance(2023, 8, 1);
    c.Card_no__c = 89754656;
    insert c;

    CardHandler.updateCard(200);

    c = [SELECT total_spend__c FROM Card__c WHERE Id = :c.Id];
    System.assertEquals(200, c.total_spend__c);
        
	}
    
    @isTest
    public static void testamount(){
        Wallet__c w = new Wallet__c();
        w.balance__c = 10;
        insert w;
        
        CustomWalletHandler.updateWallet(200);
        
        w = [SELECT Id, balance__c From Wallet__c where Id =:w.Id];
        
        System.assertEquals(200, w.balance__c);
            
    }
        
        
}