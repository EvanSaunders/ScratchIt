import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Appbar from './Appbar';
import { useNavigate } from 'react-router-dom';

const ViewSentCards = () => {
    const [sentCards, setSentCards] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const [decodedToken, setDecodedToken] = useState('');
    const [sub, setSub] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!jwtToken) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const decoded = jwtDecode(jwtToken);
                setDecodedToken(decoded);
                setSub(decoded.sub);

                const response = await fetch(`http://localhost:8080/view-sent-cards/${decoded.sub}`);
                if (response.ok) {
                    const data = await response.json();
                    setSentCards(data);

                } else {
                    console.error('Failed to fetch sent cards:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error.message);
                navigate('/login');
            }
        };

        fetchData();
    }, [jwtToken, navigate]);

    return (
        <div>
            <Appbar />
            {/* Render your sentCards in the component */}
            {sentCards.map((card) => (
                <div
                    key={card.id}
                    style={{border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px'}}
                >
                    <p>
                        <strong>Send this Link:</strong> http://localhost:3000/view-card/{card.id}
                    </p>
                    <p>
                        <strong>Name:</strong> {card.name}
                    </p>
                    <p>
                        <strong>Message:</strong> {card.message}
                    </p>
                    <p>
                        <strong>Opened?:</strong> {card.is_opened ? 'Opened' : 'Not Opened'}
                    </p>
                    <p>
                        <strong>Winner?:</strong> {card.is_winner ? 'Winner' : 'Not a Winner'}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ViewSentCards;
