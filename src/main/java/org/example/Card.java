/**
package org.example;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Card {
    @Id
    private Long id;
    private String email;

    public Card(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public Card() {

    }


    public Long getId() {
        return id;
    }


    public String getEmail() {
        return email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", email='" + email + '\'' +
                '}';
    }
}
**/