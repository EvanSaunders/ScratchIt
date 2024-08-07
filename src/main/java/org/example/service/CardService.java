package org.example.service;

import org.example.Card;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public interface CardService {
    public Card saveCard(Card card);

    public void deleteCard(UUID id);


    
    public Optional<Card> findById(UUID primaryKey);
    
    public int countBySub(String sub);

    List<Card> findBySub(String sub);
}
