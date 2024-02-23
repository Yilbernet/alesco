import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import ByType from './ByType';
import Card from './Card';
import Pagination from './Pagination';
import PokemonSearch from './PokemonSearch';



const GetPokemons = ({ pokemons, setPokemons }) => {
    
    const [page, setPage] = useState(1);
    const perPage = 20;
    const lastIndex = perPage * page;

    const getByType = (url) => {
        setPage(1);
        axios.get(url)
            .then(res => setPokemons(res.data))
            .catch(error => console.error('Error fetching Pokemon data:', error));
    }
   
    const getBySearch = (searchResult) => {
        setPage(1);
        setPokemons([searchResult]);
    }

    let shortRoutePokemons;
    let shortRouteCount;
    const route = () => {
        if (pokemons?.results) {
            shortRoutePokemons = pokemons?.results;
            shortRouteCount = pokemons?.count;
        } else {
            shortRoutePokemons = pokemons.pokemon;
            shortRouteCount = pokemons.pokemon?.length;
        }
    };
    route();

    const totalPages = Math.ceil(shortRouteCount / perPage);
    const pokemonsToShow = shortRoutePokemons?.slice(lastIndex - perPage, lastIndex);
    const arrayIteracion = [];
    const iteracion = () => {
        for (let i = 1; i <= totalPages; i++) {
            arrayIteracion.push(i);
        }
    };
    iteracion();

    let acces;
    const selectAcces = () => {
        if (totalPages > 10) {
            if (page > totalPages - 5) {
                acces = arrayIteracion.slice(totalPages - 10, totalPages);
            } else if (page > 5) {
                acces = arrayIteracion.slice(page - 5, page + 5);
            } else {
                acces = arrayIteracion.slice(0, 10);
            }
        } else {
            acces = arrayIteracion.slice(0, totalPages);
        }
    };
    selectAcces();
    const gridBackgroundStyle = {
        backgroundImage: "url('./Fondos/pikachuF.png')", 
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        border: 'none',
        padding: '0.5rem',
        // marginTop: '1rem',
        // background: 'linear-gradient(rgba(229, 255, 0, 0.81), rgba(100, 100, 100, 0.91))', border:"none", padding:"0.5rem", marginTop:"1rem"
     };

    return (
        <Grid style={gridBackgroundStyle}mobile={16} tablet={16} computer={16}>
            <Grid.Row style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.99), rgba(55, 55, 55, 0.9))', border:"none", padding:"0.1rem", marginTop:"-0.5rem", height:"9rem" }}>
                <Grid.Column   >
                   
                       <PokemonSearch getBySearch={getBySearch} />
                   
            <Segment   style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.91), rgba(200, 200, 200, 0.91))', border:"none", padding:"0", marginTop:"0", height:"3.5rem" ,with:"100%" }}>
    <ByType getByType={getByType} />
</Segment>

                </Grid.Column >  
            </Grid.Row >



        
            <Grid.Row >
                {pokemonsToShow?.map((pokemon) => (
                    <Grid.Column  key={pokemon.url ? pokemon.url : pokemon.pokemon.url}  mobile={16} tablet={8} computer={4} doubling stackable>
                        <Segment textAlign="center" style={{ background: 'linear-gradient(rgba(229, 255, 0, 0.81), rgba(100, 100, 100, 0.91))', border:"none", padding:"0.5rem", marginTop:"7rem" }}>
                            <Card 
          
                                url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                                spriteUrl={pokemon.spriteUrl}
                            />
                        </Segment>
                    </Grid.Column>
                ))}
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16} style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.81), rgba(100, 100, 100, 0.91))', border:"none", padding:"0.5rem", marginTop:"auto" }}>
                    {acces.map((num) => (
                        <Pagination num={num} key={num} setPage={setPage}  />
                    ))}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default GetPokemons;

