import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import uniqid from "uniqid";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasicButton from './BasicButton';

export default function Sorting({ toSortBooks }) {

    const style = {
        marginBottom: "20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px"
    }

    const listOfLanguages = [
        {
            code: "",
            name: "Любой"
        },
        {
            code: "&langRestrict=ru",
            name: "Русский"
        },
        {
            code: "&langRestrict=en",
            name: "Английский"
        },
        {
            code: "&langRestrict=de",
            name: "Немецкий"
        },
    ]

    const handleClick = (param) => {
        toSortBooks(param);
    }

    const [language, setLanguage] = React.useState("");

    const handleChange = (event) => {
        setLanguage(event.target.value);
        handleClick(event.target.value);
    };

    return (
        <Accordion sx={{ display: "contents" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    borderRadius: "8px",
                    border: "3px solid #FFCA42 ",
                    fontWeight: "500",
                    fontSize: "20px",
                    margin: "0 0 10px 0"
                }}
            >
                <div>Фильтры</div>
            </AccordionSummary>
            <AccordionDetails>
                <ButtonGroup aria-label="outlined primary button group"
                    sx={style} >
                    <BasicButton handleDoing={() => handleClick('&orderBy=newest')} textBtn={"Сначала новые"} />
                    <BasicButton handleDoing={() => handleClick('&filter=free-ebooks')} textBtn={"Бесплатные"} />
                    <BasicButton handleDoing={() => handleClick('&filter=paid-ebooks')} textBtn={"Платные"} />
                    <BasicButton handleDoing={() => handleClick('&printType=books')} textBtn={"Книги"} />
                    <BasicButton handleDoing={() => handleClick('&printType=magazines')} textBtn={"Журналы"} />
                    <BasicButton handleDoing={() => handleClick('&download=epub')} textBtn={"epub"} />
                    <FormControl sx={{
                        minWidth: "100px",
                        borderRadius: "8px",
                        border: "3px solid #FFCA42 "
                    }}>
                        <InputLabel id="demo-simple-select-label"
                            sx={{
                                color: "#1B3764",
                            }}>Язык</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={language}
                            label="Язык"
                            onChange={handleChange}
                        >
                            {listOfLanguages.map(el => {
                                if (el.code == "") {
                                    return <MenuItem key={uniqid()} value={el.code} selected>{el.name}</MenuItem>
                                } else {
                                    return <MenuItem key={uniqid()} value={el.code}>{el.name}</MenuItem>
                                }
                            })}
                        </Select>
                    </FormControl>
                </ButtonGroup>
            </AccordionDetails>
        </Accordion>
    );
}