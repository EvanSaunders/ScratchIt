package org.example;

public class CardSetInfo {
    String sub;
    String name;
    String email;
    String message;

    String prize;
    int numToSend;
    int numToWin;

    public CardSetInfo(String sub, String name, String email, String message, String prize, int numToSend, int numToWin) {
        this.sub = sub;
        this.name = name;
        this.email = email;
        this.message = message;
        this.prize = prize;
        this.numToSend = numToSend;
        this.numToWin = numToWin;
    }

    public Card[] createCards(){
        Card[] cardArray = new Card[numToSend];
        for(int i = 0; i< numToWin;i++){
            Card winnerCard = new Card(sub,email, name, message, prize, true);
            cardArray[i]=winnerCard;
        }
        for(int i = numToWin; i< numToSend;i++){
            Card loserCard = new Card(sub, email, name, message, prize, false);
            cardArray[i]=loserCard;
        }
        return cardArray;
    }



    public String getSub() {
        return sub;
    }
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    public String getPrize() {return prize;}


    public int getNumToSend() {
        return numToSend;
    }

    public int getNumToWin() {
        return numToWin;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setSub(String sub) {
        this.sub = sub;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setPrize(String prize) {
        this.prize = prize;
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
                "sub ='" + sub + '\'' +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", message='" + message + '\'' +
                ", prize='" + prize + '\'' +
                ", numToSend=" + numToSend +
                ", numToWin=" + numToWin +
                '}';
    }
}
