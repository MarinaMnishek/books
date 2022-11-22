import * as React from 'react';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
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

export default function Sorting({ sortBooks, toSortBooks, books }) {

    const style = {
        marginBottom: "20px"
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
        console.log(param);
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
            >
                <div>Фильтры</div>
            </AccordionSummary>
            <AccordionDetails>
                <ButtonGroup aria-label="outlined primary button group"
                    sx={style} >
                    {/* <Button onClick={() => sortBooks(books, 'title')}>Название</Button>
                    <Button onClick={() => sortBooks(books, 'authors[0]')}>Автор</Button>
                    <Button onClick={()=> handleClick('&orderBy=newest')}>Сначала новые</Button>
                    <Button onClick={()=> handleClick('&langRestrict=el')}>RU</Button>
                    <Button onClick={()=> handleClick('&download=epub')}>epub</Button>
                    <Button onClick={() => sortBooks(books, 'categories')}>Категория</Button> */}
                    <Button onClick={() => handleClick('&orderBy=newest')}>Сначала новые</Button>
                    <Button onClick={() => handleClick('&filter=free-ebooks')}>Бесплатные</Button>
                    <Button onClick={() => handleClick('&filter=paid-ebooks')}>Платные</Button>
                    <Button onClick={() => handleClick('&printType=books')}>Книги</Button>
                    <Button onClick={() => handleClick('&printType=magazines')}>Журналы</Button>
                    <Button onClick={() => handleClick('&download=epub')}>epub</Button>
                    <FormControl sx={{ minWidth: "150px" }}>
                        <InputLabel id="demo-simple-select-label" sx={{ color: "#1B3764" }}>Язык</InputLabel>
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