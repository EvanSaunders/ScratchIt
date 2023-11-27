import {useNavigate} from "react-router-dom";
import Appbar from "./Appbar";
import Box from "@mui/material/Box";
import {ThemeProvider} from "@mui/material";
import Home from "./Home";
import UserFields from "./UserFields";

function Card() {
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
                <h1>Soa sent you a card</h1>
                <h2> Thanks for purchasing, see if you won</h2>

            </Box>
        </ThemeProvider>

    );
}

export default Card;