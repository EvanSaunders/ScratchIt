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
                className="flex flex-col items-center mt-4 w-[500px] min-h-[500px] rounded-3xl bg-gray-100 text-wrap break-words mx-auto relative">
                <h1 className="block py-2 px-3 font-medium text-2xl">{props.name} sent you a card!</h1>
                <h1 className="block py-2 px-3 font-medium text-l break-words">{props.message}</h1>

                <Scratchcard id={props.id} isOpened={props.isOpened}
                             isDisplayOnly={props.isDisplayOnly} prize={props.prize}/>

            </div>
            <br/>
        </div>


    );
}

export default Card;