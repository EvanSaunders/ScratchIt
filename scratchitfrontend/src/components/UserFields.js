import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { jwtDecode } from "jwt-decode";
import Card from "./Card";
import Scratchcard from "./Scratchcardpage";

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




    //SET MAX CHARACTERS
    //
    //
    //
    //
    //
    //


    return (
        <Container>
            <form>
                <div>
                    <label htmlFor="first_name"
                           className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Sender's
                        Name</label>
                    <input type="text" id="first_name"
                           onChange={(e) => setName(e.target.value)}
                           className=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder={name} required/>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="numToSend"
                               className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                            How many to create?
                        </label>
                        <input
                            type="number"
                            id="numToSend"
                            value={numToSend}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (/^[0-9]*$/.test(newValue) && newValue >= 1 && newValue <= 5) {
                                    setNumToSend(newValue);

                                    // Ensure numToWin is not greater than numToSend
                                    if (numToWin > newValue) {
                                        setNumToWin(newValue);
                                    }
                                }
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="numToWin"
                               className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                            How should Win?
                        </label>
                        <input
                            type="number"
                            id="numToWin"
                            value={numToWin}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (/^[0-9]*$/.test(newValue) && newValue >= 1 && newValue <= numToSend) {
                                    setNumToWin(newValue);
                                }
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="message"
                           className="block -2 mb-2 text-md font-medium text-gray-900 dark:text-white">
                        Message
                    </label>
                    <input type="url" id="message" onChange={(e) => setMessage(e.target.value)}
                           className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder=""/>
                </div>

                <button type="submit " onClick={handleClick}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                </button>
            </form>
            <div
                className="flex flex-col items-center justify-start mt-4 w-[500px] min-h-[500px] rounded-3xl bg-gray-100 text-wrap break-words mx-auto">
                <h1 className="block py-2 px-3 font-medium text-2xl">{name} sent you a card</h1>
                <h1 className="block py-2 px-3 font-medium text-l">{message}</h1>
                <img src="dottedcircle.png" alt="circle" width="250" height="250"/>
            </div>


        </Container>

    );
}