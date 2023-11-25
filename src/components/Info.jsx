import '../css/Info.css';
import React, { memo, useEffect, useState } from 'react'

import { LineChart } from '@mui/x-charts/LineChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { fetchData1 } from './Data';
import { v4 as uuidv4 } from 'uuid';
import { FadeLoader } from 'react-spinners';
import DataTable from './DataTable';
import LeveleList from './LeveleList';


const Info = ()=> {
    const[containerWidth,setContainerWidth] = useState(0);
    
    const[time,setTime] = useState(["00:00"]);
    const[value,setValue] = useState([0]);

    const[loading,setLoading] = useState(true);
    const[weekly,setWeekly] = useState(false);

    const[data,setData] = useState([]);    

    // toggle buttons
    const [alignment, setAlignment] = useState('daily');
    const handleChange = (event, newAlignment) => {        
        setAlignment(newAlignment);
        if(newAlignment === 'weekly'){
            setWeekly(true);
            replcaeToWeeklyGraph();
        }else{
            setWeekly(false);
            changeGraphDate(formatDate());
        }
    };

    //menu items
    const [date, setDate] = useState('');
    const handleChangeDate = (event) => {
        setLoading(true)
        setDate(event.target.value);        
        changeGraphDate(event.target.value);        
    };

    const changeGraphDate = (selectedDate)=>{
        for (let i = 0; i < data.length; i++) {            
            if(selectedDate !== data[i][0].date) continue;

            let _value = [];
            let _time = [];            
            for (let j = 0; j < data[i].length; j++) {                
                _time.push(data[i][j].time);
                _value.push(data[i][j].value);                                                
            }                   
            setTime(_time);
            setValue(_value);                         
            setLoading(false);                     
        }
    }

    const replcaeToWeeklyGraph = ()=>{
        let _time = [];
        let _value = [];
        for (let i = 0; i < data.length; i++) {
            const arr = data[i];
            const split = arr[0].date.split("-");
            const _currentItemDate =  `${split[2]}.${split[1]}`;
            let max = data[i][0].value;
            let index = 0;
            for (let j = 0; j < arr.length; j++) { 
                if(max < arr[j].value){
                    max = arr[j].value;
                    index = j;
                }
            }
            _time.push(`${data[i][index].time}\n―𝅸𝅷𝅷𝅸𝅷𝅷\n${_currentItemDate}`)
            _value.push(data[i][index].value);            
        }
        setTime(_time);
        setValue(_value);
    }
    
    const dataBySelectedDate = ()=>{   
        let result = [];   
        if(weekly){
            for (let i = 0; i < data.length; i++) {
              let max = 0;  
              for (let j = 0; j < data[i].length; j++) {
                result.push(data[i][j]);                
              }            
            }
            return result.reverse();
        }

        for (let i = 0; i < data.length; i++) {
            if(data[i][0].date === date){
                result = data[i];
                break;
            }            
        }        
        return result;
    }

    const formatDate = ()=>{
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();    
        return `${yyyy}-${mm.toString().padStart(2, '0')}-${dd}`;
    }

    window.addEventListener('resize', function(event) {     
       if(this.window.screen > 767){
        console.log('true');
       }else{
        console.log('false');
       }        
    });
    
    useEffect(()=>{    
        (async function(){
            try{                              
                setData(await fetchData1());                                
            }catch(e){
                console.log(e);
            }finally{
               setDate(formatDate());
               if(alignment === 'daily'){
                    changeGraphDate(formatDate());   
               }else{
                     replcaeToWeeklyGraph();
               }                   
               const w = document.getElementById("container");
               setContainerWidth(w.offsetWidth);                                           
               setLoading(false);
            }
        })();        
    },[loading]);
    
  return (
    <section id="info-section" className="info-section">
        <div id="container" className="container">
            {
                loading ? <div className="loader"><FadeLoader color="#36d7b7"  /></div>
                :
                <div className="flex-box">
                    <div className="row">                
                        <ToggleButtonGroup    
                            className="toggle-btn"           
                            sx={{width:"9rem"}}
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="select"                        
                            >
                            <ToggleButton value="daily">Кун</ToggleButton>
                            <ToggleButton value="weekly">Ҳафта</ToggleButton>                    
                        </ToggleButtonGroup>       
                        <FormControl variant="filled" sx={{width:"9rem",pointerEvents: weekly ? "none" : "all",opacity: weekly ? "0.4" : "1" }} className="menu-item">
                            <InputLabel id="input">Сана</InputLabel>
                            <Select
                                labelId="date"
                                id="date"
                                value={date}
                                onChange={handleChangeDate}
                                label="Сана"                                
                                >                                                          
                                {                                
                                    loading ? "" : data.map(arr=>{return <MenuItem key={uuidv4()} value={arr[0].date}>{arr[0].date}</MenuItem> })                                
                                }                               
                            </Select>
                        </FormControl>    
                    </div>                    
                    <Stack className="line-chart" >
                        <LineChart                                                 
                            xAxis={[{ 
                                scaleType: 'point',
                                data: time
                            }]}
                            series={[
                                {
                                data: value,label:"Кп индеx"
                                }
                            ]}                                                  
                            width={window.screen.width > 765 ? (containerWidth - 80) : (containerWidth  - 32) }
                            height={window.screen.width > 765 ? 450 : 350}
                        />
                    </Stack>       
                    <LeveleList/>               
                    <DataTable data={dataBySelectedDate()}/>                    
                </div>                         
            }
            
        </div>
    </section>
  )
}

export default memo(Info);
