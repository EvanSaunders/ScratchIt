package org.example;

import jakarta.persistence.*;

@Entity(name = "Card")
@Table(name = "card")

public class Card {
    @Id
    @SequenceGenerator(name = "card_sequence", sequenceName = " card_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_sequence" )
    @Column(name = "id", updatable = false)
    private Long id;
    @Column(name = "email", nullable = false, columnDefinition = "TEXT")
    private String email;
    @Column(name = "name", nullable = false, columnDefinition = "TEXT")
    private String name;
    @Column(name = "message", nullable = true, columnDefinition = "TEXT")
    private String message;
    @Column(name = "is_winner", nullable = false, columnDefinition = "BOOLEAN")
    private Boolean is_winner;

    @Column(name = "is_opened", nullable = false, columnDefinition = "BOOLEAN")
    private Boolean is_opened;


    public Card(String email, String name, String message, Boolean is_winner) {

        this.email = email;
        this.name = name;
        this.message = message;
        this.is_winner = is_winner;

    }

    public Card() {

    }


    public Long getId() {
        return id;
    }



    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getMessage() {
        return message;
    }

    public Boolean getWinner() {
        return is_winner;
    }

    public Boolean getIs_opened() {
        return is_opened;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setIs_opened(Boolean is_opened) {
        this.is_opened = is_opened;
    }

    public void setWinner(Boolean winner) {
        is_winner = winner;
    }

    @Override
    public String toString() {
        return "UserFields{" +
                "id=" + id +
                ", email='" + email + '\'' +
                '}';
    }
}
