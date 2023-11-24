let stDate = "";
const time = ["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00"];

export async function fetchData1() {        
    let data = await fetchData2();
    const url = "https://services.swpc.noaa.gov/text/3-day-geomag-forecast.txt";

    try{
        const result = await fetch(url);
        const txt = await result.text();

        const subTxt = txt.substring(txt.indexOf("Kp index forecast")+18);
        const rows = subTxt.split("\n");            
        const startDate = parseInt(rows[0].split(" ")[0]);            
        const now = new Date();
        stDate = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${startDate}`;

        const data1 = await getKValues(rows,1,startDate);
        const data2 = await getKValues(rows,2,startDate+1);
        const data3 = await getKValues(rows,3,startDate+2);               
        data.push(data1);     
        data.push(data2);
        data.push(data3);        
    }catch(e){
        console.log(e);
    }
    //console.log(data);
  return data;
}

export async function fetchData2(){
    let data = [];
    try{
        const response = await fetch("https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json");        
        const result = await response.json();                
        let date = "";
        let _date = "";
        let _data = [];
        for (let index = 1; index < result.length; index++) {        
            _date = result[index][0].split(" ",2)[0];            
            if(_date === stDate) break;

            if(date !== _date){
                if(date !== ""){                   
                    data.push(_data);
                    _data = new Array();                    
                }
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



const getKValues = async(rows,columndIndex,day)=>{    
    let data = [];
    const now = new Date();

    try{        
        const date = `${now.getFullYear()}-${now.getMonth()+1}-${day}`;
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