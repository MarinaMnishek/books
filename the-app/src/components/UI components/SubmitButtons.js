import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Tooltip } from "@mui/material";


const SubmitButtons = ({ isChanging, setIsChanging, onSubmit }) => {
    return (
        <>
            <div className="profile__right">
                <IconButton
                    color="primary"
                    component="label"
                    disabled={isChanging}
                    onClick={() => setIsChanging(true)} >
                    <Tooltip title="Нажмите для изменения информации ">
                        <CreateIcon sx={{
                            fontSize: "20px"
                        }} />
                    </Tooltip>
                </IconButton>
                <IconButton
                    color="primary"
                    component="label"
                    disabled={!isChanging}
                    onClick={onSubmit}>
                    <Tooltip title="Нажмите для сохранения информации ">
                        <FileDownloadIcon sx={{
                            fontSize: "30px"
                        }} />
                    </Tooltip>
                </IconButton>
            </div>
        </>
    )
}

export default SubmitButtons;