import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Appbar from './Appbar';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Scratchcard from "./Scratchcardpage";
import Card from "./Card";

const ViewSentCards = () => {
    const [sentCards, setSentCards] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const [decodedToken, setDecodedToken] = useState('');
    const [sub, setSub] = useState('');
    const [prize, setPrize] = useState("");
    const [showWinner, setShowWinner] = useState(false);
    const [note, setNote] = useState('');
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

    const toggleWinnerVisibility = () => {
        setShowWinner(!showWinner);
    };

    const handleTextareaChange = (event) => {
        setNote(event.target.value);
    };

    const updateNote = async (id, note) => {


        try {
            const response = await fetch(`http://localhost:8080/update-note/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data); // Log the success message
            } else {
                console.error('Failed to update note');
            }
        } catch (error) {
            console.error('Error during the update note request:', error);
        }
    };

    const deleteCard = async (id) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this card?');

        // Check if the user confirmed
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8080/delete-card/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Update local state to remove the deleted card
                    setSentCards((prevCards) => prevCards.filter((card) => card.id !== id));

                    const data = await response.json();
                    console.log(data); // Log the success message
                } else {
                    console.error('Failed to delete card');
                }
            } catch (error) {
                console.error('Error during the delete card request:', error);
            }
        }
    };


    return (
        <div className="dark:bg-gray-800">
            <Appbar/>
            <button onClick={toggleWinnerVisibility}>
                {showWinner ? 'Hide Winner' : 'Show Winner'}
            </button>
            {sentCards.map((card) => (
                <div
                    key={card.id}
                    style={{
                        border: `5px solid ${card.is_opened ? 'green' : '#ccc'}`,
                        margin: '10px',
                        padding: '10px',
                        borderRadius: '5px',
                    }}
                >
                    <p>
                        <strong>Send this Link:</strong> http://localhost:3000/view-card/{card.id}
                    </p>
                    <Card
                        id={card.id}
                        name={card.name}
                        message={card.message}
                        prize={card.prize}
                        isOpened={card.is_opened}
                        isWinner={card.is_winner}
                        isDisplayOnly={true}
                    />

                    <p>
                        <strong>Opened?:</strong> {card.is_opened ? 'Opened' : 'Not Opened'}
                    </p>
                    {showWinner && (
                        <p>
                            <strong>Winner?:</strong> {card.is_winner ? 'Winner' : 'Not a Winner'}
                        </p>
                    )}
                    <label>
                        Personal Note:
                        <textarea
                            name="postContent"
                            defaultValue={card.note}
                            onChange={handleTextareaChange}
                            rows={4}
                            cols={40}
                        />
                    </label>
                    <Button variant="contained" onClick={() => updateNote(card.id, note)}>
                        Save Note
                    </Button>
                    <Button variant="contained" onClick={() => deleteCard(card.id)}>
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default ViewSentCards;
