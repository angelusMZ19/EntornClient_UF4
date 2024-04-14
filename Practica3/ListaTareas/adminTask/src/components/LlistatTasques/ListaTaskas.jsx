import React from 'react'
import { useState } from 'react';
import Form from '../Fomulari/FormulariTasques';
import Tareas from '../Tasques/Tareas';
import './ListaTaskas.css';

function ListaTaskas() {

    const[tasques, setTasques]= useState([]);

    const afegirTasca = tasca => {
        const tasquesActuals = [...tasques, tasca]; 
        setTasques(tasquesActuals);
        
        console.log(tasca)
    }

    const completarTasca = id => {
        let tasquesActuals = [...tasques]; 
        let tasca = tasquesActuals.find(tasca => tasca.id === id);
            tasca.completada = !tasca.completada;
        const index = tasquesActuals.findIndex(tasca => tasca.id === id);
        tasquesActuals[index] = tasca;
        setTasques(tasquesActuals);

        console.log(tasques)
    }
    


    const eliminarTasca = id => {
        setTasques([...tasques].filter((tasca) => tasca.id != id));
    }

    return (
        <>
            <div className='posicionForm'>
            <h1>Lista Tareas</h1>
            <Form funcAfegirTasca={afegirTasca} idTasca={tasques.length == 0 ? 0 : (tasques[tasques.length-1].id) + 1}/>
            
            {
                tasques.map((tasca) => (
                    <Tareas key={tasca.id} id={tasca.id} completada={tasca.completada} titol={tasca.titol} funcEliminarTasca={eliminarTasca} funcCompletarTasca={completarTasca}/>
                ))
            }
            </div>
        </>
    )
}

export default ListaTaskas