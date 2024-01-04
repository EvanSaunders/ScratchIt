import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { jwtDecode } from "jwt-decode";

export default function UserFields() {

    const [sub, setSub] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [numToSend, setNumToSend] = useState(1);
    const [numToWin, setNumToWin] = useState(0);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');


        if (jwtToken) {
            try {
                const decodedToken = jwtDecode(jwtToken);
                setName(`${decodedToken.given_name} ${decodedToken.family_name}`);
                setSub(decodedToken.sub);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);
    const handleClick = (e) => {

        e.preventDefault();
        const jwtToken = localStorage.getItem('jwtToken');
        const decodedToken = jwtDecode(jwtToken);
        const currentSub = sub; // Store the current value of sub

        console.log('Current sub value:', currentSub); // Log the current value of sub

        const cardSetInfo = {
            sub: currentSub, // Use the stored value of sub
            name,
            email: decodedToken.email, // Use the decodedToken directly for email
            message,
            numToSend: parseInt(numToSend, 10),
            numToWin: parseInt(numToWin, 10),
        };



        fetch("http://localhost:8080/create-cards", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                "Accept": "application/json"},
            body: JSON.stringify(cardSetInfo)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("New UserFields:", data);
            })
            .catch(error => {


                console.error("Error submitting card:", error);
            });
    };





    return (
        <Container>
            <form>
                <TextField
                    id="name-field"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: 16 }}
                />


                <TextField
                    id="message-field"
                    label="Message"
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ marginBottom: 16 }}
                />

                <label className="basicText" htmlFor="numToSend">
                    How many to create?
                </label>
                <input
                    type="number"
                    id="numToSend"
                    name="numToSend"
                    min="1"
                    max="5"
                    value={numToSend}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        if (/^[0-9]*$/.test(newValue) && newValue >= 1 && newValue <= 10) {
                            setNumToSend(newValue);
                            // Clear numToWin if it's greater than the new numToSend
                            //setNumToWin(numToWin > newValue ? 0 : numToWin);
                        }
                    }}
                />
                <label className="basicText" htmlFor="numToWin">
                    How many should win?
                </label>
                <input
                    type="number"
                    id="numToWin"
                    name="numToWin"
                    min="0"
                    max={numToSend}
                    value={numToWin}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        if (/^[0-9]*$/.test(newValue) && newValue >= 0 && newValue <= numToSend) {
                            setNumToWin(newValue);
                        }
                    }}
                />
                <Button variant="contained" onClick={handleClick}>
                    Submit
                </Button>
            </form>
        </Container>
    );
}