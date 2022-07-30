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

import axios from 'axios';

const Home = (props) => {

  const dataTypeList = ["SQL", "JSON", "CSV", "EXCEL(.xls)"]

  const [dataType, setDataType] = useState('');

  const handleChangeDataType = (event) => {
    setDataType(event.target.value);
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



  // test 함수
  async function testAxios(url) {
    await axios(
      {
        method: 'post',
        baseURL: 'http://localhost:80',
        withCredentials: true,
      }
    ).then(function (response) {
      alert(response.data);
      console.log("성공");
    }).catch(function (error){
      alert(error);
      console.log("에러");
    });
  };

  return (
<AppLayout>
    <FormControl>
      <ElementsBoard item={item} setItem={setItem} add={add} onRemove={onRemove}/>
      <TextField select label="Datatype" variant="outlined" value={dataType} onChange={handleChangeDataType} required>
                {dataTypeList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
      </TextField>
      <TextField name="dataSize" label="DataSize(1~5000)" variant="outlined" type="number" required defaultValue="100" InputProps={{ inputProps: { min: 1, max: 5000 } }}/>
      <Button type="submit" fullWidth>Generate Data</Button>
    </FormControl>
    <Button fullWidth onClick={() => testAxios('/api')}>비동기 테스트</Button>
  </AppLayout>
  );
};

export default Home;