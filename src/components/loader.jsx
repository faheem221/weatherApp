import React from 'react'
import './styles.css'
const loader = () => {
  return (
    <div className="w-[50%] overflow-x-hidden h-[90%] rounded-lg bg-slate-100 relative">
      <div className="loader w-[20%] h-full bg-slate-200 absolute "></div>
    </div>
  );
}


export default loader
