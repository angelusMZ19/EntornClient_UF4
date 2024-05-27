import React from 'react'
import db from "../../config/config"
import { collection, doc, setDoc } from "firebase/firestore"; 
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleChevLeft } from "react-icons/ci";

function MoviesAdd(props) {
    const [formData, setFormData] = useState({
        title: "",
        descripcio: "", 
        director: "",
        durada: "",
        imagen: "",
        nota: "",
        any: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const afegirPelicula = async (e) => {
        e.preventDefault();

        try {
            const peliRef = collection(db, 'dbPelis')
            await setDoc(doc(peliRef), formData);
            alert("Añadida Pelicula");
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    return(
        <>
            <Link to="/"><CiCircleChevLeft size={25}/></Link>
            <form onSubmit={afegirPelicula}>
                <label htmlFor="title">Títol:</label><br />
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required /><br />

                <label htmlFor="description">Descripció:</label><br />
                <input type="text" id="description" name="descripcio" value={formData.descripcio} onChange={handleChange} required /><br />

                <label htmlFor="direction">Direcció:</label><br />
                <input type="text" id="direction" name="director" value={formData.director} onChange={handleChange} required /><br />

                <label htmlFor="image">Imatge (URL):</label><br />
                <input type="text" id="image" name="imagen" value={formData.imagen} onChange={handleChange} required /><br />
                
                <label htmlFor="rate">Nota (1/5):</label><br />
                <input type="text" id="rate" name="nota" value={formData.nota} onChange={handleChange} required /><br />

                <label htmlFor="year">Any:</label><br />
                <input type="text" id="year" name="any" value={formData.any} onChange={handleChange} required /><br />

                <label htmlFor="duration">Durada (min):</label><br />
                <input type="text" id="duration" name="durada" value={formData.durada} onChange={handleChange} required /><br />

                <input type="submit" />
            </form>
        </>
    )
}

export default MoviesAdd
