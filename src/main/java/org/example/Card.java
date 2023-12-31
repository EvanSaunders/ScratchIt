package org.example;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "Card")
@Table(name = "card")

public class Card {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "uuid")
    private UUID id = UUID.randomUUID();

    @Column(name = "sub", nullable = false, columnDefinition = "TEXT")
    private String sub;
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

    @Column(name = "note", nullable = true, columnDefinition = "TEXT")
    private String note;


    public Card(String sub, String email, String name, String message, Boolean is_winner) {

        this.sub = sub;
        this.email = email;
        this.name = name;
        this.message = message;
        this.is_winner = is_winner;
        is_opened = false;
        note = "";

    }

    public Card() {

    }


    public UUID getId() {
        return id;
    }


    public String getSub() {
        return sub;
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

    public Boolean getIs_winner() {
        return is_winner;
    }

    public Boolean getIs_opened() {
        return is_opened;
    }

    public String getNote() {
        return note;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setSub(String sub) {
        this.sub = sub;
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

    public void setIs_winner(Boolean is_winner) {
        is_winner = is_winner;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", sub='" + sub + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", message='" + message + '\'' +
                ", is_winner=" + is_winner +
                ", is_opened=" + is_opened +
                ", note='" + note + '\'' +
                '}';
    }
}
