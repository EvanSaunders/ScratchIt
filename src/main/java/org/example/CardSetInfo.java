package org.example;

public class CardSetInfo {
    String name;
    String email;
    String messageT;
    int numToSend;
    int numToWin;

    public CardSetInfo(String name, String email, String message, int numToSend, int numToWin) {
        this.name = name;
        this.email = email;
        this.messageT = message;
        this.numToSend = numToSend;
        this.numToWin = numToWin;
    }

    public Card[] createCards(){
        Card[] cardArray = new Card[numToSend];
        for(int i = 0; i< numToWin;i++){
            Card winnerCard = new Card(email, name, messageT, true);
            cardArray[i]=winnerCard;
        }
        for(int i = numToWin; i< numToSend;i++){
            Card loserCard = new Card(email, name, messageT, false);
            cardArray[i]=loserCard;
        }
        return cardArray;
    }




    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return messageT;
    }

    public int getNumToSend() {
        return numToSend;
    }

    public int getNumToWin() {
        return numToWin;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMessageT(String messageT) {
        this.messageT = messageT;
    }

    public void setNumToSend(int numToSend) {
        this.numToSend = numToSend;
    }

    public void setNumToWin(int numToWin) {
        this.numToWin = numToWin;
    }

    public CardSetInfo() {

    }

    @Override
    public String toString() {
        return "CardSetInfo{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", messageT='" + messageT + '\'' +
                ", numToSend=" + numToSend +
                ", numToWin=" + numToWin +
                '}';
    }
}
