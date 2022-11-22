import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser } from "firebase/auth";
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";

import { reauthenticate } from '../../firebase/firebaseAuth'
import ModalWindow from '../UI components/ModalWindow';

export const DeleteProfile = ({ setError }) => {


    const deleteProfile = async (password) => {
        try {
            const data = await reauthenticate(password);
            await deleteUser(data.user);

            console.log('User deleted');
        } catch (error) {
            console.log('An error ocurred', error);
            setError('Неверный пароль')
        }
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    return (
        <div>
            <IconButton className="profile__submit"
                color="primary" onClick={handleOpen}>
                <Tooltip title="Нажмите для сохранения информации ">
                    <DeleteIcon sx={{
                        fontSize: "30px"
                    }} />
                </Tooltip>
            </IconButton>
            <ModalWindow
                confirmFunction={deleteProfile}
                open={open}
                setOpen={setOpen}
                profile />
        </div >
    );
};






