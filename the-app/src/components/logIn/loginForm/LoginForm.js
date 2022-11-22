import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FormBody from "../../UI components/FormBody";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import { passwordValidation, emailValidation } from "../../../helpers/vars";

const LoginForm = ({ onSubmit }) => {
    //локально сохраняем данные инпутов
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    //были внутри input или нет
    const [loginDirty, setLoginDirty] = useState(false);
    const [passDirty, setPassDirty] = useState(false);
    //ошибки по умолчанию
    const [loginError, setLoginError] = useState("Email не может быть пустым");
    const [passError, setPassError] = useState("Пароль не может быть пустым");
    //состояние формы
    const [formValid, setFormValid] = useState(false);

    //форма отсеживает ошибки инпутов
    useEffect(() => {
        if (loginError || passError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [loginError, passError])

    useEffect(() => {
        if (!login.match(emailValidation)) {
            setLoginError("Введите корректный адрес электронной почты")
            if (!login) {
                setLoginError("Email не может быть пустым")
            }
        } else {
            setLoginError("")
        }
    }, [login])
    useEffect(() => {
        if (!pass.match(passwordValidation)) {
            setPassError("Невалидный пароль (см.подсказку)")
            if (!pass) {
                setPassError("Пароль не может быть пустым")
            }
        } else {
            setPassError("")
        }
    }, [pass])
    //обработчики изменения инпутов
    const handleChangeLogin = (e) => {
        setLogin(e.target.value);
    };


    const handleChangePass = (e) => {
        setPass(e.target.value);
    };


    //обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ login, pass });
        setLogin("");
        setPass("");
    };

    //отслеживает действия в инпутах
    const blurHandler = (e) => e.target.name === "email"
        ? setLoginDirty(true)
        : setPassDirty(true)


    return (
        <FormBody onSubmit={handleSubmit}>
            <div className="logIn__input-wrapper">
                <TextField
                    type="email"
                    name="email"
                    value={login}
                    onChange={handleChangeLogin}
                    label="Почта"
                    variant="outlined"
                    pattern={emailValidation}
                    onBlur={blurHandler}
                />
                {(loginDirty && loginError) && <div className="logIn__input-error">{loginError}</div>}
            </div>
            <div className="logIn__input-wrapper">
                <TextField
                    type="password"
                    name="password"
                    value={pass}
                    onChange={handleChangePass}
                    label="Пароль"
                    variant="outlined"
                    pattern={passwordValidation}
                    onBlur={blurHandler}
                />
                {(passError && passDirty) && <div className="logIn__input-error">{passError}</div>}
            </div>
            <IconButton color="primary">
                <Tooltip title="Пароль не может быть короче восьми символов и должен содержать хотя бы одну цифру, одну маленькую и одну большую латинскую букву">
                    <QuestionMarkIcon sx={{
                        fontSize: "20px"
                    }} />
                </Tooltip>
            </IconButton>

            <Button
                type="submit"
                sx={{
                    backgroundColor: "#1B3764",
                    padding: "15px 82px",
                    border: "3px solid #FFCA42",
                    borderRadius: "8px"
                }}
                variant='contained'
                disabled={!formValid}
            >
                Войти!
            </Button>
        </FormBody>
    );
};

export default LoginForm;