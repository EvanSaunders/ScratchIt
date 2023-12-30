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
    const [isOpened, setIsOpened] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [sub, setSub] = useState("");
    const [isDisplayOnly, setIsDisplayOnly] = useState(false);
    const [jwtSub, setJwtSub] = useState("");

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            setJwtSub(decodedToken.sub);
        } else {
            setJwtSub("0");
        }

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
                setIsOpened(result.is_opened);
                setIsWinner(result.is_winner);
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
        <div className="ViewCardPage">
            <Appbar />
            {isDisplayOnly && (
                <p>
                    This is a mockup, you made this card. You can scratch it, but it won't open.
                </p>
            )}
            <Card
                id={id}
                name={name}
                message={message}
                isOpened={isOpened}
                isWinner={isWinner}
                isDisplayOnly={isDisplayOnly}
            />
        </div>
    );
}

export default ViewCardPage;
