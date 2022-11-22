import BasicButton from "../../UI components/BasicButton";


const DownloadBtn = ({ authed, link }) => {

    const onDownload = () => window.location.href = link

    return (
        <BasicButton textBtn={"СКАЧАТЬ"} authed={authed} vision={!link} handleDoing={onDownload} />
    )
}





export default DownloadBtn;