import Appbar from "./Appbar";
import UserFields from "./UserFields";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewCardPage() {
    const { primaryKey } = useParams();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isOpened, setIsOpened] = useState(false);
    const [isWinner, setIsWinner] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/view-card/${primaryKey}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setId(result.id);
                setName(result.name);
                setMessage(result.message);
                setIsOpened(result.is_opened);
                setIsWinner(result.winner);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [primaryKey]);

    return (
        <div className="ViewCardPage">

            <Card id = {id} name={name} message={message} isOpened={isOpened} isWinner ={isWinner}/>
        </div>
    );
}

export default ViewCardPage;
