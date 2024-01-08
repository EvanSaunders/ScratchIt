import {useNavigate} from "react-router-dom";
import Appbar from "./Appbar";
import Box from "@mui/material/Box";
import {ThemeProvider} from "@mui/material";
import Home from "./Home";
import UserFields from "./UserFields";
import Scratchcardpage from "./Scratchcardpage";
import Scratchcard from "./Scratchcardpage";
import {jwtDecode} from "jwt-decode";





function Card(props) {
    const navigate = useNavigate();



    return (
        <div>
            <br/>
            <div
                className="flex flex-col items-center justify-start w-[500px] min-h-[500px] rounded-3xl bg-gray-100 text-wrap break-words">
                <h1 className="block py-2 px-3 font-medium text-2xl">{props.name} sent you a card</h1>
                <h1 className="block py-2 px-3 font-medium text-l">{props.message}</h1>

                <Scratchcard id={props.id} isOpened={props.isOpened} isWinner={props.isWinner}
                             isDisplayOnly={props.isDisplayOnly}/>

            </div>
            <br/>
        </div>


    );
}

export default Card;