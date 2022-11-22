import IconButton from '@mui/material/IconButton';
import { Button, Tooltip } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { reauthenticate } from '../../../firebase/firebaseAuth'
import ModalWindow from '../../UI components/ModalWindow';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { passwordValidation } from '../../../helpers/vars';
import ModalWindowResetPsw from '../../UI components/ModalWindowResetPsw';


const ChangePswForm = ({ setError }) => {

    const [newPassword, SetNewPassword] = useState("");
    const [repeatPassword, SetRepeatPassword] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = (event) => {
        event.preventDefault()
        setOpen(true);
    }
    const [openReset, setOpenReset] = useState(false);
    
    const handleChangePwd = async (password) => {
        try {
            const data = await reauthenticate(password);
            if (newPassword === repeatPassword) {
                if (!newPassword.match(passwordValidation)) {
                    setError("Введен невалидный пароль (см.подсказку)");
                } else {
                    await updatePassword(data.user, newPassword);
                    console.log('Password updated!')
                }
            } else {
                setError("Введенные пароли не совпадают");
            }
        } catch (error) {
            console.log('An error ocurred', error);
            setError("Вы неверно ввели текущий пароль");
        } finally {
            SetNewPassword("");
            SetRepeatPassword("");
        }
    }

    const handleResetPsw = () => {
        setOpenReset(true);
    }
    

    return (
        <>
        <div>
            
            <form className="profile__form " onSubmit={handleOpen}>
                <div className="profile__form-content profile__form-content--input">
                    <div className="profile__container">
                        <div className="profile__left">
                            <p className="profile__info">Новый пароль:</p>
                            <input className="profile__input"
                                placeholder="Введите новый пароль"
                                type="password"
                                onChange={(e) => SetNewPassword(e.target.value)}
                                pattern={passwordValidation}
                                value={newPassword} />
                        </div>
                    </div>
                    <div className="profile__container">
                        <div className="profile__left">
                            <p className="profile__info">Новый пароль:</p>
                            <input className="profile__input"
                                placeholder="Повторно введите новый пароль"
                                type="password"
                                onChange={(e) => SetRepeatPassword(e.target.value)}
                                pattern={passwordValidation}
                                value={repeatPassword} />
                        </div>
                    </div>
                    <div className="profile__submit">
                        <IconButton
                            color="primary" onClick={handleOpen}>
                            <Tooltip title="Нажмите для сохранения информации ">
                                <FileDownloadIcon sx={{
                                    fontSize: "30px"
                                }} />
                            </Tooltip>
                        </IconButton>
                        <IconButton color="primary" >
                            <Tooltip title="Пароль не может быть короче восьми символов и должен содержать хотя бы одну цифру, одну маленькую и одну большую латинскую букву">
                                <QuestionMarkIcon sx={{
                                    fontSize: "30px"
                                }} />
                            </Tooltip>
                        </IconButton>
                     
                    </div>

                    <ModalWindow
                        confirmFunction={handleChangePwd}
                        open={open}
                        setOpen={setOpen}
                    />
                </div>
            </form>
                <div className="profile__reset">
                    <Button variant="contained" onClick={handleResetPsw}>Забыли пароль?</Button>
                    <ModalWindowResetPsw
                        confirmFunction={handleResetPsw}
                        openReset={openReset}
                        setOpenReset={setOpenReset}
                    />
                </div>
            </div>
        </>
    )
}

export default ChangePswForm;