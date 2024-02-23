import React, { useState, useEffect } from 'react';
import { Input, Grid, Segment, List, Sidebar, Button, Transition, Loader, Image } from 'semantic-ui-react';
import axios from 'axios';
import Card from './Card'; 

const PokemonSearch = ({ getBySearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState('');
    const [options, setOptions] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        if (searchTerm.length > 0) {
            axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1279&offset=0&${searchTerm}`)
                .then(res => {
                    const results = res.data.results
                        .filter(pokemon => pokemon.name.startsWith(searchTerm.toLowerCase())) 
                        .map(pokemon => ({ key: pokemon.name, text: pokemon.name, value: pokemon.name }));
                    setOptions(results);
                    console.log('Suggestions:', results); 
                })
                .catch(error => {
                    console.error('Error fetching Pokemon suggestions:', error);
                    setOptions([]);
                });
        } else {
            setOptions([]);
        }
    }, [searchTerm]);

    const handleSearch = () => {
        if (selectedOptionIndex >= 0 && selectedOptionIndex < options.length) {
            const selectedOption = options[selectedOptionIndex];
            setLoading(true); 
            axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedOption.value.toLowerCase()}`)
                .then(res => {
                    const pokemonData = res.data;
                    const formattedPokemonData = {
                        id: pokemonData.id,
                        name: pokemonData.name,
                        types: pokemonData.types.map(type => ({ type: { name: type.type.name } })),
                    
                    };
                    setPokemon(formattedPokemonData);
                    setError('');
                    setSidebarVisible(true); 
                })
                .catch(error => {
                    console.error('Error fetching Pokemon details:', error);
                    setPokemon(null);
                    setError('Pokemon not found');
                    setSidebarVisible(false); 
                })
                .finally(() => {
                    setLoading(false); 
                });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedOptionIndex(prevIndex => (prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex));
            scrollToSelectedOption();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedOptionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
            scrollToSelectedOption();
        }
    };

    const scrollToSelectedOption = () => {
        if (selectedOptionIndex >= 0 && selectedOptionIndex < options.length) {
            const selectedOptionElement = document.getElementById(`option-${selectedOptionIndex}`);
            if (selectedOptionElement) {
                selectedOptionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    };

    const handleSelectSuggestion = (value) => {
        setSearchTerm(value); 
        setOptions([]); 
        setSelectedOptionIndex(-1); 

        
        axios.get(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
            .then(res => {
                const pokemonData = res.data;
                const formattedPokemonData = {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    types: pokemonData.types.map(type => ({ type: { name: type.type.name } })),
                  
                };
                setPokemon(formattedPokemonData);
                setError('');
                setSidebarVisible(true); 
            })
            .catch(error => {
                console.error('Error fetching Pokemon details:', error);
                setPokemon(null);
                setError('Pokemon not found');
                setSidebarVisible(false); 
            });
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setLoading(value.length > 0); 
    };

    return (
        <Grid  centered >
            <Grid.Row centered style={{ padding: '1.5rem', marginTop: '1rem' }}>
                <Grid.Column mobile={12} tablet={4} computer={2}>
                    <Input
                        icon={loading ? <Loader active inline size="tiny"  style={{ padding: "0.5rem", marginTop: "auto", position: 'absolute', top: '50%', left: '90%', transform: 'translate(-50%, -50%)', width: '90%', }}/> : 'search'}
                        placeholder="Search Pokemon..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={() => setSelectedOptionIndex(-1)} 
                    />

                    <div style={{ marginTop: '8px', maxHeight: '3.5rem', width: "14.5rem", overflowY: 'auto' }}>
                        <Transition visible={options.length > 0} animation='scale' duration={200}>


                            <List animated verticalAlign='middle' divided relaxed>
                                {options.map((option, index) => (
                                    <List.Item
                                        key={index}
                                        id={`option-${index}`}
                                        onClick={() => handleSelectSuggestion(option.value)}
                                        style={{ cursor: 'pointer', backgroundColor: index === selectedOptionIndex ? 'lightgray' : 'Grey' }}> 
                                        <Image avatar src='./Fondos/Pball.gif' centered style={{ width: '20px', height: '15px', marginRight: '5px' }} />
                                        <List.Content>
                                            <List.Header style={{ color: 'Standard' }} >{option.value}</List.Header>
                                        </List.Content>
                                    </List.Item>
                                ))}
                            </List>

                        </Transition>
                    </div>
                    {error && <Segment inverted color='red'>{error}</Segment>}
                </Grid.Column >
                <Grid.Column >
                    <Sidebar 
                              style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.90), rgba(255, 255, 255, 0.99))', border: "none", padding: "0.5rem", marginTop: "1rem" }}
                        as={Segment}
                        animation='overlay'
                        direction='right'
                        visible={sidebarVisible} 
                         > 
                    
                    
                        {pokemon && (
                            <div style={{ padding: "0.5rem", marginTop: "auto", position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', }}>
                                <Card url={`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`} style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', zIndex: '2' }} />
                                <Button onClick={() => setSidebarVisible(false)}>Close</Button>
                            </div>
                        )}
                    </Sidebar>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default PokemonSearch;