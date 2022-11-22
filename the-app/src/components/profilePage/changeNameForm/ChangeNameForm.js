
import { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import SubmitButtons from '../../UI components/SubmitButtons';
import { nameValidation } from "../../../helpers/vars";


const ChangeNameForm = ({ setError }) => {

    const [value, setValue] = useState("");
    const [name, setName] = useState("");

    const [isChanging, setIsChanging] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setName(user.displayName);
        });
    }, []);

    const handleSubmitName = async (event) => {
        console.log(value)
        event.preventDefault();

        try {
            if (value.match(nameValidation)) {
                await updateProfile(auth.currentUser, {
                    displayName: value,
                });
                setName(value);
                console.log('name updated!');
            } else {
                setError("Введите валидный никнэйм");
            }
        } catch (error) {
            setError(error.code.split(",")[0]);
        } finally {
            setIsChanging(false);
        }
    }

    return (
        <>
            <form className="profile__form " onSubmit={handleSubmitName}>
                <div className="profile__form-content profile__form-content--input">
                    <div className="profile__container">
                        <div className="profile__left">
                            <p className="profile__info">Никнэйм:</p>
                            {!isChanging
                                ? <p className="profile__info">{name ? name : "Нет данных"}</p>
                                : <input className="profile__input"
                                    placeholder="Введите никнэйм"
                                    type="text"
                                    pattern={nameValidation}
                                    onChange={handleChange}
                                    value={value} />
                            }
                        </div>
                        <SubmitButtons
                            isChanging={isChanging}
                            setIsChanging={setIsChanging}
                            onSubmit={handleSubmitName} />
                    </div>
                </div>
            </form>
        </>
    )
}

export default ChangeNameForm;