import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { jwtDecode } from "jwt-decode";
import { Dialog } from '@headlessui/react'
import Card from "./Card";
import Scratchcard from "./Scratchcardpage";

export default function UserFields() {

    const [sub, setSub] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [prize, setPrize] = useState('');
    const [numToSend, setNumToSend] = useState(1);
    const [numToWin, setNumToWin] = useState(0);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');


        if (jwtToken) {
            try {
                const decodedToken = jwtDecode(jwtToken);
                setName(`${decodedToken.given_name} ${decodedToken.family_name}`);
                setSub(decodedToken.sub);
                console.log("named");
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
        setIsOpen(false);
        const cardSetInfo = {
            sub: currentSub, // Use the stored value of sub
            name,
            email: decodedToken.email, // Use the decodedToken directly for email
            message,
            prize,
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
                           className="block mb-2 text-md mt-5 font-medium text-gray-900 dark:text-white">Sender's
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
                    <input type="text" id="message" onChange={(e) => setMessage(e.target.value)}
                           className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder=""/>
                </div>

                <div>
                    <label htmlFor="prize"
                           className="block -2 mb-2 text-md font-medium text-gray-900 dark:text-white">
                        Prize
                    </label>
                    <input type="text" id="prizee" onChange={(e) => setPrize(e.target.value)}
                           className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder=""/>
                </div>

                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault(); // Prevent the default form submission
                        setIsOpen(true);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
            <div
                className="flex flex-col items-center justify-start mt-4 w-[500px] min-h-[500px] rounded-3xl bg-gray-100 text-wrap break-words mx-auto">
                <h1 className="block py-2 px-3 font-medium text-2xl">{name} Sent You a Card!</h1>
                <h1 className="block py-2 px-3 font-medium text-l">{message}</h1>
                <img src="dottedcircle.png" alt="circle" width="250" height="250"/>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <Dialog.Panel>
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div
                                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                <div
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div
                                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 15 15"
                                                     strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M5.075 4.1c0-1.189 1.182-2.175 2.425-2.175c1.243 0 2.425.986 2.425 2.175c0 1.099-.557 1.614-1.306 2.279l-.031.027C7.845 7.065 6.925 7.88 6.925 9.5a.575.575 0 1 0 1.15 0c0-1.085.554-1.594 1.307-2.26l.02-.02c.748-.662 1.673-1.482 1.673-3.12C11.075 2.128 9.219.775 7.5.775S3.925 2.128 3.925 4.1a.575.575 0 1 0 1.15 0M7.5 13.358a.875.875 0 1 0 0-1.75a.875.875 0 0 0 0 1.75"/>
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900"
                                                    id="modal-title">Create Cards?</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        You will create <strong>{numToSend} Cards</strong>,
                                                        and <strong>{numToWin} will be winners</strong>. Send them via
                                                        the View Cards Page
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button"  onClick={handleClick}
                                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 sm:ml-3 sm:w-auto"> Create
                                        </button>
                                        <button type="button"  onClick={() => setIsOpen(false)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>

        </Container>

    );
}