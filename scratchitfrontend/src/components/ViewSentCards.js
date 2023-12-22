import React, { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";

const ViewSentCards = () => {
    const [sentCards, setSentCards] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken')
    const decodedToken = jwtDecode(jwtToken);
    const sub = decodedToken.sub();

    useEffect(() => {
        const fetchSentCards = async () => {
            try {
                const response = await fetch(`http://localhost:8080/view-sent-cards/${sub}`);
                if (response.ok) {
                    const data = await response.json();
                    setSentCards(data);
                } else {
                    console.error('Failed to fetch sent cards:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error.message);
            }
        };

        fetchSentCards();
    }, [sub]);

    return (
        <div>
            {/* Render your sentCards in the component */}
            {sentCards.map(card => (
                <div key={card.id}>{/* Render card details here */}</div>
            ))}
        </div>
    );
};

export default ViewSentCards;
