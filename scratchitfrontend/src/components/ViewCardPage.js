import Appbar from "./Appbar";
import Card from "./Card";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function ViewCardPage() {
    const { primaryKey } = useParams();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [prize, setPrize] = useState("");
    const [isOpened, setIsOpened] = useState(false);
    const [sub, setSub] = useState("");
    const [isDisplayOnly, setIsDisplayOnly] = useState(false);
    const [jwtSub, setJwtSub] = useState("");
    const [confettiVisible, setConfettiVisible] = useState(false);

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            setJwtSub(decodedToken.sub);
        } else {
            setJwtSub("0");
        }

        const handleConfettiVisible = (value) => {
            setConfettiVisible(value);
        };

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/view-card/${primaryKey}`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                setId(result.id);
                setName(result.name);
                setMessage(result.message);
                setPrize(result.prize)
                setIsOpened(result.is_opened);
                setSub(result.sub);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [primaryKey, jwtSub]);

    useEffect(() => {
        // Check the condition after updating sub
        setIsDisplayOnly(jwtSub === sub);
    }, [jwtSub, sub]);

    return (
        <div className="dark:bg-gray-800 min-h-screen">
            <Appbar />
            {isDisplayOnly && (
                <div className="flex flex-col items-center pt-4 py-2 px-3 font-medium">
                <p  className="text-2xl dark:text-white">
                    PREVIEW CARD:
                </p>
                    <p className="text-xl dark:text-white">
                        You made this card. Scratching it will not open it
                    </p>
                </div>
            )}
            <div className="flex flex-col items-center pt-4">
            <Card
                id={id}
                name={name}
                message={message}
                prize={prize}
                isOpened={isOpened}
                isDisplayOnly={isDisplayOnly}
            />
        </div>
        </div>
    );
}

export default ViewCardPage;
