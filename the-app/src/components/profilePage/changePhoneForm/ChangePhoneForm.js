
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import SubmitButtons from '../../UI components/SubmitButtons';
import { phoneValidation } from "../../../helpers/vars";
import { collection, addDoc, doc, setDoc, getDoc  } from "firebase/firestore"; 


const ChangePhoneForm =  ({ setError }) => {

    const [value, setValue] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [isChanging, setIsChanging] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const userId = auth.currentUser.uid
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         setPhoneNumber(user.phoneNumber);
    //     });
    // }, []);

    //получаем номер телефона из базы
    const docRef = doc(db, "users", `${userId}`);
    try {
     getDoc(docRef).then((data) => {
                // console.log("Document data:", data);
                setPhoneNumber(data._document.data.value.mapValue.fields.phoneNumber.stringValue)
            }).catch((error) => {
                console.log("No such document!", error);
            });;
    } catch (error) {
      console.log("Error getting cached document:", error);
    }
    

    
    const handleSubmitPhone = async (event) => {
        event.preventDefault();
        
        if (value.match(phoneValidation)) {
            setPhoneNumber(value);
        } else {
            setError("Введите валидный номер телефона")
        }
        
        //если пользователя нет в БД, то создаем и записываем данные
        //если пользователь уже есть в БД, то заменяем данные
        await setDoc(doc(db, "users", `${userId}`), {phoneNumber: value}, {merge:true});
      
        setPhoneNumber(value);
        setIsChanging(false);
        setValue("");
    }

    return (
        <>
            <form className="profile__form " onSubmit={handleSubmitPhone}>
                <div className="profile__form-content profile__form-content--input">
                    <div className="profile__container">
                        <div className="profile__left">
                            <p className="profile__info">Номер телефона:</p>
                            {!isChanging
                                ? <p className="profile__info">{phoneNumber ? phoneNumber : "Нет данных"}</p>
                                : <input className="profile__input"
                                    placeholder="Телефон +XXXXXXXXXXX"
                                    type="tel"
                                    pattern={phoneValidation}
                                    onChange={handleChange}
                                    value={value} />
                            }
                        </div>
                        <SubmitButtons
                            isChanging={isChanging}
                            setIsChanging={setIsChanging}
                            onSubmit={handleSubmitPhone} />
                    </div>
                </div>
            </form>
        </>
    )
}

export default ChangePhoneForm;