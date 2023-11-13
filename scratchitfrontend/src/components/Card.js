import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function Card() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        const card = { name, email, message };

        fetch("http://localhost:8080/Add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card)
        })
            .then(response => response.json())
            .then(data => {
                console.log("New Card:", data);
            })
            .catch(error => {
                console.error("Error submitting card:", error);
            });
    };

    //TODO match Card from Java to send to /Add

    return (
        <Container>
            <form>
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: 16 }}
                />
                <TextField
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: 16 }}
                />
                <TextField
                    id="standard-basic"
                    label="Message"
                    variant="standard"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ marginBottom: 16 }}
                />


                <Button variant="contained" onClick={handleClick}>
                    Submit
                </Button>
            </form>
        </Container>
    );
}
