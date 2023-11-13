package org.example.service;

import org.example.Card;
import org.example.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CardServiceImp implements CardService {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private CardRepository cardRepository ;

    @Autowired
    public CardServiceImp(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }


    @Override
    public Card saveCard(Card card){
        return cardRepository.save(card);
    }

    @Override
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }
}
