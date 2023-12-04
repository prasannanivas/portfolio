import React from 'react'
import topicon from "../../images/top.png";

function Backtotop() {
  return (
    <>
    {window.scrollY > 2000 && 
    <div style = {{
        position: 'fixed',
        right: "5vw",
        bottom: "5vh",
        zIndex: "100"
    }}>
        <a href = "#">
            <img alt = "" style = {{height:"40px", width:"40px", borderRadius: "50%"}}src = {topicon} />
        </a>
    </div>}
    </>
  )
}

export default Backtotop