import React from 'react'
import { Link } from 'react-router-dom'
import "./Card.css";



function Card(props) {
    return (
        <>
            <div className='card'>
                <img src={props.image} className="img-pelicules" />
                <br />
                <Link to={props.link}>{props.title}</Link> 
            </div>
        </>
    )
   


}

export default Card