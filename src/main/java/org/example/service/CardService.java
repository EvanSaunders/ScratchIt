package org.example.service;

import org.example.Card;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CardService {
    public Card saveCard(Card card);
    public List<Card> getAllCards();


}
