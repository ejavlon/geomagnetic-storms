import React, { memo } from 'react'
import '../css/LevelList.css';

const LeveleList =()=> {
  return (
    <div className="level-list">
        <div className="level">
            <div className="level-4"></div>&nbsp; Кичик бўрон
        </div>        
        <div className="level">
            <div className="level-5"></div>&nbsp; Унча катта бўлмаган бўрон
        </div>
        <div className="level">
            <div className="level-6"></div>&nbsp; Ўртача бўрон
        </div>
        <div className="level">
            <div className="level-7"></div>&nbsp; Кучли бўрон
        </div>
        <div className="level">
            <div className="level-8"></div>&nbsp; Жуда кучлик бўрон
        </div>
        <div className="level">
            <div className="level-9"></div>&nbsp; Экстремал бўрон
        </div>
    </div>
  )
}

export default memo(LeveleList);