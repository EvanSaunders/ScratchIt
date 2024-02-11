import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Appbar from './Appbar';
import { useNavigate } from 'react-router-dom';


import Card from "./Card";

import { Typography, Button } from "@material-tailwind/react";
import { useCopyToClipboard } from "usehooks-ts";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import IconButton from "@mui/material/IconButton";

const ViewSentCards = () => {
    const [sentCards, setSentCards] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const [decodedToken, setDecodedToken] = useState('');
    const [sub, setSub] = useState('');
    const [prize, setPrize] = useState("");
    const [note, setNote] = useState('');
    const navigate = useNavigate();
    const [value, copy] = useCopyToClipboard();
    const [copied, setCopied] = React.useState(false);

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

        <div className="dark:bg-gray-800 min-h-screen">

            <Appbar/>
            <div className="dark:bg-gray-800">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-100 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-100">
                        {sentCards.map((card) => (
                            <div key={card.id} className="group">


                                    <Card
                                        id={card.id}
                                        name={card.name}
                                        message={card.message}
                                        prize={card.prize}
                                        isOpened={card.is_opened}
                                        isDisplayOnly={true}
                                    />
                                {card.is_opened && (
                                    <p className="mb-4 text-xl dark:text-white text-center">
                                        This card has been Opened!
                                    </p>
                                )}

                                    <div className="flex items-center gap-x-4 justify-center ">
                                        <Button
                                            onMouseLeave={() => setCopied(false)}
                                            onClick={() => {
                                                copy("http://localhost:3000/view-card/"+card.id);
                                                setCopied(true);
                                            }}
                                            className="flex items-center bg-blue-700 gap-x-3 px-4 py-2.5 lowercase"
                                        >
                                            <Typography
                                                className="border-r border-gray-400/50 pr-3 text-xs font-normal"
                                                variant="small"
                                            >
                                                http://localhost:3000/view-card/${card.id}
                                            </Typography>
                                            {copied ? (
                                                <CheckIcon className="h-4 w-4 text-white" />
                                            ) : (
                                                <DocumentDuplicateIcon className="h-4 w-4 text-white" />
                                            )}
                                        </Button>
                                    </div>


                            <label className="flex items-center gap-x-4 justify-center ">

                                <div className="w-96">
                                    <div className="relative w-full min-w-[200px] mt-6">
                                        <textarea
                                            className=" dark:text-white peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                             placeholder=" "
                                            name="postContent"
                                            defaultValue={card.note}
                                            onChange={handleTextareaChange}
                                            rows={4}
                                            cols={40}></textarea>
                                        <label
                                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 dark:text-white">
                                            Personal Notes
                                        </label>
                                    </div>
                                </div>

                            </label>
                                <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => updateNote(card.id, note)}
                                    className=" mr-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Save Note
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteCard(card.id)}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Delete Card
                                </button>
                                </div>

                        </div>
                    ))}
                </div>
            </div>
            </div>

        </div>
    );
};

export default ViewSentCards;
