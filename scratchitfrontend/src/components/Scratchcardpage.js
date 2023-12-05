import React, {useEffect, useState} from "react";
import ScratchCard from "react-scratchcard";

import cardImage from "../assets/scratchcircle.jpg";




    const settings = {

        width: 250,
        height: 250,
        image: cardImage,
        finishPercent: 90,



        onComplete: async (id) => {
            console.log("The card is now clear!");

            // Make an API call to update the database
            try {
                const response = await fetch(`http://localhost:8080/updateIsOpened/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Add any other headers as needed
                    },
                    body: JSON.stringify({
                        isOpened: true,
                        // Add other data you want to update in the database
                    }),
                });

                if (response.ok) {
                    console.log("Database updated successfully!");
                } else {
                    console.error("Failed to update database:", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Error updating database:", error.message);
            }
        },

    };

const ScratchCardComponent = (props) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "30vh" }}>
        {props.isOpened ? (
            <div>
                {props.isWinner ? (
                    <h2>Congratulations! You WON!</h2>
                ) : (
                    <h2>You Lost</h2>
                )}
            </div>
        ) : (
            <ScratchCard {...settings} style={{ position: "relative" }} onComplete={() => settings.onComplete(props.id)}>
                {/* ... other components */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}
                >

                    {props.isWinner ? (
                        <h2>Congratulations! You WON!</h2>
                    ) : (
                        <h2>You Lost</h2>
                    )}
                </div>
            </ScratchCard>
        )}
    </div>
);

    class Scratchcard extends React.Component {
        render() {
            // Assume 'id' is passed as a prop to Scratchcard component
            const {id, isOpened, isWinner} = this.props;


            return (
                <div>
                    <ScratchCardComponent id={id} isOpened ={isOpened} isWinner = {isWinner}/>
                </div>
            );
        }
    }
export default Scratchcard;