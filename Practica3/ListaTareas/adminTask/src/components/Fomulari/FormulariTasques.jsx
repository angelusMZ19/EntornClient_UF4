import React from 'react'
import { useState } from 'react';

function Form(props) {

    const[textTasca, setTextTasca]= useState("");

    const canviTextTasca = e => {
        setTextTasca(e.target.value);
        console.log('value is:', e.target.value);
    };
        

    const enviarForm = e => {
        e.preventDefault();
        if (textTasca != "") {
            const tascaNova = {
                titol: textTasca,
                completada: false,
                id: props.idTasca
            }
            props.funcAfegirTasca(tascaNova);
        }
    }

    return (
        <>
            <form onSubmit={enviarForm}>
                <input type="text" onChange={canviTextTasca} /><button>Agregar Tarea</button>
            </form>
        </>
    )
}

export default Form