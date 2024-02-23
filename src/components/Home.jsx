import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../store/slices/userName.slice';
import { Button, Container, Header, Input, Image } from 'semantic-ui-react';

const Home = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goPokedex = () => {
        dispatch(getUsername(name));
        navigate("/pokedex")
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            goPokedex();
        }
    };

    const formatName = (input) => {
        
        return input.charAt(0).toUpperCase() + input.slice(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        goPokedex();
    };
    return (
        <div style={{ position: 'relative' }}> 
            <Image src='./Fondos/pokeballF.png'  /> 
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '80%' }}> 
            <Image src='./Fondos/PokeLetras.jpg'size='big' centered  style={{ background: 'linear-gradient(rgba(229, 255, 0, 0.81), rgba(100, 100, 100, 0.91))', border: "none", padding: "0.5rem", marginTop:"6rem", }}/> 
                <Header as="h1" style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.81), rgba(100, 100, 100, 0.91))', border: "none", padding: "0.5rem", marginTop: "1rem" }}>Welcome to the Pokédex!</Header>
                <Input
                    placeholder="Enter your name..."
                    value={name}
                    onChange={e => setName(formatName(e.target.value))}
                        onKeyPress={handleEnterKeyPress}
                        action={
                        <Button color="teal" onClick={goPokedex}>
                            Go
                        </Button>
                    }
                />
            </div>
        </div>
    );
};

export default Home;
