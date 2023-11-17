import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function UserFields() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [messageT, setMessage] = useState("");
    const [numToSend, setNumToSend] = useState(1);
    const [numToWin, setNumToWin] = useState(0);

    const handleClick = (e) => {
        e.preventDefault();
        const cardSetInfo = {
            name,
            email,
            messageT,
            numToSend : parseInt(numToSend, 10),
            numToWin : parseInt(numToWin, 10) };

        fetch("http://localhost:8080/createCards", {
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

                console.log("Card Set Info:", JSON.stringify(cardSetInfo));
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
                    id="email-field"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: 16 }}
                />

                <TextField
                    id="message-field"
                    label="MessageT"
                    variant="outlined"
                    value={messageT}
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
                    max="10"
                    value={numToSend}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        if (/^[0-9]*$/.test(newValue) && newValue >= 1 && newValue <= 10) {
                            setNumToSend(newValue);
                            // Clear numToWin if it's greater than the new numToSend
                            setNumToWin(numToWin > newValue ? 0 : numToWin);
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