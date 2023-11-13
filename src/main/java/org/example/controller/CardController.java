package org.example.controller;

import org.example.Card;
import org.example.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CardController {
    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping(path = "/cardGenerator")
    @ResponseBody
    public String cardGenerator(
            @RequestParam("email") String email,
            @RequestParam("name") String name,
            @RequestParam("message") String message,
            @RequestParam("numToSend") int numToSend,
            @RequestParam("chanceToWin") int chanceToWin) {



        //return driverService.generateDisplayByYearHTML(year);
        return "homePage";
    }

    private CardService cardService;

    @PostMapping("/add")
    public String add(@RequestBody Card card){
        cardService.saveCard(card);
        return "Card Added Succesfully";
    }

    @GetMapping("/getAll")
    public List<Card> getAllCards(){
        System.out.println(cardService.getAllCards());
        return cardService.getAllCards();
    }



}
