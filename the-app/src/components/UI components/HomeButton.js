import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const HomeButton = () => {
    return (
        <Tooltip title="На главную страницу">
            <Link to={"/"}>
                <HomeIcon sx={{ fontSize: "50px", color: "#FFCA42" }} />
            </Link>
        </Tooltip>
    )
}

export default HomeButton;