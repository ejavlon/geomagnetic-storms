import '../css/LevelList.css';
import React, { memo } from 'react'

export const LeveleList = memo(() => {    
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
            <div className="level-8"></div>&nbsp; Жуда кучли бўрон
        </div>
        <div className="level">
            <div className="level-9"></div>&nbsp; Экстремал бўрон
        </div>
    </div>
  )
});