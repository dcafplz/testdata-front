import React , { useState, useEffect} from "react";
import ApexCharts from 'react-apexcharts'
import {
    TextField,
    MenuItem,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
  } from '@mui/material/';

import styled from "styled-components";

function randn_bm(avg, sigma) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
      num = randn_bm(avg, sigma) // resample between 0 and 1 if out of range
    
    else{
      num *= sigma // Stretch to fill range
      num += avg // offset to min
    }
    return num
}


function NumericDetailOptionModal({open, handleClose, option, numeric, setNumeric}){

    const distributionList = ["Uniform distribution", "Nomal distribution"];
    const [result, setResult] = useState([]);

    const [numericDetail, setNumericDetail] = useState({
        mind: numeric.min,
        maxd: numeric.max,
        decimalPointd: numeric.decimalPoint,
        distributiond: numeric.distribution,
        avgd: numeric.avg,
        standardDeviationd: numeric.standardDeviation
    });


    useEffect(() => {
        numericDetail.mind = numeric.min;
        numericDetail.maxd = numeric.max;
        numericDetail.decimalPointd = numeric.decimalPoint;
        numericDetail.distributiond = numeric.distribution;
        numericDetail.avgd = numeric.avg;
        numericDetail.standardDeviationd = numeric.standardDeviation;
    },[numeric])

    const gaussianRandom = () => {
      let ramdomNum = 0;
      let tempResult = [];
      let j = 0;
      for(let i = 0; i < 1000 + j; i++ ){

          ramdomNum = randn_bm(parseFloat(numericDetail.avgd === "" ? "0" : numericDetail.avgd), parseFloat(numericDetail.standardDeviationd === "" ? "0" : numericDetail.standardDeviationd));
          if (ramdomNum >= parseInt(numericDetail.mind === "" ? "0" : numericDetail.mind) && ramdomNum <= parseInt(numericDetail.maxd === "" ? "0" : numericDetail.maxd)) {
              tempResult.push(ramdomNum.toFixed(2));
    } else {
      j++;
    }
      }

      const unordered = tempResult.reduce((accu, curr) => { 
          accu[curr] = (accu[curr] || 0)+1; 
          return accu;
        }, {});
      const ordered = {};

      Object.keys(unordered).sort().forEach(function(key) {
          ordered[key] = unordered[key];
      })
      
      setResult(ordered);
  };


    const changeNumericDetail = (event) => {
      numericDetail[event.target.name] = event.target.value;
        if (parseInt(numericDetail.maxd === "" ? "0" : numericDetail.maxd) > parseInt(numericDetail.mind === "" ? "0" : numericDetail.mind)) {
          if(parseInt(numericDetail.avgd === "" ? "0" : numericDetail.avgd) >= parseInt(numericDetail.mind === "" ? "0" : numericDetail.mind)) {
            if(parseInt(numericDetail.avgd === "" ? "0" : numericDetail.avgd) < parseInt(numericDetail.maxd === "" ? "0" : numericDetail.maxd)) {
              setNumericDetail({...numericDetail});
              gaussianRandom();
            }else{
              alert("최대값은 평균보다 작을 수 없다")
            }
          }else{
            alert("최소값은 평균보다 클 수 없다")
          }
        }else{
          alert("최대값은 최소값보다 작을 수 없다")
        }
      };
    
    const apply = () => {
        numeric.min = numericDetail.mind;
        numeric.max = numericDetail.maxd;
        numeric.decimalPoint = numericDetail.decimalPointd;
        numeric.distribution = numericDetail.distributiond;
        numeric.avg = numericDetail.avgd;
        numeric.standardDeviation = numericDetail.standardDeviationd;
    };
    
    const chartState = {
          
      series: [{
        name: "nomal",
        data: Object.values(result)
      }],
      options: {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        
        title: {
          text: '그래프',
          align: 'left'
        },
        subtitle: {
          text: '정규분포',
          align: 'left'
        },
        labels: Object.keys(result),
        xaxis: {
          type: 'number',
        },
        yaxis: {
          opposite: true
        },
        legend: {
          horizontalAlign: 'left'
        }
      },
    
    };

    return(
        <Dialog 
            open={open} 
            onClose={() => handleClose()}
            maxWidth="lg"
            fullWidth={true}>            
        <DialogTitle>사용자 정의 설정</DialogTitle>            
        <DialogContent dividers>
                <DialogContentText>숫자 범위를 자유롭게 선택하세요</DialogContentText><br/>
                <PointInput onChange={changeNumericDetail} name="mind" label="Min" variant="outlined" type="number" required value={numericDetail.mind}/>
                <PointInput onChange={changeNumericDetail} name="maxd" label="Max" variant="outlined" type="number" required value={numericDetail.maxd}/>
                {option == "Numeric" && <PointInput onChange={changeNumericDetail} name="decimalPointd" label="Decimal point(0~10)"
                variant="outlined" type="number" required value={numericDetail.decimalPointd} InputProps={{ inputProps: { min: 0, max: 10} }}/>}
                <TextField select onChange={changeNumericDetail} name="distributiond" label="Distribution" value={numericDetail.distributiond}  required>
                    {distributionList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
                </TextField>
                {(numericDetail.distributiond == "Nomal distribution" ? true : false) && <>
                <PointInput onChange={changeNumericDetail} name="avgd" label="Avg" variant="outlined" type="number" required value={numericDetail.avgd}/>
                <PointInput onChange={changeNumericDetail} name="standardDeviationd" label="standard deviation" variant="outlined" type="number" required value={numericDetail.standardDeviationd}/>
                <div id="chart">
                  <ApexCharts options={chartState.options} series={chartState.series} type="area" height={350} />
                </div>
                </>
                }<br/>
               
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {apply(); handleClose()}}>적용</Button> 
            <Button onClick={() => handleClose()}>취소</Button>
            </DialogActions>
          </Dialog>
    );
};

export default NumericDetailOptionModal;

const PointInput = styled(TextField)`
  width: 150px`;