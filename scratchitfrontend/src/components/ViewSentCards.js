import React, { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import Appbar from "./Appbar";
import {useNavigate} from "react-router-dom";

const ViewSentCards = () => {
    const [sentCards, setSentCards] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken')
    const decodedToken = jwtDecode(jwtToken);
    const sub = decodedToken.sub;
    const navigate = useNavigate();
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if(!jwtToken){
            navigate('/login');
        }
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
        console.log(sub);
        console.log(sentCards);
        fetchSentCards();
    }, [sub]);

    return (

        <div>
            <Appbar/>
            {/* Render your sentCards in the component */}
            {sentCards.map(card => (
                <div key={card.id}
                     style={{border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px'}}>
                    <p><strong>Send this Link:</strong> http://localhost:3000/view-card/{card.id}</p>
                    <p><strong>Name:</strong> {card.name}</p>
                    <p><strong>Opened?:</strong> {card.isOpened ? 'Opened' : 'Not Opened'}</p>
                    <p><strong>Winner?:</strong> {card.isWinner ? 'Winner' : 'Not a Winner'}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewSentCards;
