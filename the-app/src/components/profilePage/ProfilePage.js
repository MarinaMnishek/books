import { useEffect, useState } from 'react';
import { DeleteProfile } from "./DeleteProfile";
import ChangingPhoto from "./changingPhoto/ChangingPhoto";
import ChangeNameForm from "./changeNameForm/ChangeNameForm";
import ChangeEmailForm from "./changeEmailForm/ChangeEmailForm";
import ChangePhoneForm from "./changePhoneForm/ChangePhoneForm";
import ChangePswForm from "./changePswForm/ChangePswForm";


const ProfilePage = () => {

    const [error, setError] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => setError(""), 2000);
        return () => clearTimeout(timeout)
    }, [error])

    return (
        <main className="profile">
            <div className="profile__content">
                <h1 className="profile__heading">Информация о вашем профиле.</h1>
                <hr />
                <ChangingPhoto />
                <hr />
                <h2 className="profile__form-heading">Информация</h2>
                <ChangeNameForm setError={setError} />
                <ChangeEmailForm setError={setError} />
                <ChangePhoneForm setError={setError} />
                <hr />
                <h2 className="profile__form-heading">Измененение пароля</h2>
                <ChangePswForm setError={setError} />
                <hr />
                <h2 className="profile__form-heading">Удаление профиля</h2>
                <DeleteProfile setError={setError} />
                {error && <h2 className="error">{error}</h2>}
            </div>
        </main>
    );
};






export default ProfilePage;