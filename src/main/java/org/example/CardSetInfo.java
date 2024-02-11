package org.example;

public class CardSetInfo {
    String sub;
    String name;
    String email;
    String message;
    String prize;
    int numToSend;

    public CardSetInfo(String sub, String name, String email, String message, String prize, int numToSend) {
        this.sub = sub;
        this.name = name;
        this.email = email;
        this.message = message;
        this.prize = prize;
        this.numToSend = numToSend;
    }

    public Card[] createCards(){
        Card[] cardArray = new Card[numToSend];
        for(int i = 0; i< numToSend;i++){
            Card winnerCard = new Card(sub,email, name, message, prize);
            cardArray[i]=winnerCard;
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
                '}';
    }
}
