import React , { useState } from "react";
import '../App.css';
import {
    TextField,
    MenuItem, 
    Button,
    useThemeProps,
  } from '@mui/material/';;

function DateDetailOption({setItem, item, index}){


    const [date, setDate] = useState({
        startDate: "2000-01-01",
        lastDate: "2021-12-31"
    });

    function changeDate(event){
        date[event.target.name] = event.target.value;
        setDate({...date});
        const items = [...item];
        items[index].settings = date;
        setItem([...items]);
      };

    return(
        <>
            <TextField onChange={changeDate} name="startDate" label="startDate" variant="outlined" type="date" required value={date.startDate}/>
            <TextField onChange={changeDate} name="lastDate" label="lastDate" variant="outlined" type="date" required value={date.lastDate}/>
        </>
    );
};

export default DateDetailOption;