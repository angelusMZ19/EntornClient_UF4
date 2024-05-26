import React from 'react';
import { CiTrash } from "react-icons/ci";
import { collection, doc, deleteDoc } from 'firebase/firestore';
import db from '../../config/config'; 
import "./MovieCard.css";

function MovieCard(props) {
    console.log(props); 

    const deletePelicula = async (id) => {
        console.log(id);
        if (confirm("Seguro quieres eliminarlo?")) {
            try {
                const peliculesRef = collection(db, 'dbPelis');
                await deleteDoc(doc(peliculesRef, id));
                console.log("Pelicula borrada");
                location.reload();
            } catch (error) {
                console.error('Error: ', error);
            }
        }        
    }

    return (
        <>
            <figure className="movie">
                <div className="movieHead">
                    <img src={props.imagen} alt={props.title} className="movieImg" onError={(e) => console.error("Error al cargar la imagen", e)} />
                </div>
                <div className="m_content">
                    <div className="m_title">
                        <h1 className="heading_primary">{props.title}</h1>
                        <div className="m_nota">{props.nota}/5</div>
                    </div>
                    <p className="m_desc">{props.descripcio}</p>
                    <div className="m_details">
                        <p className="m_detail">{props.director}</p>
                        <p className="m_detail">{props.durada}min</p>
                    </div>
                </div>
                <button className='delete' onClick={() => deletePelicula(props.id)}><CiTrash size={32} /></button>
            </figure>
        </>
    );
}

export default MovieCard;
