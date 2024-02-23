import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, Image, List, Segment, Button, Icon, Progress, } from 'semantic-ui-react';

const Item = () => {
    const userName = useSelector(state => state.userName);
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [types, setTypes] = useState([]);
    const [description, setDescription] = useState('');
    const [stats, setStats] = useState([]);
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [moves, setMoves] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [evolutions, setEvolutions] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => {
                setPokemon(res.data);
                setTypes(res.data.types.map(type => type.type.name));
                setStats(res.data.stats);
                setWeight(res.data.weight);
                setHeight(res.data.height);
                setMoves(res.data.moves.map(move => move.move.name));
                setAbilities(res.data.abilities.map(ability => ability.ability.name));
            })
            .catch(error => console.error('Error fetching Pokemon data:', error));
    }, [id]);

    const getPokemonSpecies = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
            const englishDescription = response.data.flavor_text_entries.find(entry => entry.language.name === 'en');
            setDescription(englishDescription.flavor_text);
            const evolutionChainResponse = await axios.get(response.data.evolution_chain.url);
            setEvolutions(parseEvolutionChain(evolutionChainResponse.data.chain));
        } catch (error) {
            console.error('Error fetching Pokemon species data:', error);
        }
    };

    useEffect(() => {
        getPokemonSpecies();
    }, [id]);

    const parseEvolutionChain = (chain) => {
        let evolutions = [];
        let current = chain;
    
        while (current) {
            let evolution = {
                id: current.species.url.split('/').slice(-2, -1)[0],
                name: current.species.name.charAt(0).toUpperCase() + current.species.name.slice(1),
                level: current.evolution_details[0]?.min_level || null
            };
            evolutions.push(evolution);
    
            current = current.evolves_to[0];
        }
        
        return evolutions;
    };

    const getPokemonImageUrl = async (pokemonId) => {
        const gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`;
        const pngUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${pokemonId}.png`;
        
        try {
            await axios.head(gifUrl);
            return gifUrl;
        } catch (error) {
            return pngUrl;
        }
    };

    useEffect(() => {
        const loadPokemonImageUrl = async () => {
            const url = await getPokemonImageUrl(id);
            setImageUrl(url);
        };
        loadPokemonImageUrl();
    }, [id]);

    const backgroundStyles = {
        'normal': {   backgroundImage: 'url(./Fondos/FondoCity.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'},
                
                'fighting': {   backgroundImage: 'url(./Fondos/FondoDojo.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'},
        
                'flying': {   backgroundImage: 'url(./Fondos/Fondosky.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
        
                'poison': {   backgroundImage: 'url(./Fondos/FondoPoison.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
             },
                'ground': { 
                    backgroundImage: 'url(./Fondos/FondoCave.webp)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                },
                'rock': { backgroundImage: 'url(./Fondos/FondoCave.webp)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'},
        
        
                'bug': {   backgroundImage: 'url(./Fondos/FondoBosques.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'},
        
        
                'ghost': {  backgroundImage: 'url(./Fondos/FondoGhost.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'},
        
                'steel': {   backgroundImage: 'url(./Fondos/FondoSteel.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
                'fire': {   backgroundImage: 'url(./Fondos/FondoVolcano.avif)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
        
                'water': {  backgroundImage: 'url(./Fondos/FondoMar.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
        
                'grass': {  backgroundImage: 'url(./Fondos/FondoGrass1.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
            
                'electric': {  backgroundImage: 'url(./Fondos/FondoElectrico.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
                
                'psychic': {  backgroundImage: 'url(./Fondos/Fondopsychic.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
        
                'ice': {  backgroundImage: 'url(./Fondos/FondoIce.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
                'dragon': {  backgroundImage: 'url(./Fondos/FondoTemplo.avif)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
                'dark': {  backgroundImage: 'url(./Fondos/FondoGhost.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
                'fairy': {  backgroundImage: 'url(./Fondos/FondoHada.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
        
                'shadow': {  backgroundImage: 'url(./Fondos/FondoShadow.Png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' },
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
    
    return (
        <div style={{ ...backgroundStyles[types[0]], padding: '20px' }}>
      
      
      <Button size='big' color='orange' style={{  padding: "0.8rem", marginBottom:"1rem" ,marginTop: "-5.1rem", marginRight: "0rem" }}>{`Pokedex: N°${pokemon.id}`}</Button>


            <Button animated onClick={() => navigate(-1)} floated='right' style={{ border: "none", padding: "0.7rem", marginTop: "-0.5rem", marginRight: "0rem" }}>
                <Button.Content visible>Go Back</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right' /> 
                </Button.Content>
            </Button>


            
                     <Image src={imageUrl} alt={`Image of ${pokemon.name}`} size='small' />

                     <Segment style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.31), rgba(100, 100, 100, 0.91))', border:"none", padding:"0rem", marginTop:"auto" }}>

                     <Header as='h2'> <Button size='big' color='black' style={{ fontWeight: 'bold' }}> <strong>{pokemon && pokemon.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : ''}</strong> </Button>  
                     
                     <Header as='h3' style={{ fontWeight: 'bold', marginTop: "0.7rem", }}>
                        
                          <Button size='big'color='grey' style={{ fontWeight: 'bold', padding: "0.5rem", marginTop: "-4.1rem", marginRight: "0rem" }}>Entrenador: <Button color='teal' style={{ fontWeight: 'bold', padding: "0.5rem", marginTop: "-4.1rem", marginRight: "0rem" }}>{userName}</Button> </Button></Header></Header>
                          
                    <List style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.61), rgba(100, 100, 100, 0.61))', border:"none", padding:"0.5rem", marginTop:"auto" }}>

                    <List.Item style={{  margin: '0.1rem', height:"2rem", padding:"0.5rem" }}><strong>Type(s):</strong></List.Item>


                    <Button.Group style={{ border:"none", padding:"0rem", }}>
                    {types.map((type, index) => (
                    <Button key={index} style={{ background: typeColors[type], margin: '0.1rem', height:"2rem", padding:"0.5rem" }}>{type}</Button>
                     ))}
                    </Button.Group>





                    <List.Item><strong>Description:</strong> {description}</List.Item>

                    <Button.Group style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.31), rgba(100, 100, 100, 0.91))', border:"none", padding:"1rem", }}>
                    <Button><strong>Height:</strong> {(height / 10).toFixed(1)} Mts</Button>
                    <Button><strong>Weight:</strong> {weight} Kg.</Button>
                    </Button.Group>

                    <List.Item style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.51), rgba(100, 100, 100, 0.25))', border: "none", padding: "1rem" }}>
                    <strong>Moves:</strong>
                    <Segment style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {moves.map(move => (
                    <Button key={move} style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}>{move}</Button>
                     ))}
                    </Segment>
                    </List.Item>



                   
                    <List.Item style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.31), rgba(100, 100, 100, 0.91))', border:"none", padding:"1rem", }}>

                   <strong>Abilities:</strong> 
                   {abilities.map((ability, index) => (
                  <Button key={index} style={{ margin: '0.5rem', height:"2rem", padding:"0.5rem" }}>{ability}</Button>
                                                                                                                       ))}
                  </List.Item>

                    <List.Item>
                    <strong>Stats:</strong>
                    {stats.map(stat => (
                    <div key={stat.stat.name}>
                    <p>{stat.stat.name}: {stat.base_stat}</p>
                    <Progress  percent={(stat.base_stat / 150) * 100} size='small'  indicating />
                    </div>
                           ))}
                    </List.Item>

                </List>
            </Segment>
            <Segment style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.61), rgba(100, 100, 100, 0.89))', border:"none", padding:"1.5rem", marginTop:"auto" }}>
                <Header as='h2'>Evolutions:</Header>
                <List horizontal>
                    {evolutions.map(evolution => (
                        <List.Item key={evolution.id}>
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${evolution.id}.png`} alt={`Image of ${evolution.name}`} />
                            <List.Content>
                                <Header as='h3'>{evolution.name}</Header>
                                {evolution.level && <p>Level: {evolution.level}</p>}
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Segment>
     
        </div>
    );
};

export default Item;
