import React from 'react'
import './Boton.css'

function Boton(props) {

    let btnClass = props.esClick == true ? "btnClick" : "btnReiniciar";

    return (
        <button className={btnClass} onClick={props.onclick}>{props.text}</button>
    )
}

export default Boton