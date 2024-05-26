import React from 'react'
import Card from '../components/C-Card/Card'

function IndexMenu() {
    return (
        <>
            <Card link="/movies/list" title="Listado de Peliculas" image="/src/img/movies.png" />
            <Card link="/movies/add" title="Agrega Peliculas" image="/src/img/addmovie.png" />
        </>
      )
}

export default IndexMenu;