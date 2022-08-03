import React, { useState, useRef  } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
  FormGroup,
  MenuItem ,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ElementsBoard from "./ElementsBoard"
import AppLayout from "../components/common/AppLayout";

import axios, { Axios } from 'axios';

const Home = (props) => {

  const dataTypeList = ["SQL", "JSON", "CSV", "EXCEL(.xls)"]

  const [dataType, setDataType] = useState('');
  const [dataSize, setDataSize] = useState(100);

  const handleChangeDataType = (event) => {
    setDataType(event.target.value);
  };

  const handleChangeDataSize = (event) => {
    setDataSize(event.target.value);
  };

  const nextId = useRef(4);
  const [item, setItem] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    }
  ])

  const onRemove = id => {
    setItem(item.filter(i => i.id !== id));
  };

  const add = () => {
    const nextItem = {
      id: nextId.current
    };
    setItem(item.concat(nextItem));
    nextId.current += 1;
  }

  function submit(url){
    axios({
      method: 'get',
      url: "http://localhost:80"+url,
      params: {
        dataType: dataType,
        dataSize: dataSize,
        item: encodeURIComponent(item)
      }
    }).then(function (response) {
      alert(response.data);
    }).catch(function (error) {
      alert(error);
    });
  }


  return (
<AppLayout>
    <FormControl >
      <ElementsBoard item={item} setItem={setItem} add={add} onRemove={onRemove}/>
      <TextField select label="Datatype" variant="outlined" value={dataType} onChange={handleChangeDataType} required>
                {dataTypeList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
      </TextField>
      <TextField name="dataSize" label="DataSize(1~5000)" variant="outlined" type="number" required value={dataSize} onChange={handleChangeDataSize} InputProps={{ inputProps: { min: 1, max: 5000 } }}/>
      <Button onClick={() => submit("/recive")}>Generate Data</Button>
    </FormControl>
  </AppLayout>
  );
};

export default Home;