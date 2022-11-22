import { useEffect, useState } from "react";

import face from "../../../assets/face.jpg";

import {
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth"
import { auth, storage } from "../../../firebase/firebase";
import { fileCheck } from "../../../helpers/uploadFileToFirebase";
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";

import PhotoButtons from "./photoButtons/PhotoButtons";

const ChangingPhoto = () => {

    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => setError(""), 2000);
        return () => clearTimeout(timeout)
    }, [error])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setImgUrl(user?.photoURL);
        });
    }, []);

    const handleSubmitImg = (e) => {
        e.preventDefault()
        
        const file = e.target[0]?.files[0]
        const resultOfCheckFile = fileCheck(file);

        if (e.nativeEvent.submitter.name === 'upload'){
            if (resultOfCheckFile[0]) {
                const storageRef = ref(storage, `files/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on("state_changed", 
                    null,
                    (error) => {
                        console.log('Error', error)
                    }, 
                    () => {
                       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImgUrl(downloadURL);
                            updateProfile(auth.currentUser, {
                                photoURL: downloadURL
                            });
                        }).catch((error)=> console.log('Error', error));
                    }
                );
            }
            else setError(resultOfCheckFile[1]);
        }
        
        if (e.nativeEvent.submitter.name === 'delete') {

            const storageRef = ref(storage, imgUrl);
            deleteObject(storageRef).then(() => {
                console.log('foto deleted');
                updateProfile(auth.currentUser, {
                            photoURL: ''
                        });
                setImgUrl('');
            }).catch((error) => {
                    console.log('Uh-oh, an error occurred!', error); 
                });
        }
    }
    return (
        <>
            <form className="profile__form " action="" onSubmit={handleSubmitImg}>
                <h2 className="profile__form-heading">Фото:</h2>
                <div className="profile__form-content ">
                    <div className="profile__img-wrapper">
                        <img className="profile__img" src={imgUrl ? imgUrl : face} alt='uploaded file' />
                    </div>
                    <PhotoButtons />
                </div>
            </form>
            {error && <h2 className="error">{error}</h2>}
        </>

    )
}

export default ChangingPhoto;