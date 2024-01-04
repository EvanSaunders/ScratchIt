package org.example.service;

import jakarta.transaction.Transactional;
import org.example.Card;
import org.example.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CardServiceImp implements CardService {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")

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
    @Transactional
    public void deleteCard(UUID id){
        cardRepository.deleteById(id);
    }

    @Override
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    @Override
    public Optional<Card> findById(UUID primaryKey){return cardRepository.findById(primaryKey);}


    @Override
    public List<Card> findBySub(String sub){return cardRepository.findBySub(sub);}
}
