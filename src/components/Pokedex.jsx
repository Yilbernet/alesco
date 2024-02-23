import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Header, Image, Icon, Grid } from 'semantic-ui-react';
import GetPokemons from './GetPokemons';
import axios from 'axios';

const Pokedex = () => {
    const navigate = useNavigate();
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getAllPokemons();
    }, []);

    const getAllPokemons = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279`)
            .then(res => setPokemons(res.data))
    }

    return (
        <Container fluid>
            <Button animated onClick={() => navigate(-1)} floated='right' style={{ border: "none", padding: "0.5rem", marginTop: "3rem", marginRight: "1rem" }}>
                <Button.Content visible>Go Back</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right' />
                </Button.Content>
            </Button>
            <Header as="h1" fluid style={{ background: 'linear-gradient(rgba(252, 0, 0, 0.91), rgba(100, 100, 100, 0.91))', border: "none", padding: "0rem", marginTop: "auto", height: "7rem" }}>
                <Image src='./Fondos/pikachuF.png' fluid />Pokedex
            </Header>

            <Grid stackable centered>
                <Grid.Row >
                    <Grid.Column mobile={2} tablet={16} computer={16}>
                        <GetPokemons pokemons={pokemons} setPokemons={setPokemons} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Pokedex;
