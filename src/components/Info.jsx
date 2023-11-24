import '../css/Info.css';
import React, { memo, useEffect, useState } from 'react'

import { LineChart } from '@mui/x-charts/LineChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { fetchData1 } from './Data';
import { v4 as uuidv4 } from 'uuid';
import { FadeLoader } from 'react-spinners';


const Info = ()=> {
    const[containerWidth,setContainerWidth] = useState(0);
    //times
    const[dailyTime,setDailiyTime] = useState(["00:00"]);
    const[weeklyTime,setWeeklyTime] = useState([]);
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
        }else{
            setWeekly(false);
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
            setDailiyTime(_time);
            setValue(_value);                         
            setLoading(false);                     
        }
    }

    const formatDaete = ()=>{
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();    

        return `${yyyy}-${mm.toString().padStart(2, '0')}-${dd}`;
    }
    
    useEffect(()=>{    
        (async function(){
            try{                
                setData(await fetchData1());                                
            }catch(e){
                console.log(e);
            }finally{
               setDate(formatDaete());
               changeGraphDate(formatDaete());
               setLoading(false);             
               const w = document.getElementById("container");
               setContainerWidth(w.offsetWidth);     
            }
        })();        
    },[loading]);
    
  return (
    <section id="info-section" className="info-section">
        <div id="container" className="container">
            {
                loading ? <FadeLoader className="loader" color="#36d7b7"  />
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
                            <ToggleButton value="daily">Kunlik</ToggleButton>
                            <ToggleButton value="weekly">Haftalik</ToggleButton>                    
                        </ToggleButtonGroup>       
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, display: weekly ? "none" : "inline-flex" }} className="menu-item">
                            <InputLabel id="input">Sana</InputLabel>
                            <Select
                                labelId="date"
                                id="date"
                                value={date}
                                onChange={handleChangeDate}
                                label="Sana"                                
                                >                                                          
                                {                                
                                    loading ? "" : data.map(arr=>{return <MenuItem key={uuidv4()} value={arr[0].date}>{arr[0].date}</MenuItem> })                                
                                }                               
                            </Select>
                        </FormControl>    
                    </div>                    
                    <div className="line-chart">
                        <LineChart                            
                            
                            xAxis={[{ scaleType: 'point', data: dailyTime }]}
                            series={[
                                {
                                data: value,
                                },
                            ]}                        
                            width={window.screen.width > 765 ? (containerWidth - 80) : (window.screen.width - 32) }
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
