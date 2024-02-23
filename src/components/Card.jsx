    import axios from 'axios';
    import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Image, Segment, Label, Placeholder } from 'semantic-ui-react';
    import PokeballLoader from './PokeballLoader';

    const Card = ({ url }) => {
        const [pokemon, setPokemon] = useState({});
        const [loading, setLoading] = useState(true);
        const [hovering, setHovering] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            axios.get(url)
                .then(res => {
                    setPokemon(res.data);
                
                    setTimeout(() => {
                        setLoading(false);
                    }, 1500);
                })
                .catch(error => console.error('Error fetching Pokemon data:', error));
        }, [url]);

        const loadPokemonImage = (id) => {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        };

        const loadHoverPokemonImage = (id) => {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
        };

        const dressUpPayloadValue = (name) => {
            if (name && typeof name === 'string') {
                return name.charAt(0).toUpperCase() + name.slice(1);
            } else {
                return ''; 
            }
        };
        const imageSize = hovering ? '120px' : '130px';
        const bgColor = pokemon.types ? FondoCardsColors[pokemon.types[0]?.type.name] : '#FFFFFF';

        return (
            <Segment 
                onClick={() => navigate(`/pokedex/${pokemon.id}`)}
                style={{ background: bgColor, cursor: 'pointer', position: 'relative' }}
                className="pokemon-card" 
                onMouseEnter={() => setHovering(true)} 
                onMouseLeave={() => setHovering(false)} 
            >
                {loading ? ( 
                    <Placeholder style={{ height: 50, width: 50,  }}>
                    
                            <PokeballLoader />
                    
                    </Placeholder >
                ) : (
                    <Image src={hovering ? loadHoverPokemonImage(pokemon.id) : loadPokemonImage(pokemon.id)} alt="" size="medium" style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translate(-50%, -50%)', width: imageSize, height: imageSize, zIndex: '2' }} />
                )}
                <Label color="teal" ribbon style={{ position: 'absolute', top: '1%', left: '5%', zIndex: '2' }}>N° {pokemon.id}</Label>
                <h3 style={{ marginTop: '1.8rem', zIndex: '2', position: 'relative' }}>{dressUpPayloadValue(pokemon.name)}</h3>
                <div style={{ zIndex: '2' }}>
                    {pokemon.types && pokemon.types.map((type, index) => (
                        <Label key={index} style={{ backgroundColor: typeColors[type.type.name], marginRight: '5px' }}>
                            {type.type.name}
                        </Label>
                    ))}
                </div>
            </Segment>
        );
    };

const typeColors = {
    'normal': '#BCBCAC',
    'fighting': '#BC5442',
    'flying': '#669AFF',
    'poison': '#AB549A',
    'ground': '#DEBC54',
    'rock': '#BCAC66',
    'bug': '#ABBC1C',
    'ghost': '#6666BC',
    'steel': '#ABACBC',
    'fire': '#FF421C',
    'water': '#2F9AFF',
    'grass': '#78CD54',
    'electric': '#FFCD30',
    'psychic': '#FF549A',
    'ice': '#78DEFF',
    'dragon': '#7866EF',
    'dark': '#785442',
    'fairy': '#FFACFF',
    'shadow': '#0E2E4C'
};

const FondoCardsColors = {
    'normal': 'linear-gradient(rgba(188, 188, 172, 0.95), rgba(188, 188, 172, 0.3))',
    'fighting': 'linear-gradient(rgba(188, 84, 66, 0.95), rgba(188, 84, 66, 0.3))',
    'flying': 'linear-gradient(rgba(102, 154, 255, 0.95), rgba(102, 154, 255, 0.3))',
    'poison': 'linear-gradient(rgba(171, 84, 154, 0.95), rgba(171, 84, 154, 0.3))',
    'ground': 'linear-gradient(rgba(222, 188, 84, 0.95), rgba(222, 188, 84, 0.3))',
    'rock': 'linear-gradient(rgba(188, 172, 102, 0.95), rgba(188, 172, 102, 0.3))',
    'bug': 'linear-gradient(rgba(171, 188, 28, 0.95), rgba(171, 188, 28, 0.3))',
    'ghost': 'linear-gradient(rgba(102, 102, 188, 0.95), rgba(102, 102, 188, 0.3))',
    'steel': 'linear-gradient(rgba(171, 172, 188, 0.95), rgba(171, 172, 188, 0.3))',
    'fire': 'linear-gradient(rgba(255, 66, 28, 0.95), rgba(255, 66, 28, 0.3))',
    'water': 'linear-gradient(rgba(47, 154, 255, 0.95), rgba(47, 154, 255, 0.2))',
    'grass': 'linear-gradient(rgba(120, 205, 84, 0.95), rgba(120, 205, 84, 0.3))',
    'electric': 'linear-gradient(rgba(255, 205, 48, 0.95), rgba(255, 205, 48, 0.3))',
    'psychic': 'linear-gradient(rgba(255, 84, 154, 0.95), rgba(255, 84, 154, 0.3))',
    'ice': 'linear-gradient(rgba(120, 222, 255, 0.95), rgba(120, 222, 255, 0.3))',
    'dragon': 'linear-gradient(rgba(120, 102, 239, 0.95), rgba(120, 102, 239, 0.3))',
    'dark': 'linear-gradient(rgba(120, 84, 66, 0.95), rgba(120, 84, 66, 0.3))',
    'fairy': 'linear-gradient(rgba(255, 172, 255, 0.95), rgba(255, 172, 255, 0.3))',
    'shadow': 'linear-gradient(rgba(14, 46, 76, 0.95), rgba(14, 46, 76, 0.3))'
};

export default Card;
