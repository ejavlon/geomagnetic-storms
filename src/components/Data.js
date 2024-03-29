import { useMemo } from "react";

let stDate = "";
const time = ["02:00","05:00","08:00","11:00","14:00","17:00","20:00","23:00"];

 export const fetchData1 = async() => {        
    let data = [];
    const url = "https://services.swpc.noaa.gov/text/3-day-geomag-forecast.txt";

    try{
        const result = await fetch(url);
        const txt = await result.text();

        const subTxt = txt.substring(txt.indexOf("Kp index forecast")+18);
        const rows = subTxt.split("\n");            
        const startDate = parseInt(rows[0].split(" ")[0]);            
        const now = new Date();
        stDate = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${startDate}`;
        data = await fetchData2();        

        const data1 = await getKValues(rows,1,0);
        const data2 = await getKValues(rows,2,1);
        const data3 = await getKValues(rows,3,2);               
        data.push(data1);     
        data.push(data2);
        data.push(data3);        
    }catch(e){
        console.log(e);
    }        

    for (let i = 0; i < data.length; i++) {        
        for (let j = 0; j < data[i].length; j++) {
            if(i === 0) 
                data[i][j].time = time[j+1];
            else                
                data[i][j].time = time[j];
        }

        if(i !== data.length-1){
            data[i+1].unshift(data[i].pop());
            data[i+1][0].date = data[i+1][1].date;
        }
    }
    data[data.length-1].pop();

    return data;
}


const fetchData2 = async() => {
    let data = [];
    try{
        const response = await fetch("https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json");        
        const result = await response.json();                
        let date = "";
        let _date = "";
        let _data = [];
        for (let index = 1; index < result.length; index++) {        
            _date = result[index][0].split(" ",2)[0];   
            if(date !== _date){
                if(date !== ""){                   
                    data.push(_data);
                    _data = new Array();                    
                }
                if(_date === stDate) break;                

                date = _date;
            }
            _data.push({
                "date" : _date,
                "time" : result[index][0].split(" ",2)[1].substring(0,5),
                "value" : parseFloat(result[index][1])
            });                                      
        }               
    }catch(e){            
        console.log(e);
    }
    
    return data;
}

const getKValues = async(rows,columndIndex,day) => {    
    let data = [];
    let _date = new Date(stDate);
    _date.setDate(_date.getDate() + day);    

    try{        
        const date = `${_date.getFullYear()}-${(_date.getMonth()+1).toString().padStart(2,'0')}-${(_date.getDate()).toString().padStart(2,'0')}`;    
        const inx = columndIndex === 1 ? 8 : columndIndex === 2 ? 14 : 20;        
        for (let index = 2; index < rows.length-1; index++) {            
            data.push({
                "date" : date,
                "time" : time[index-2],
                "value" : parseFloat(rows[index].split(" ")[inx])
            });
        }        
    }catch(e){
        console.log(e);
    }    
    return data;
}