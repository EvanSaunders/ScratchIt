package org.example.controller;

import jakarta.persistence.Id;
import org.example.Card;
import org.example.CardSetInfo;
import org.example.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
public class CardController {
    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }


    private CardService cardService;

    @PostMapping("/createCards")
    public String add(@RequestBody CardSetInfo cardSetInfo){
        Card[] cardArray = cardSetInfo.createCards();
        for (Card card : cardArray) {
            cardService.saveCard(card);
        }

        return "UserFields Added Succesfully";
    }

    @GetMapping("/viewCard")
    public String viewCard(UUID primaryKey){
        return cardService.findById(primaryKey).toString();
    }


}
