import { useNavigate } from "react-router-dom";
import BasicButton from "../../UI components/BasicButton";

const ReadBtn = ({ book }) => {

    const navigate = useNavigate();

    const onRead = () => navigate(`/read/${book.id}`)
    const vision = book.accessInfo.viewability === "NO_PAGES";

    return (
        <BasicButton textBtn={"ЧИТАТЬ"} vision={vision} handleDoing={onRead} />
    )
}

export default ReadBtn;