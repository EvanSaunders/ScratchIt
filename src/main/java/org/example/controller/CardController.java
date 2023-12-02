package org.example.controller;

import org.example.Card;
import org.example.CardSetInfo;
import org.example.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("/updateIsOpened/{id}")
    public ResponseEntity<String> updateIsOpened(@PathVariable UUID id) {
        // Find the entity by ID
        Card entity = cardService.findById(id)
                .orElseThrow();

        // Update the isOpened field (assuming isOpened is a boolean field)
        entity.setIs_opened(true);

        // Save the updated entity
        cardService.saveCard(entity);

        return ResponseEntity.ok("Entity with id " + id + " updated successfully.");
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
