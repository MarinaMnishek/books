
import { useEffect, useState } from "react";
import { onAuthStateChanged, updateEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import SubmitButtons from '../../UI components/SubmitButtons';
import { reauthenticate } from '../../../firebase/firebaseAuth'
import ModalWindow from "../../UI components/ModalWindow";
import { emailValidation } from "../../../helpers/vars";


const ChangeEmailForm = ({ setError }) => {

    const [value, setValue] = useState("");
    const [email, setEmail] = useState('');

    const [isChanging, setIsChanging] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setEmail(user.email);
        });
    }, []);

    const [open, setOpen] = useState(false);
    const handleOpen = (event) => {
        event.preventDefault();

        setOpen(true);
    }
    const handleSubmitEmail = async (password) => {
        try {
            const data = await reauthenticate(password);
            if (value.match(emailValidation)) {
                await updateEmail(data.user, value);
                console.log('Email updated!');
                setEmail(value);
            } else {
                setError("Введите валидный адрес электронной почты!");
            }
        } catch (error) {
            console.log('An error ocurred', error);
            setError("Вы неверно ввели пароль");
        } finally {
            setIsChanging(false);
        }
    }


    return (
        <>
            <form className="profile__form " onSubmit={handleOpen}>
                <div className="profile__form-content profile__form-content--input">
                    <div className="profile__container">
                        <div className="profile__left">
                            <p className="profile__info">Email:</p>
                            {!isChanging
                                ? <p className="profile__info">{email}</p>
                                : <input className="profile__input"
                                    placeholder="Почта sample@sample.sample"
                                    type="email"
                                    pattern={emailValidation}
                                    onChange={handleChange}
                                />
                            }
                        </div>
                        <SubmitButtons
                            isChanging={isChanging}
                            setIsChanging={setIsChanging}
                            onSubmit={handleOpen} />
                        <ModalWindow
                            confirmFunction={handleSubmitEmail}
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default ChangeEmailForm;