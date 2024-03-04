import {useNavigate} from "react-router-dom";
import ScratchCard from "react-scratchcard-v2";
import cardImage from "../assets/scratchcircle2.png";
import React from "react";





function Card(props) {
    const navigate = useNavigate();
    const handleComplete = async (e) => {
        if (!props.isDisplayOnly) {
            console.log("The card is now clear!");

            // Make an API call to update the database
            try {
                const response = await fetch(`http://localhost:8080/updateIsOpened/${props.id}`, {
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
        } else {
            console.log("Database not updated, is for display only")
        }

    };


    return (
        <div>
            <br />
            {!props.isOpened ? (
                <div className="flex flex-col items-center mt-4 w-[500px] min-h-[500px] rounded-3xl bg-gray-100 text-wrap break-words mx-auto relative">
                    <h1 className="block py-2 px-3 font-medium text-2xl">{props.name}</h1>
                    <h1 className="block py-2 px-3 font-medium text-l break-words">{props.message}</h1>
                    <div>
                        <ScratchCard className="flex items-center justify-center w-full h-full" width={350} height={350} image={cardImage} finishPercent={40} onComplete={handleComplete}>
                            <div>
                                <h1 className="font-medium text-large absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[50%] text-center">{props.prize}</h1>
                            </div>
                        </ScratchCard>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center mt-4 w-[500px] min-h-[500px] rounded-3xl bg-gray-100 text-wrap break-words mx-auto relative border border-green-500 border-8">
                    <h1 className="block py-2 px-3 font-medium text-2xl">{props.name}</h1>
                    <h1 className="block py-2 px-3 font-medium text-l break-words">{props.message}</h1>
                    <div style={{ width: '350px', height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 className="font-medium text-large max-w-[50%] text-center">{props.prize}</h1>
                    </div>

                </div>
            )}
            <br />
        </div>
    );
}

export default Card;