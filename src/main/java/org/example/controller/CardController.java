package org.example.controller;

import org.example.Card;
import org.example.CardSetInfo;
import org.example.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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
        System.out.println("Received request with CardSetInfo: " + cardSetInfo);
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

    @PostMapping("/update-note/{id}")
    public ResponseEntity<String> updateNote(@PathVariable UUID id, @RequestBody Map<String, String> requestBody) {
        // Find the entity by ID
        Card entity = cardService.findById(id)
                .orElseThrow();

        // Update the isOpened field (assuming isOpened is a boolean field)
        entity.setNote(requestBody.get("note"));

        // Save the updated entity
        cardService.saveCard(entity);

        return ResponseEntity.ok("Entity with id " + id + " updated successfully.");
    }

    @DeleteMapping("delete-card/{id}")
    public ResponseEntity<String> deleteCard(@PathVariable UUID id) {
        cardService.deleteCard(id);
        return ResponseEntity.ok("Entity with id " + id + " deleted successfully.");
    }

    @GetMapping("/view-sent-cards/{sub}")
    public List<Card> viewSentCards(@PathVariable String sub){
        return cardService.findBySub(sub);
    }


    @GetMapping("/view-card/{primaryKey}")
    public Optional<Card> viewCard(@PathVariable UUID primaryKey){
        return cardService.findById(primaryKey);
    }

    @GetMapping("/get-num-active/{sub}")
    public int getNumActive(@PathVariable String sub){return cardService.countBySub(sub);}


}
