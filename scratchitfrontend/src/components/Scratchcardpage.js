import React, {useEffect, useState} from "react";
import ScratchCard from "react-scratchcard";

import cardImage from "../assets/scratchcircle2.png";




    const settings = {

        width: 350,
        height: 350,
        image: cardImage,
        finishPercent: 40,



        onComplete: async (id, isDisplayOnly) => {
            if (!isDisplayOnly) {
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
            }else{
                console.log("Database not updated, is for display only")
            }

        },


    };

const ScratchCardComponent = (props) => (

    <div className="flex justify-center items-center h-30vh  break-words">
        {props.isOpened ? (
            <div className="font-medium text-large absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[50%] text-center">
                    <h2>{props.prize}</h2>
            </div>
        ) : (
            <ScratchCard {...settings} className="relative" onComplete={() => settings.onComplete(props.id, props.isDisplayOnly)}>

                <div className="font-medium text-large absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[50%] text-center">
                        <h2>{props.prize}</h2>
                </div>
            </ScratchCard>
        )}
    </div>

);

    class Scratchcard extends React.Component {
        render() {
            // Assume 'id' is passed as a prop to Scratchcard component
            const {id, isOpened, isDisplayOnly, prize} = this.props;


            return (
                <div>
                    <ScratchCardComponent id={id} isOpened ={isOpened} isDisplayOnly = {isDisplayOnly} prize = {prize}/>
                </div>
            );
        }
    }
export default Scratchcard;
