package org.example.controller;

import org.example.Card;
import org.example.CardSetInfo;
import org.example.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin
public class CardController {
    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }


    private CardService cardService;

    @PostMapping("/create-cards")
    public String add(@RequestBody CardSetInfo cardSetInfo){
        Card[] cardArray = cardSetInfo.createCards();
        for (Card card : cardArray) {
            cardService.saveCard(card);
        }

        return "UserFields Added Succesfully";
    }

    @GetMapping("/view-sentCards")
    public List<Card> viewSentCards(@RequestParam String email){
        return cardService.findByEmail(email);
    }


    @GetMapping("/view-card/{primaryKey}")
    public Optional<Card> viewCard(@PathVariable UUID primaryKey){
        return cardService.findById(primaryKey);
    }


}
