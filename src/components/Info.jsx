import '../css/Info.css';
import React, { memo, useEffect, useState } from 'react'

import { LineChart } from '@mui/x-charts/LineChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import { ChartsReferenceLine } from '@mui/x-charts';
import { fetchData1 } from './Data';
import { v4 as uuidv4 } from 'uuid';
import { FadeLoader } from 'react-spinners';


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
            changeGraphDate(formatDaete());
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
                // _time.push(`${arr[j].time}\n${_currentItemDate}`)
                // _value.push(arr[j].value);
            }
            _time.push(`${data[i][index].time}\n―𝅸𝅷𝅷𝅸𝅷𝅷\n${_currentItemDate}`)
            _value.push(data[i][index].value);            
        }
        setTime(_time);
        setValue(_value);
    }

    const checkWindowWidth = ()=>{
        const _width = window.innerWidth;
        if(_width > 767) return;

        const lineChartWrapper = document.getElementById("line-chart");


    }

    const formatDaete = ()=>{
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();    

        return `${yyyy}-${mm.toString().padStart(2, '0')}-${dd}`;
    }

    window.addEventListener('resize', function(event) {        
        setLoading(true);
    });
    
    useEffect(()=>{    
        (async function(){
            try{                
                setData(await fetchData1());                                
            }catch(e){
                console.log(e);
            }finally{
               setDate(formatDaete());
               if(alignment === 'daily'){
                    changeGraphDate(formatDaete());   
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
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="select"                        
                            >
                            <ToggleButton value="daily">Кун</ToggleButton>
                            <ToggleButton value="weekly">Ҳафта</ToggleButton>                    
                        </ToggleButtonGroup>       
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, pointerEvents: weekly ? "none" : "all",opacity: weekly ? "0.4" : "1" }} className="menu-item">
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
                    
                    <div id="line-chart" className="line-chart">
                        <LineChart                                                 
                            xAxis={[{ scaleType: 'point', data: time}]}
                            series={[
                                {
                                data: value,label:"Кп индеx"
                                }
                            ]}                                                  
                            width={window.screen.width > 765 ? (containerWidth - 80) : (containerWidth  - 32) }
                            height={window.screen.width > 765 ? 450 : 350}
                        />                        
                    </div>               
                </div>
            }
        </div>
    </section>
  )
}

export default memo(Info);
