import {useNavigate} from "react-router-dom";
import Appbar from "./Appbar";
import Box from "@mui/material/Box";
import {ThemeProvider} from "@mui/material";
import Home from "./Home";
import UserFields from "./UserFields";
import Scratchcardpage from "./Scratchcardpage";
import Scratchcard from "./Scratchcardpage";

function Card(props) {
    const navigate = useNavigate();
    return (
        <ThemeProvider
            theme={{
                palette: {
                    primary: {
                        main: '#eeeeee',
                        dark: '#0066CC',
                    },
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: 500,
                    height: 500,
                    borderRadius: 8,
                    bgcolor: 'primary.main'
                }}
            >
                <h1>{props.name} sent you a card</h1>
                <h2> {props.message}</h2>
                <Scratchcard id = {props.id} isOpened = {props.isOpened} isWinner = {props.isWinner}/>

            </Box>
        </ThemeProvider>

    );
}

export default Card;