import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { CiCircleChevLeft } from "react-icons/ci";
import MovieCard from '../components/C-MovieCard/MovieCard';
import db from '../config/config'; 

function MoviesList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const peliculesRef = collection(db, 'dbPelis');
            const q = query(peliculesRef);
            try {
                const querySnapshot = await getDocs(q);
                const movies = [];
                querySnapshot.forEach((doc) => {
                    movies.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setMovies(movies);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getMovies();
    }, []); 

    return (
        <>
            <Link to="/"><CiCircleChevLeft size={25}/></Link>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    descripcio={movie.descripcio}
                    imagen={movie.imagen}
                    director={movie.director}
                    nota={movie.nota}
                    any={movie.any}
                    durada={movie.durada}
                />
            ))}
        </>
    );
}

export default MoviesList;
